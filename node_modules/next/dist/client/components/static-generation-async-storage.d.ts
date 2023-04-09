/// <reference types="node" />
import type { AsyncLocalStorage } from 'async_hooks';
import type { IncrementalCache } from '../../server/lib/incremental-cache';
export interface StaticGenerationStore {
    readonly isStaticGeneration: boolean;
    readonly pathname: string;
    readonly incrementalCache?: IncrementalCache;
    readonly isRevalidate?: boolean;
    readonly isOnDemandRevalidate?: boolean;
    readonly isPrerendering?: boolean;
    forceDynamic?: boolean;
    fetchCache?: 'only-cache' | 'force-cache' | 'force-no-store' | 'default-no-store' | 'only-no-store';
    revalidate?: false | number;
    forceStatic?: boolean;
    dynamicShouldError?: boolean;
    pendingRevalidates?: Promise<any>[];
    dynamicUsageDescription?: string;
    dynamicUsageStack?: string;
}
export declare type StaticGenerationAsyncStorage = AsyncLocalStorage<StaticGenerationStore>;
export declare const staticGenerationAsyncStorage: StaticGenerationAsyncStorage;
