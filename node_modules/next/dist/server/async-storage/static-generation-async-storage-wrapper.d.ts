/// <reference types="node" />
import { AsyncStorageWrapper } from './async-storage-wrapper';
import type { StaticGenerationStore } from '../../client/components/static-generation-async-storage';
import type { AsyncLocalStorage } from 'async_hooks';
import { IncrementalCache } from '../lib/incremental-cache';
export declare type RequestContext = {
    pathname: string;
    renderOpts: {
        incrementalCache?: IncrementalCache;
        supportsDynamicHTML: boolean;
        isRevalidate?: boolean;
        isBot?: boolean;
        nextExport?: boolean;
    };
};
export declare class StaticGenerationAsyncStorageWrapper implements AsyncStorageWrapper<StaticGenerationStore, RequestContext> {
    wrap<Result>(storage: AsyncLocalStorage<StaticGenerationStore>, context: RequestContext, callback: (store: StaticGenerationStore) => Result): Result;
    /**
     * @deprecated instance method should be used in favor of the static method
     */
    static wrap<Result>(storage: AsyncLocalStorage<StaticGenerationStore>, { pathname, renderOpts }: RequestContext, callback: (store: StaticGenerationStore) => Result): Result;
}
