"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.webpackBuild = webpackBuild;
var Log = _interopRequireWildcard(require("../output/log"));
var _buildContext = require("../build-context");
var _jestWorker = require("next/dist/compiled/jest-worker");
var _debug = _interopRequireDefault(require("next/dist/compiled/debug"));
var _path = _interopRequireDefault(require("path"));
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
const debug = (0, _debug).default("next:build:webpack-build");
async function webpackBuildWithWorker() {
    const { config , telemetryPlugin , buildSpinner , nextBuildSpan , ...prunedBuildContext } = _buildContext.NextBuildContext;
    const getWorker = (compilerName)=>{
        var ref;
        const _worker = new _jestWorker.Worker(_path.default.join(__dirname, "impl.js"), {
            exposedMethods: [
                "workerMain"
            ],
            numWorkers: 1,
            maxRetries: 0,
            forkOptions: {
                env: {
                    ...process.env,
                    NEXT_PRIVATE_BUILD_WORKER: "1"
                }
            }
        });
        _worker.getStderr().pipe(process.stderr);
        _worker.getStdout().pipe(process.stdout);
        for (const worker of ((ref = _worker._workerPool) == null ? void 0 : ref._workers) || []){
            worker._child.on("exit", (code, signal)=>{
                if (code || signal) {
                    console.error(`Compiler ${compilerName} unexpectedly exited with code: ${code} and signal: ${signal}`);
                }
            });
        }
        return _worker;
    };
    const combinedResult = {
        duration: 0,
        turbotraceContext: {}
    };
    // order matters here
    const ORDERED_COMPILER_NAMES = [
        "server",
        "edge-server",
        "client", 
    ];
    for (const compilerName1 of ORDERED_COMPILER_NAMES){
        var ref5, ref1, ref2, ref3, ref4;
        const worker = getWorker(compilerName1);
        const curResult = await worker.workerMain({
            buildContext: prunedBuildContext,
            compilerName: compilerName1
        });
        // destroy worker so it's not sticking around using memory
        await worker.end();
        // Update plugin state
        prunedBuildContext.pluginState = curResult.pluginState;
        prunedBuildContext.serializedPagesManifestEntries = {
            edgeServerAppPaths: (ref5 = curResult.serializedPagesManifestEntries) == null ? void 0 : ref5.edgeServerAppPaths,
            edgeServerPages: (ref1 = curResult.serializedPagesManifestEntries) == null ? void 0 : ref1.edgeServerPages,
            nodeServerAppPaths: (ref2 = curResult.serializedPagesManifestEntries) == null ? void 0 : ref2.nodeServerAppPaths,
            nodeServerPages: (ref3 = curResult.serializedPagesManifestEntries) == null ? void 0 : ref3.nodeServerPages
        };
        combinedResult.duration += curResult.duration;
        if ((ref4 = curResult.turbotraceContext) == null ? void 0 : ref4.entriesTrace) {
            combinedResult.turbotraceContext = curResult.turbotraceContext;
            const { entryNameMap  } = combinedResult.turbotraceContext.entriesTrace;
            if (entryNameMap) {
                combinedResult.turbotraceContext.entriesTrace.entryNameMap = new Map(entryNameMap);
            }
        }
    }
    buildSpinner == null ? void 0 : buildSpinner.stopAndPersist();
    Log.info("Compiled successfully");
    return combinedResult;
}
async function webpackBuild() {
    const config = _buildContext.NextBuildContext.config;
    if (config.experimental.webpackBuildWorker) {
        debug("using separate compiler workers");
        return await webpackBuildWithWorker();
    } else {
        debug("building all compilers in same process");
        const webpackBuildImpl = require("./impl").webpackBuildImpl;
        return await webpackBuildImpl();
    }
}

//# sourceMappingURL=index.js.map