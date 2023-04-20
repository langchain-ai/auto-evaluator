import { genExecArgv, getNodeOptionsWithoutInspect } from "./utils";
import { deserializeErr, errorToJSON } from "../render";
import isError from "../../lib/is-error";
// we can't use process.send as jest-worker relies on
// it already and can cause unexpected message errors
// so we create an IPC server for communicating
export async function createIpcServer(server) {
    const ipcServer = require("http").createServer(async (req, res)=>{
        try {
            const url = new URL(req.url || "/", "http://n");
            const method = url.searchParams.get("method");
            const args = JSON.parse(url.searchParams.get("args") || "[]");
            if (!method || !Array.isArray(args)) {
                return res.end();
            }
            if (typeof server[method] === "function") {
                var ref;
                if (method === "logErrorWithOriginalStack" && ((ref = args[0]) == null ? void 0 : ref.stack)) {
                    args[0] = deserializeErr(args[0]);
                }
                let result = await server[method](...args);
                if (result && typeof result === "object" && result.stack) {
                    result = errorToJSON(result);
                }
                res.end(JSON.stringify(result || ""));
            }
        } catch (err) {
            if (isError(err) && err.code !== "ENOENT") {
                console.error(err);
            }
            res.end(JSON.stringify({
                err: {
                    name: err.name,
                    message: err.message,
                    stack: err.stack
                }
            }));
        }
    });
    const ipcPort = await new Promise((resolveIpc)=>{
        ipcServer.listen(0, server.hostname, ()=>{
            const addr = ipcServer.address();
            if (addr && typeof addr === "object") {
                resolveIpc(addr.port);
            }
        });
    });
    return {
        ipcPort,
        ipcServer
    };
}
export const createWorker = (serverPort, ipcPort, isNodeDebugging, type)=>{
    const { initialEnv  } = require("@next/env");
    const { Worker  } = require("next/dist/compiled/jest-worker");
    const worker = new Worker(require.resolve("./render-server"), {
        numWorkers: 1,
        // TODO: do we want to allow more than 10 OOM restarts?
        maxRetries: 10,
        forkOptions: {
            env: {
                FORCE_COLOR: "1",
                ...initialEnv,
                // we don't pass down NODE_OPTIONS as it can
                // extra memory usage
                NODE_OPTIONS: getNodeOptionsWithoutInspect().replace(/--max-old-space-size=[\d]{1,}/, "").trim(),
                __NEXT_PRIVATE_RENDER_WORKER: type,
                __NEXT_PRIVATE_ROUTER_IPC_PORT: ipcPort + "",
                NODE_ENV: process.env.NODE_ENV
            },
            execArgv: genExecArgv(isNodeDebugging === undefined ? false : isNodeDebugging, (serverPort || 0) + 1)
        },
        exposedMethods: [
            "initialize",
            "deleteCache",
            "deleteAppClientCache",
            "clearModuleContext", 
        ]
    });
    worker.getStderr().pipe(process.stderr);
    worker.getStdout().pipe(process.stdout);
    return worker;
};
const forbiddenHeaders = [
    "accept-encoding",
    "content-length",
    "keepalive",
    "content-encoding",
    "transfer-encoding",
    // https://github.com/nodejs/undici/issues/1470
    "connection", 
];
export const filterReqHeaders = (headers)=>{
    for (const [key, value] of Object.entries(headers)){
        if (forbiddenHeaders.includes(key) || !(Array.isArray(value) || typeof value === "string")) {
            delete headers[key];
        }
    }
    return headers;
};
export const invokeRequest = async (targetUrl, requestInit, readableBody)=>{
    const parsedUrl = new URL(targetUrl);
    // force localhost to IPv4 as some DNS may
    // resolve to IPv6 instead
    if (parsedUrl.hostname === "localhost") {
        parsedUrl.hostname = "127.0.0.1";
    }
    const invokeHeaders = filterReqHeaders({
        ...requestInit.headers
    });
    const invokeRes = await new Promise((resolveInvoke, rejectInvoke)=>{
        const http = require("http");
        try {
            const invokeReq = http.request(targetUrl, {
                headers: invokeHeaders,
                method: requestInit.method
            }, (res)=>{
                resolveInvoke(res);
            });
            invokeReq.on("error", (err)=>{
                rejectInvoke(err);
            });
            if (requestInit.method !== "GET" && requestInit.method !== "HEAD") {
                if (readableBody) {
                    readableBody.pipe(invokeReq);
                    readableBody.on("close", ()=>{
                        invokeReq.end();
                    });
                }
            } else {
                invokeReq.end();
            }
        } catch (err) {
            rejectInvoke(err);
        }
    });
    return invokeRes;
};

//# sourceMappingURL=server-ipc.js.map