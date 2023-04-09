import { AppRenderSpan } from "./trace/constants";
import { getTracer, SpanKind } from "./trace/tracer";
import { CACHE_ONE_YEAR } from "../../lib/constants";
const isEdgeRuntime = process.env.NEXT_RUNTIME === "edge";
// we patch fetch to collect cache information used for
// determining if a page is static or not
export function patchFetch({ serverHooks , staticGenerationAsyncStorage  }) {
    if (fetch.__nextPatched) return;
    const { DynamicServerError  } = serverHooks;
    const originFetch = fetch;
    // @ts-expect-error - we're patching fetch
    // eslint-disable-next-line no-native-reassign
    fetch = getTracer().wrap(AppRenderSpan.fetch, {
        kind: SpanKind.CLIENT
    }, async (input, init)=>{
        var ref5, ref1, ref2, ref3, ref4;
        const staticGenerationStore = staticGenerationAsyncStorage.getStore();
        const isRequestInput = input && typeof input === "object" && typeof input.method === "string";
        const getRequestMeta = (field)=>{
            var ref;
            let value = isRequestInput ? input[field] : null;
            return value || ((ref = init) == null ? void 0 : ref[field]);
        };
        // If the staticGenerationStore is not available, we can't do any
        // special treatment of fetch, therefore fallback to the original
        // fetch implementation.
        if (!staticGenerationStore || ((ref5 = init == null ? void 0 : init.next) == null ? void 0 : ref5.internal)) {
            return originFetch(input, init);
        }
        let revalidate = undefined;
        // RequestInit doesn't keep extra fields e.g. next so it's
        // only available if init is used separate
        let curRevalidate = typeof (init == null ? void 0 : (ref1 = init.next) == null ? void 0 : ref1.revalidate) !== "undefined" ? init == null ? void 0 : (ref2 = init.next) == null ? void 0 : ref2.revalidate : isRequestInput ? (ref3 = input.next) == null ? void 0 : ref3.revalidate : undefined;
        const _cache = getRequestMeta("cache");
        if (_cache === "force-cache") {
            curRevalidate = false;
        }
        if ([
            "no-cache",
            "no-store"
        ].includes(_cache || "")) {
            curRevalidate = 0;
        }
        if (typeof curRevalidate === "number") {
            revalidate = curRevalidate;
        }
        if (curRevalidate === false) {
            revalidate = CACHE_ONE_YEAR;
        }
        const _headers = getRequestMeta("headers");
        const initHeaders = typeof (_headers == null ? void 0 : _headers.get) === "function" ? _headers : new Headers(_headers || {});
        const hasUnCacheableHeader = initHeaders.get("authorization") || initHeaders.get("cookie");
        const isUnCacheableMethod = ![
            "get",
            "head"
        ].includes(((ref4 = getRequestMeta("method")) == null ? void 0 : ref4.toLowerCase()) || "get");
        // if there are authorized headers or a POST method and
        // dynamic data usage was present above the tree we bail
        // e.g. if cookies() is used before an authed/POST fetch
        const autoNoCache = (hasUnCacheableHeader || isUnCacheableMethod) && staticGenerationStore.revalidate === 0;
        if (typeof revalidate === "undefined") {
            if (autoNoCache) {
                revalidate = 0;
            } else {
                revalidate = typeof staticGenerationStore.revalidate === "boolean" || typeof staticGenerationStore.revalidate === "undefined" ? CACHE_ONE_YEAR : staticGenerationStore.revalidate;
            }
        }
        if (// we don't consider autoNoCache to switch to dynamic during
        // revalidate although if it occurs during build we do
        !autoNoCache && (typeof staticGenerationStore.revalidate === "undefined" || typeof revalidate === "number" && revalidate < staticGenerationStore.revalidate)) {
            staticGenerationStore.revalidate = revalidate;
        }
        let cacheKey;
        if (staticGenerationStore.incrementalCache && typeof revalidate === "number" && revalidate > 0) {
            try {
                cacheKey = await staticGenerationStore.incrementalCache.fetchCacheKey(isRequestInput ? input.url : input.toString(), isRequestInput ? input : init);
            } catch (err) {
                console.error(`Failed to generate cache key for`, input);
            }
        }
        const requestInputFields = [
            "cache",
            "credentials",
            "headers",
            "integrity",
            "keepalive",
            "method",
            "mode",
            "redirect",
            "referrer",
            "referrerPolicy",
            "signal",
            "window",
            "duplex", 
        ];
        if (isRequestInput) {
            const reqInput = input;
            const reqOptions = {
                body: reqInput._ogBody || reqInput.body
            };
            for (const field of requestInputFields){
                // @ts-expect-error custom fields
                reqOptions[field] = reqInput[field];
            }
            input = new Request(reqInput.url, reqOptions);
        } else if (init) {
            const initialInit = init;
            init = {
                body: init._ogBody || init.body
            };
            for (const field of requestInputFields){
                // @ts-expect-error custom fields
                init[field] = initialInit[field];
            }
        }
        const doOriginalFetch = async ()=>{
            return originFetch(input, init).then(async (res)=>{
                if (staticGenerationStore.incrementalCache && cacheKey && typeof revalidate === "number" && revalidate > 0) {
                    let base64Body = "";
                    const resBlob = await res.blob();
                    const arrayBuffer = await resBlob.arrayBuffer();
                    if (process.env.NEXT_RUNTIME === "edge") {
                        const { encode  } = require("../../shared/lib/bloom-filter/base64-arraybuffer");
                        base64Body = encode(arrayBuffer);
                    } else {
                        base64Body = Buffer.from(arrayBuffer).toString("base64");
                    }
                    try {
                        await staticGenerationStore.incrementalCache.set(cacheKey, {
                            kind: "FETCH",
                            data: {
                                headers: Object.fromEntries(res.headers.entries()),
                                body: base64Body
                            },
                            revalidate
                        }, revalidate, true);
                    } catch (err) {
                        console.warn(`Failed to set fetch cache`, input, err);
                    }
                    return new Response(resBlob, {
                        headers: res.headers,
                        status: res.status
                    });
                }
                return res;
            });
        };
        if (cacheKey && (staticGenerationStore == null ? void 0 : staticGenerationStore.incrementalCache)) {
            const entry = await staticGenerationStore.incrementalCache.get(cacheKey, true);
            if ((entry == null ? void 0 : entry.value) && entry.value.kind === "FETCH") {
                // when stale and is revalidating we wait for fresh data
                // so the revalidated entry has the updated data
                if (!staticGenerationStore.isRevalidate || !entry.isStale) {
                    if (entry.isStale) {
                        if (!staticGenerationStore.pendingRevalidates) {
                            staticGenerationStore.pendingRevalidates = [];
                        }
                        staticGenerationStore.pendingRevalidates.push(doOriginalFetch().catch(console.error));
                    }
                    const resData = entry.value.data;
                    let decodedBody;
                    if (process.env.NEXT_RUNTIME === "edge") {
                        const { decode  } = require("../../shared/lib/bloom-filter/base64-arraybuffer");
                        decodedBody = decode(resData.body);
                    } else {
                        decodedBody = Buffer.from(resData.body, "base64").subarray();
                    }
                    return new Response(decodedBody, {
                        headers: resData.headers,
                        status: resData.status
                    });
                }
            }
        }
        if (staticGenerationStore.isStaticGeneration) {
            if (init && typeof init === "object") {
                const cache = init.cache;
                // Delete `cache` property as Cloudflare Workers will throw an error
                if (isEdgeRuntime) {
                    delete init.cache;
                }
                if (cache === "no-store") {
                    staticGenerationStore.revalidate = 0;
                    // TODO: ensure this error isn't logged to the user
                    // seems it's slipping through currently
                    const dynamicUsageReason = `no-store fetch ${input}${staticGenerationStore.pathname ? ` ${staticGenerationStore.pathname}` : ""}`;
                    const err = new DynamicServerError(dynamicUsageReason);
                    staticGenerationStore.dynamicUsageStack = err.stack;
                    staticGenerationStore.dynamicUsageDescription = dynamicUsageReason;
                    throw err;
                }
                const hasNextConfig = "next" in init;
                const next = init.next || {};
                if (typeof next.revalidate === "number" && (typeof staticGenerationStore.revalidate === "undefined" || next.revalidate < staticGenerationStore.revalidate)) {
                    const forceDynamic = staticGenerationStore.forceDynamic;
                    if (!forceDynamic || next.revalidate !== 0) {
                        staticGenerationStore.revalidate = next.revalidate;
                    }
                    if (!forceDynamic && next.revalidate === 0) {
                        const dynamicUsageReason = `revalidate: ${next.revalidate} fetch ${input}${staticGenerationStore.pathname ? ` ${staticGenerationStore.pathname}` : ""}`;
                        const err = new DynamicServerError(dynamicUsageReason);
                        staticGenerationStore.dynamicUsageStack = err.stack;
                        staticGenerationStore.dynamicUsageDescription = dynamicUsageReason;
                        throw err;
                    }
                }
                if (hasNextConfig) delete init.next;
            }
        }
        return doOriginalFetch();
    });
    fetch.__nextPatched = true;
}

//# sourceMappingURL=patch-fetch.js.map