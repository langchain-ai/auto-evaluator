import type { NextServerOptions, NextServer } from '../next';
interface StartServerOptions extends NextServerOptions {
    allowRetry?: boolean;
    keepAliveTimeout?: number;
}
export declare const WORKER_SELF_EXIT_CODE = 77;
export declare function startServer(opts: StartServerOptions): Promise<NextServer>;
export {};
