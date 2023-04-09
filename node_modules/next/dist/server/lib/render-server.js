"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clearModuleContext = clearModuleContext;
exports.deleteAppClientCache = deleteAppClientCache;
exports.deleteCache = deleteCache;
exports.initialize = initialize;
exports.WORKER_SELF_EXIT_CODE = void 0;
var _v8 = _interopRequireDefault(require("v8"));
var _http = _interopRequireDefault(require("http"));
var _next = _interopRequireDefault(require("../next"));
var _net = require("net");
var _log = require("../../build/output/log");
var _nextjsRequireCacheHotReloader = require("../../build/webpack/plugins/nextjs-require-cache-hot-reloader");
var _context = require("../web/sandbox/context");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const WORKER_SELF_EXIT_CODE = 77;
exports.WORKER_SELF_EXIT_CODE = WORKER_SELF_EXIT_CODE;
const MAXIMUM_HEAP_SIZE_ALLOWED = _v8.default.getHeapStatistics().heap_size_limit / 1024 / 1024 * 0.9;
let result;
function clearModuleContext(target, content) {
    (0, _context).clearModuleContext(target, content);
}
function deleteAppClientCache() {
    (0, _nextjsRequireCacheHotReloader).deleteAppClientCache();
}
function deleteCache(filePath) {
    (0, _nextjsRequireCacheHotReloader).deleteCache(filePath);
}
async function initialize(opts) {
    // if we already setup the server return as we only need to do
    // this on first worker boot
    if (result) {
        return result;
    }
    let requestHandler;
    const server = _http.default.createServer((req, res)=>{
        return requestHandler(req, res).finally(()=>{
            if (process.memoryUsage().heapUsed / 1024 / 1024 > MAXIMUM_HEAP_SIZE_ALLOWED) {
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
        server.on("error", (err)=>{
            console.error(`Invariant: failed to start render worker`, err);
            process.exit(1);
        });
        let upgradeHandler;
        if (!opts.dev) {
            server.on("upgrade", (req, socket, upgrade)=>{
                upgradeHandler(req, socket, upgrade);
            });
        }
        server.on("listening", async ()=>{
            try {
                const addr = server.address();
                const port = addr && typeof addr === "object" ? addr.port : 0;
                if (!port) {
                    console.error(`Invariant failed to detect render worker port`, addr);
                    process.exit(1);
                }
                let hostname = !opts.hostname || opts.hostname === "0.0.0.0" ? "localhost" : opts.hostname;
                if ((0, _net).isIPv6(hostname)) {
                    hostname = hostname === "::" ? "[::1]" : `[${hostname}]`;
                }
                result = {
                    port,
                    hostname
                };
                const app = (0, _next).default({
                    ...opts,
                    _routerWorker: opts.workerType === "router",
                    _renderWorker: opts.workerType === "render",
                    hostname,
                    customServer: false,
                    httpServer: server,
                    port: opts.port
                });
                requestHandler = app.getRequestHandler();
                upgradeHandler = app.getUpgradeHandler();
                await app.prepare();
                resolve(result);
            } catch (err) {
                return reject(err);
            }
        });
        server.listen(0, opts.hostname);
    });
}

//# sourceMappingURL=render-server.js.map