"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _jestWorker = require("next/dist/compiled/jest-worker");
var _utils = require("../server/lib/utils");
const RESTARTED = Symbol("restarted");
class Worker {
    constructor(workerPath, options){
        let { timeout , onRestart , ...farmOptions } = options;
        let restartPromise;
        let resolveRestartPromise;
        let activeTasks = 0;
        this._worker = undefined;
        const createWorker = ()=>{
            var ref;
            this._worker = new _jestWorker.Worker(workerPath, {
                ...farmOptions,
                forkOptions: {
                    ...farmOptions.forkOptions,
                    env: {
                        ...((ref = farmOptions.forkOptions) == null ? void 0 : ref.env) || {},
                        ...process.env,
                        // we don't pass down NODE_OPTIONS as it can
                        // extra memory usage
                        NODE_OPTIONS: (0, _utils).getNodeOptionsWithoutInspect().replace(/--max-old-space-size=[\d]{1,}/, "").trim()
                    }
                }
            });
            restartPromise = new Promise((resolve)=>resolveRestartPromise = resolve);
            /**
       * Jest Worker has two worker types, ChildProcessWorker (uses child_process) and NodeThreadWorker (uses worker_threads)
       * Next.js uses ChildProcessWorker by default, but it can be switched to NodeThreadWorker with an experimental flag
       *
       * We only want to handle ChildProcessWorker's orphan process issue, so we access the private property "_child":
       * https://github.com/facebook/jest/blob/b38d7d345a81d97d1dc3b68b8458b1837fbf19be/packages/jest-worker/src/workers/ChildProcessWorker.ts
       *
       * But this property is not available in NodeThreadWorker, so we need to check if we are using ChildProcessWorker
       */ if (!farmOptions.enableWorkerThreads) {
                var ref1;
                for (const worker of ((ref1 = this._worker._workerPool) == null ? void 0 : ref1._workers) || []){
                    var ref2;
                    (ref2 = worker._child) == null ? void 0 : ref2.on("exit", (code, signal)=>{
                        // log unexpected exit if .end() wasn't called
                        if ((code || signal) && this._worker) {
                            console.error(`Static worker unexpectedly exited with code: ${code} and signal: ${signal}`);
                        }
                    });
                }
            }
            this._worker.getStdout().pipe(process.stdout);
            this._worker.getStderr().pipe(process.stderr);
        };
        createWorker();
        const onHanging = ()=>{
            const worker = this._worker;
            if (!worker) return;
            const resolve = resolveRestartPromise;
            createWorker();
            worker.end().then(()=>{
                resolve(RESTARTED);
            });
        };
        let hangingTimer = false;
        const onActivity = ()=>{
            if (hangingTimer) clearTimeout(hangingTimer);
            hangingTimer = activeTasks > 0 && setTimeout(onHanging, timeout);
        };
        for (const method of farmOptions.exposedMethods){
            if (method.startsWith("_")) continue;
            this[method] = timeout ? async (...args)=>{
                activeTasks++;
                try {
                    let attempts = 0;
                    for(;;){
                        onActivity();
                        const result = await Promise.race([
                            this._worker[method](...args),
                            restartPromise, 
                        ]);
                        if (result !== RESTARTED) return result;
                        if (onRestart) onRestart(method, args, ++attempts);
                    }
                } finally{
                    activeTasks--;
                    onActivity();
                }
            } : this._worker[method].bind(this._worker);
        }
    }
    end() {
        const worker = this._worker;
        if (!worker) {
            throw new Error("Farm is ended, no more calls can be done to it");
        }
        this._worker = undefined;
        return worker.end();
    }
    /**
   * Quietly end the worker if it exists
   */ close() {
        if (this._worker) {
            this._worker.end();
        }
    }
}
exports.Worker = Worker;

//# sourceMappingURL=worker.js.map