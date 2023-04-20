"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.startServer = startServer;
var _http = _interopRequireDefault(require("http"));
var _net = require("net");
var Log = _interopRequireWildcard(require("../../build/output/log"));
var _utils = require("./utils");
var _utils1 = require("../../shared/lib/utils");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function() {
        return cache;
    };
    return cache;
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
async function startServer({ dir , prevDir , port , isDev , hostname , useWorkers , allowRetry , keepAliveTimeout , onStdout , onStderr  }) {
    var ref, ref1;
    const sockets = new Set();
    let worker;
    let handlersReady = ()=>{};
    let handlersError = ()=>{};
    let isNodeDebugging = !!(process.execArgv.some((localArg)=>localArg.startsWith("--inspect")) || ((ref = process.env.NODE_OPTIONS) == null ? void 0 : ref.match == null ? void 0 : ref.match(/--inspect(=\S+)?( |$)/)));
    if (process.execArgv.some((localArg)=>localArg.startsWith("--inspect-brk")) || ((ref1 = process.env.NODE_OPTIONS) == null ? void 0 : ref1.match == null ? void 0 : ref1.match(/--inspect-brk(=\S+)?( |$)/))) {
        isNodeDebugging = "brk";
    }
    let handlersPromise = new Promise((resolve, reject)=>{
        handlersReady = resolve;
        handlersError = reject;
    });
    let requestHandler = async (_req, _res)=>{
        if (handlersPromise) {
            await handlersPromise;
            return requestHandler(_req, _res);
        }
        throw new Error("Invariant request handler was not setup");
    };
    let upgradeHandler = async (_req, _socket, _head)=>{
        if (handlersPromise) {
            await handlersPromise;
            return upgradeHandler(_req, _socket, _head);
        }
        throw new Error("Invariant upgrade handler was not setup");
    };
    // setup server listener as fast as possible
    const server = _http.default.createServer(async (req, res)=>{
        try {
            if (handlersPromise) {
                await handlersPromise;
                handlersPromise = undefined;
            }
            sockets.add(res);
            res.on("close", ()=>sockets.delete(res));
            await requestHandler(req, res);
        } catch (err) {
            res.statusCode = 500;
            res.end("Internal Server Error");
            Log.error(`Failed to handle request for ${req.url}`);
            console.error(err);
        }
    });
    if (keepAliveTimeout) {
        server.keepAliveTimeout = keepAliveTimeout;
    }
    server.on("upgrade", async (req, socket, head)=>{
        try {
            sockets.add(socket);
            socket.on("close", ()=>sockets.delete(socket));
            await upgradeHandler(req, socket, head);
        } catch (err) {
            socket.destroy();
            Log.error(`Failed to handle request for ${req.url}`);
            console.error(err);
        }
    });
    let portRetryCount = 0;
    server.on("error", (err)=>{
        if (allowRetry && port && isDev && err.code === "EADDRINUSE" && portRetryCount < 10) {
            Log.warn(`Port ${port} is in use, trying ${port + 1} instead.`);
            port += 1;
            portRetryCount += 1;
            server.listen(port, hostname);
        } else {
            Log.error(`Failed to start server`);
            console.error(err);
            process.exit(1);
        }
    });
    let targetHost = hostname;
    await new Promise((resolve)=>{
        server.on("listening", ()=>{
            const addr = server.address();
            port = typeof addr === "object" ? (addr == null ? void 0 : addr.port) || port : port;
            let host = !hostname || hostname === "0.0.0.0" ? "localhost" : hostname;
            let normalizedHostname = hostname || "0.0.0.0";
            if ((0, _net).isIPv6(hostname)) {
                host = host === "::" ? "[::1]" : `[${host}]`;
                normalizedHostname = `[${hostname}]`;
            }
            targetHost = host;
            const appUrl = `http://${host}:${port}`;
            Log.ready(`started server on ${normalizedHostname}${(port + "").startsWith(":") ? "" : ":"}${port}, url: ${appUrl}`);
            resolve();
        });
        server.listen(port, hostname);
    });
    try {
        if (useWorkers) {
            var ref2;
            const httpProxy = require("next/dist/compiled/http-proxy");
            let renderServerPath = require.resolve("./render-server");
            let jestWorkerPath = require.resolve("next/dist/compiled/jest-worker");
            if (prevDir) {
                jestWorkerPath = jestWorkerPath.replace(prevDir, dir);
                renderServerPath = renderServerPath.replace(prevDir, dir);
            }
            const { Worker  } = require(jestWorkerPath);
            const routerWorker = new Worker(renderServerPath, {
                numWorkers: 1,
                // TODO: do we want to allow more than 10 OOM restarts?
                maxRetries: 10,
                forkOptions: {
                    env: {
                        FORCE_COLOR: "1",
                        ...process.env,
                        // we don't pass down NODE_OPTIONS as it can
                        // extra memory usage
                        NODE_OPTIONS: (0, _utils).getNodeOptionsWithoutInspect().replace(/--max-old-space-size=[\d]{1,}/, "").trim()
                    }
                },
                exposedMethods: [
                    "initialize"
                ]
            });
            let didInitialize = false;
            for (const _worker of ((ref2 = routerWorker._workerPool) == null ? void 0 : ref2._workers) || []){
                // eslint-disable-next-line no-loop-func
                _worker._child.on("exit", (code, signal)=>{
                    // catch failed initializing without retry
                    if ((code || signal) && !didInitialize) {
                        routerWorker == null ? void 0 : routerWorker.end();
                        process.exit(1);
                    }
                });
            }
            const workerStdout = routerWorker.getStdout();
            const workerStderr = routerWorker.getStderr();
            workerStdout.on("data", (data)=>{
                if (typeof onStdout === "function") {
                    onStdout(data);
                } else {
                    process.stdout.write(data);
                }
            });
            workerStderr.on("data", (data)=>{
                if (typeof onStderr === "function") {
                    onStderr(data);
                } else {
                    process.stderr.write(data);
                }
            });
            const { port: routerPort  } = await routerWorker.initialize({
                dir,
                port,
                hostname,
                dev: !!isDev,
                workerType: "router",
                keepAliveTimeout
            });
            didInitialize = true;
            const getProxyServer = (pathname)=>{
                const targetUrl = `http://${targetHost}:${routerPort}${pathname}`;
                const proxyServer = httpProxy.createProxy({
                    target: targetUrl,
                    changeOrigin: false,
                    ignorePath: true,
                    xfwd: true,
                    ws: true,
                    followRedirects: false
                });
                proxyServer.on("error", ()=>{
                // TODO?: enable verbose error logs with --debug flag?
                });
                return proxyServer;
            };
            // proxy to router worker
            requestHandler = async (req, res)=>{
                const urlParts = (req.url || "").split("?");
                const urlNoQuery = urlParts[0];
                // this normalizes repeated slashes in the path e.g. hello//world ->
                // hello/world or backslashes to forward slashes, this does not
                // handle trailing slash as that is handled the same as a next.config.js
                // redirect
                if (urlNoQuery == null ? void 0 : urlNoQuery.match(/(\\|\/\/)/)) {
                    const cleanUrl = (0, _utils1).normalizeRepeatedSlashes(req.url);
                    res.statusCode = 308;
                    res.setHeader("Location", cleanUrl);
                    res.end(cleanUrl);
                    return;
                }
                const proxyServer = getProxyServer(req.url || "/");
                proxyServer.web(req, res);
            };
            upgradeHandler = async (req, socket, head)=>{
                const proxyServer = getProxyServer(req.url || "/");
                proxyServer.ws(req, socket, head);
            };
            handlersReady();
        } else {
            // when not using a worker start next in main process
            const { default: next  } = require("../next");
            const addr = server.address();
            const app = next({
                dir,
                hostname,
                dev: isDev,
                isNodeDebugging,
                httpServer: server,
                customServer: false,
                port: addr && typeof addr === "object" ? addr.port : port
            });
            // handle in process
            requestHandler = app.getRequestHandler();
            upgradeHandler = app.getUpgradeHandler();
            await app.prepare();
            handlersReady();
        }
    } catch (err) {
        // fatal error if we can't setup
        handlersError();
        console.error(err);
        process.exit(1);
    }
    // return teardown function for destroying the server
    async function teardown() {
        server.close();
        sockets.forEach((socket)=>{
            sockets.delete(socket);
            socket.destroy();
        });
        if (worker) {
            await worker.end();
        }
    }
    return teardown;
}

//# sourceMappingURL=start-server.js.map