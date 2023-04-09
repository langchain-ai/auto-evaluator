"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.startTypeChecking = startTypeChecking;
var _path = _interopRequireDefault(require("path"));
var Log = _interopRequireWildcard(require("./output/log"));
var _jestWorker = require("next/dist/compiled/jest-worker");
var _verifyAndLint = require("../lib/verifyAndLint");
var _spinner = _interopRequireDefault(require("./spinner"));
var _events = require("../telemetry/events");
var _isError = _interopRequireDefault(require("../lib/is-error"));
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
/**
 * typescript will be loaded in "next/lib/verifyTypeScriptSetup" and
 * then passed to "next/lib/typescript/runTypeCheck" as a parameter.
 *
 * Since it is impossible to pass a function from main thread to a worker,
 * instead of running "next/lib/typescript/runTypeCheck" in a worker,
 * we will run entire "next/lib/verifyTypeScriptSetup" in a worker instead.
 */ function verifyTypeScriptSetup(dir, distDir, intentDirs, typeCheckPreflight, tsconfigPath, disableStaticImages, cacheDir, enableWorkerThreads, isAppDirEnabled, hasPagesDir) {
    const typeCheckWorker = new _jestWorker.Worker(require.resolve("../lib/verifyTypeScriptSetup"), {
        numWorkers: 1,
        enableWorkerThreads,
        maxRetries: 0
    });
    typeCheckWorker.getStdout().pipe(process.stdout);
    typeCheckWorker.getStderr().pipe(process.stderr);
    return typeCheckWorker.verifyTypeScriptSetup({
        dir,
        distDir,
        intentDirs,
        typeCheckPreflight,
        tsconfigPath,
        disableStaticImages,
        cacheDir,
        isAppDirEnabled,
        hasPagesDir
    }).then((result)=>{
        typeCheckWorker.end();
        return result;
    });
}
async function startTypeChecking({ cacheDir , config , dir , ignoreESLint , isAppDirEnabled , nextBuildSpan , pagesDir , runLint , shouldLint , telemetry , appDir  }) {
    const ignoreTypeScriptErrors = Boolean(config.typescript.ignoreBuildErrors);
    const eslintCacheDir = _path.default.join(cacheDir, "eslint/");
    if (ignoreTypeScriptErrors) {
        Log.info("Skipping validation of types");
    }
    if (runLint && ignoreESLint) {
        // only print log when build require lint while ignoreESLint is enabled
        Log.info("Skipping linting");
    }
    let typeCheckingAndLintingSpinnerPrefixText;
    let typeCheckingAndLintingSpinner;
    if (!ignoreTypeScriptErrors && shouldLint) {
        typeCheckingAndLintingSpinnerPrefixText = "Linting and checking validity of types";
    } else if (!ignoreTypeScriptErrors) {
        typeCheckingAndLintingSpinnerPrefixText = "Checking validity of types";
    } else if (shouldLint) {
        typeCheckingAndLintingSpinnerPrefixText = "Linting";
    }
    // we will not create a spinner if both ignoreTypeScriptErrors and ignoreESLint are
    // enabled, but we will still verifying project's tsconfig and dependencies.
    if (typeCheckingAndLintingSpinnerPrefixText) {
        typeCheckingAndLintingSpinner = (0, _spinner).default({
            prefixText: `${Log.prefixes.info} ${typeCheckingAndLintingSpinnerPrefixText}`
        });
    }
    const typeCheckStart = process.hrtime();
    try {
        const [[verifyResult, typeCheckEnd]] = await Promise.all([
            nextBuildSpan.traceChild("verify-typescript-setup").traceAsyncFn(()=>verifyTypeScriptSetup(dir, config.distDir, [
                    pagesDir,
                    appDir
                ].filter(Boolean), !ignoreTypeScriptErrors, config.typescript.tsconfigPath, config.images.disableStaticImages, cacheDir, config.experimental.workerThreads, isAppDirEnabled, !!pagesDir).then((resolved)=>{
                    const checkEnd = process.hrtime(typeCheckStart);
                    return [
                        resolved,
                        checkEnd
                    ];
                })),
            shouldLint && nextBuildSpan.traceChild("verify-and-lint").traceAsyncFn(async ()=>{
                var ref;
                await (0, _verifyAndLint).verifyAndLint(dir, eslintCacheDir, (ref = config.eslint) == null ? void 0 : ref.dirs, config.experimental.workerThreads, telemetry, isAppDirEnabled && !!appDir);
            }), 
        ]);
        typeCheckingAndLintingSpinner == null ? void 0 : typeCheckingAndLintingSpinner.stopAndPersist();
        if (!ignoreTypeScriptErrors && verifyResult) {
            var ref3, ref1, ref2;
            telemetry.record((0, _events).eventTypeCheckCompleted({
                durationInSeconds: typeCheckEnd[0],
                typescriptVersion: verifyResult.version,
                inputFilesCount: (ref3 = verifyResult.result) == null ? void 0 : ref3.inputFilesCount,
                totalFilesCount: (ref1 = verifyResult.result) == null ? void 0 : ref1.totalFilesCount,
                incremental: (ref2 = verifyResult.result) == null ? void 0 : ref2.incremental
            }));
        }
    } catch (err) {
        // prevent showing jest-worker internal error as it
        // isn't helpful for users and clutters output
        if ((0, _isError).default(err) && err.message === "Call retries were exceeded") {
            await telemetry.flush();
            process.exit(1);
        }
        throw err;
    }
}

//# sourceMappingURL=type-check.js.map