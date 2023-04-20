import path from "path";
import * as Log from "./output/log";
import { Worker as JestWorker } from "next/dist/compiled/jest-worker";
import { verifyAndLint } from "../lib/verifyAndLint";
import createSpinner from "./spinner";
import { eventTypeCheckCompleted } from "../telemetry/events";
import isError from "../lib/is-error";
/**
 * typescript will be loaded in "next/lib/verifyTypeScriptSetup" and
 * then passed to "next/lib/typescript/runTypeCheck" as a parameter.
 *
 * Since it is impossible to pass a function from main thread to a worker,
 * instead of running "next/lib/typescript/runTypeCheck" in a worker,
 * we will run entire "next/lib/verifyTypeScriptSetup" in a worker instead.
 */ function verifyTypeScriptSetup(dir, distDir, intentDirs, typeCheckPreflight, tsconfigPath, disableStaticImages, cacheDir, enableWorkerThreads, isAppDirEnabled, hasPagesDir) {
    const typeCheckWorker = new JestWorker(require.resolve("../lib/verifyTypeScriptSetup"), {
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
export async function startTypeChecking({ cacheDir , config , dir , ignoreESLint , isAppDirEnabled , nextBuildSpan , pagesDir , runLint , shouldLint , telemetry , appDir  }) {
    const ignoreTypeScriptErrors = Boolean(config.typescript.ignoreBuildErrors);
    const eslintCacheDir = path.join(cacheDir, "eslint/");
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
        typeCheckingAndLintingSpinner = createSpinner({
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
                await verifyAndLint(dir, eslintCacheDir, (ref = config.eslint) == null ? void 0 : ref.dirs, config.experimental.workerThreads, telemetry, isAppDirEnabled && !!appDir);
            }), 
        ]);
        typeCheckingAndLintingSpinner == null ? void 0 : typeCheckingAndLintingSpinner.stopAndPersist();
        if (!ignoreTypeScriptErrors && verifyResult) {
            var ref3, ref1, ref2;
            telemetry.record(eventTypeCheckCompleted({
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
        if (isError(err) && err.message === "Call retries were exceeded") {
            await telemetry.flush();
            process.exit(1);
        }
        throw err;
    }
}

//# sourceMappingURL=type-check.js.map