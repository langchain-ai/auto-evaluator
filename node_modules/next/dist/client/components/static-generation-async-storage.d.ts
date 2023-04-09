/// <reference types="node" />
import type { AsyncLocalStorage } from 'async_hooks';
export interface StaticGenerationStore {
    readonly isStaticGeneration: boolean;
    readonly pathname: string;
    readonly incrementalCache?: import('../../server/lib/incremental-cache').IncrementalCache;
    readonly isRevalidate?: boolean;
    readonly isPrerendering?: boolean;
    forceDynamic?: boolean;
    revalidate?: false | number;
    forceStatic?: boolean;
    dynamicShouldError?: boolean;
    pendingRevalidates?: Promise<any>[];
    dynamicUsageDescription?: string;
    dynamicUsageStack?: string;
}
export declare type StaticGenerationAsyncStorage = AsyncLocalStorage<StaticGenerationStore>;
export declare const staticGenerationAsyncStorage: StaticGenerationAsyncStorage;
