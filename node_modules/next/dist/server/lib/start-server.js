"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.startServer = startServer;
exports.WORKER_SELF_EXIT_CODE = void 0;
var _log = require("../../build/output/log");
var _http = _interopRequireDefault(require("http"));
var _next = _interopRequireDefault(require("../next"));
var _net = require("net");
var _v8 = _interopRequireDefault(require("v8"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const isChildProcess = !!process.env.__NEXT_DEV_CHILD_PROCESS;
const WORKER_SELF_EXIT_CODE = 77;
exports.WORKER_SELF_EXIT_CODE = WORKER_SELF_EXIT_CODE;
const MAXIMUM_HEAP_SIZE_ALLOWED = _v8.default.getHeapStatistics().heap_size_limit / 1024 / 1024 * 0.9;
function startServer(opts) {
    let requestHandler;
    const server = _http.default.createServer((req, res)=>{
        return requestHandler(req, res).finally(()=>{
            if (isChildProcess && process.memoryUsage().heapUsed / 1024 / 1024 > MAXIMUM_HEAP_SIZE_ALLOWED) {
                (0, _log).warn("The server is running out of memory, restarting to free up memory.");
                server.close();
                process.exit(WORKER_SELF_EXIT_CODE);
            }
        });
    });
    if (opts.keepAliveTimeout) {
        server.keepAliveTimeout = opts.keepAliveTimeout;
    }
    return new Promise((resolve, reject)=>{
        let port = opts.port;
        let retryCount = 0;
        server.on("error", (err)=>{
            if (port && opts.allowRetry && err.code === "EADDRINUSE" && retryCount < 10) {
                (0, _log).warn(`Port ${port} is in use, trying ${port + 1} instead.`);
                port += 1;
                retryCount += 1;
                server.listen(port, opts.hostname);
            } else {
                reject(err);
            }
        });
        let upgradeHandler;
        if (!opts.dev) {
            server.on("upgrade", (req, socket, upgrade)=>{
                upgradeHandler(req, socket, upgrade);
            });
        }
        server.on("listening", ()=>{
            const addr = server.address();
            let hostname = !opts.hostname || opts.hostname === "0.0.0.0" ? "localhost" : opts.hostname;
            if ((0, _net).isIPv6(hostname)) {
                hostname = hostname === "::" ? "[::1]" : `[${hostname}]`;
            }
            const app = (0, _next).default({
                ...opts,
                hostname,
                customServer: false,
                httpServer: server,
                port: addr && typeof addr === "object" ? addr.port : port
            });
            requestHandler = app.getRequestHandler();
            upgradeHandler = app.getUpgradeHandler();
            resolve(app);
        });
        server.listen(port, opts.hostname);
    });
}

//# sourceMappingURL=start-server.js.map