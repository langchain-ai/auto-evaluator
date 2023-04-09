export interface StartServerOptions {
    dir: string;
    prevDir?: string;
    port: number;
    isDev: boolean;
    hostname: string;
    useWorkers: boolean;
    allowRetry?: boolean;
    isTurbopack?: boolean;
    keepAliveTimeout?: number;
    onStdout?: (data: any) => void;
    onStderr?: (data: any) => void;
}
declare type TeardownServer = () => Promise<void>;
export declare function startServer({ dir, prevDir, port, isDev, hostname, useWorkers, allowRetry, keepAliveTimeout, onStdout, onStderr, }: StartServerOptions): Promise<TeardownServer>;
export {};
