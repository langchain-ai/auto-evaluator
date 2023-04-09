import type { CacheFs } from '../../../shared/lib/utils';
import { PrerenderManifest } from '../../../build';
import { IncrementalCacheValue, IncrementalCacheEntry } from '../../response-cache';
export interface CacheHandlerContext {
    fs?: CacheFs;
    dev?: boolean;
    flushToDisk?: boolean;
    serverDistDir?: string;
    maxMemoryCacheSize?: number;
    _appDir: boolean;
    _requestHeaders: IncrementalCache['requestHeaders'];
    fetchCacheKeyPrefix?: string;
}
export interface CacheHandlerValue {
    lastModified?: number;
    age?: number;
    cacheState?: string;
    value: IncrementalCacheValue | null;
}
export declare class CacheHandler {
    constructor(_ctx: CacheHandlerContext);
    get(_key: string, _fetchCache?: boolean): Promise<CacheHandlerValue | null>;
    set(_key: string, _data: IncrementalCacheValue | null, _fetchCache?: boolean): Promise<void>;
}
export declare class IncrementalCache {
    dev?: boolean;
    cacheHandler?: CacheHandler;
    prerenderManifest: PrerenderManifest;
    requestHeaders: Record<string, undefined | string | string[]>;
    minimalMode?: boolean;
    fetchCacheKeyPrefix?: string;
    constructor({ fs, dev, appDir, flushToDisk, fetchCache, minimalMode, serverDistDir, requestHeaders, maxMemoryCacheSize, getPrerenderManifest, fetchCacheKeyPrefix, CurCacheHandler, }: {
        fs?: CacheFs;
        dev: boolean;
        appDir?: boolean;
        fetchCache?: boolean;
        minimalMode?: boolean;
        serverDistDir?: string;
        flushToDisk?: boolean;
        requestHeaders: IncrementalCache['requestHeaders'];
        maxMemoryCacheSize?: number;
        getPrerenderManifest: () => PrerenderManifest;
        fetchCacheKeyPrefix?: string;
        CurCacheHandler?: typeof CacheHandler;
    });
    private calculateRevalidate;
    _getPathname(pathname: string, fetchCache?: boolean): string;
    fetchCacheKey(url: string, init?: RequestInit | Request): Promise<string>;
    get(pathname: string, fetchCache?: boolean, revalidate?: number): Promise<IncrementalCacheEntry | null>;
    set(pathname: string, data: IncrementalCacheValue | null, revalidateSeconds?: number | false, fetchCache?: boolean): Promise<void>;
}
