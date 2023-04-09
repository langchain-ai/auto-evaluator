"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _lruCache = _interopRequireDefault(require("next/dist/compiled/lru-cache"));
var _appRouterHeaders = require("../../../client/components/app-router-headers");
var _constants = require("../../../lib/constants");
class FetchCache {
    constructor(ctx){
        this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        this.headers = {};
        this.headers["Content-Type"] = "application/json";
        if (_appRouterHeaders.FETCH_CACHE_HEADER in ctx._requestHeaders) {
            const newHeaders = JSON.parse(ctx._requestHeaders[_appRouterHeaders.FETCH_CACHE_HEADER]);
            for(const k in newHeaders){
                this.headers[k] = newHeaders[k];
            }
            delete ctx._requestHeaders[_appRouterHeaders.FETCH_CACHE_HEADER];
        }
        if (ctx._requestHeaders["x-vercel-sc-host"]) {
            this.cacheEndpoint = `https://${ctx._requestHeaders["x-vercel-sc-host"]}${ctx._requestHeaders["x-vercel-sc-basepath"] || ""}`;
            if (this.debug) {
                console.log("using cache endpoint", this.cacheEndpoint);
            }
        } else if (this.debug) {
            console.log("no cache endpoint available");
        }
        if (ctx.maxMemoryCacheSize && !memoryCache) {
            if (this.debug) {
                console.log("using memory store for fetch cache");
            }
            memoryCache = new _lruCache.default({
                max: ctx.maxMemoryCacheSize,
                length ({ value  }) {
                    var ref;
                    if (!value) {
                        return 25;
                    } else if (value.kind === "REDIRECT") {
                        return JSON.stringify(value.props).length;
                    } else if (value.kind === "IMAGE") {
                        throw new Error("invariant image should not be incremental-cache");
                    } else if (value.kind === "FETCH") {
                        return JSON.stringify(value.data || "").length;
                    } else if (value.kind === "ROUTE") {
                        return value.body.length;
                    }
                    // rough estimate of size of cache value
                    return value.html.length + (((ref = JSON.stringify(value.pageData)) == null ? void 0 : ref.length) || 0);
                }
            });
        } else {
            if (this.debug) {
                console.log("not using memory store for fetch cache");
            }
        }
    }
    async get(key, fetchCache) {
        if (!fetchCache) return null;
        let data = memoryCache == null ? void 0 : memoryCache.get(key);
        // memory cache data is only leveraged for up to 1 seconds
        // so that revalidation events can be pulled from source
        if (Date.now() - ((data == null ? void 0 : data.lastModified) || 0) > 2000) {
            data = undefined;
        }
        // get data from fetch cache
        if (!data && this.cacheEndpoint) {
            try {
                const start = Date.now();
                const res = await fetch(`${this.cacheEndpoint}/v1/suspense-cache/${key}`, {
                    method: "GET",
                    headers: this.headers,
                    // @ts-expect-error
                    next: {
                        internal: true
                    }
                });
                if (res.status === 404) {
                    if (this.debug) {
                        console.log(`no fetch cache entry for ${key}, duration: ${Date.now() - start}ms`);
                    }
                    return null;
                }
                if (!res.ok) {
                    console.error(await res.text());
                    throw new Error(`invalid response from cache ${res.status}`);
                }
                const cached = await res.json();
                if (!cached || cached.kind !== "FETCH") {
                    this.debug && console.log({
                        cached
                    });
                    throw new Error(`invalid cache value`);
                }
                const cacheState = res.headers.get("x-vercel-cache-state");
                const age = res.headers.get("age");
                data = {
                    value: cached,
                    // if it's already stale set it to a time in the past
                    // if not derive last modified from age
                    lastModified: cacheState === "stale" ? Date.now() - _constants.CACHE_ONE_YEAR : Date.now() - parseInt(age || "0", 10) * 1000
                };
                if (this.debug) {
                    console.log(`got fetch cache entry for ${key}, duration: ${Date.now() - start}ms, size: ${Object.keys(cached).length}`);
                }
                if (data) {
                    memoryCache == null ? void 0 : memoryCache.set(key, data);
                }
            } catch (err) {
                // unable to get data from fetch-cache
                if (this.debug) {
                    console.error(`Failed to get from fetch-cache`, err);
                }
            }
        }
        return data || null;
    }
    async set(key, data, fetchCache) {
        if (!fetchCache) return;
        memoryCache == null ? void 0 : memoryCache.set(key, {
            value: data,
            lastModified: Date.now()
        });
        if (this.cacheEndpoint) {
            try {
                const start = Date.now();
                if (data !== null && "revalidate" in data) {
                    this.headers["x-vercel-revalidate"] = data.revalidate.toString();
                }
                if (!this.headers["x-vercel-revalidate"] && data !== null && "data" in data) {
                    this.headers["x-vercel-cache-control"] = data.data.headers["cache-control"];
                }
                const body = JSON.stringify(data);
                const res = await fetch(`${this.cacheEndpoint}/v1/suspense-cache/${key}`, {
                    method: "POST",
                    headers: this.headers,
                    body: body,
                    // @ts-expect-error
                    next: {
                        internal: true
                    }
                });
                if (!res.ok) {
                    this.debug && console.log(await res.text());
                    throw new Error(`invalid response ${res.status}`);
                }
                if (this.debug) {
                    console.log(`successfully set to fetch-cache for ${key}, duration: ${Date.now() - start}ms, size: ${body.length}`);
                }
            } catch (err) {
                // unable to set to fetch-cache
                if (this.debug) {
                    console.error(`Failed to update fetch cache`, err);
                }
            }
        }
        return;
    }
}
exports.default = FetchCache;
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let memoryCache;

//# sourceMappingURL=fetch-cache.js.map