export declare const WORKER_SELF_EXIT_CODE = 77;
declare let result: undefined | {
    port: number;
    hostname: string;
};
export declare function clearModuleContext(target: string, content: string): void;
export declare function deleteAppClientCache(): void;
export declare function deleteCache(filePath: string): void;
export declare function initialize(opts: {
    dir: string;
    port: number;
    dev: boolean;
    hostname?: string;
    workerType: 'router' | 'render';
    keepAliveTimeout?: number;
}): Promise<NonNullable<typeof result>>;
export {};
