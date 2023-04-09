import { FLIGHT_PARAMETERS } from "../../client/components/app-router-headers";
import { HeadersAdapter } from "../web/spec-extension/adapters/headers";
import { RequestCookiesAdapter } from "../web/spec-extension/adapters/request-cookies";
import { RequestCookies } from "../web/spec-extension/cookies";
function getHeaders(headers) {
    const cleaned = HeadersAdapter.from(headers);
    for (const param of FLIGHT_PARAMETERS){
        cleaned.delete(param.toString().toLowerCase());
    }
    return HeadersAdapter.seal(cleaned);
}
function getCookies(headers) {
    const cookies = new RequestCookies(HeadersAdapter.from(headers));
    return RequestCookiesAdapter.seal(cookies);
}
/**
 * Tries to get the preview data on the request for the given route. This
 * isn't enabled in the edge runtime yet.
 */ const tryGetPreviewData = process.env.NEXT_RUNTIME !== "edge" ? require("../api-utils/node").tryGetPreviewData : null;
export const RequestAsyncStorageWrapper = {
    /**
   * Wrap the callback with the given store so it can access the underlying
   * store using hooks.
   *
   * @param storage underlying storage object returned by the module
   * @param context context to seed the store
   * @param callback function to call within the scope of the context
   * @returns the result returned by the callback
   */ wrap (storage, { req , res , renderOpts  }, callback) {
        // Reads of this are cached on the `req` object, so this should resolve
        // instantly. There's no need to pass this data down from a previous
        // invoke.
        const previewData = renderOpts && tryGetPreviewData && res ? tryGetPreviewData(req, res, renderOpts.previewProps) : false;
        const cache = {};
        const store = {
            get headers () {
                if (!cache.headers) {
                    // Seal the headers object that'll freeze out any methods that could
                    // mutate the underlying data.
                    cache.headers = getHeaders(req.headers);
                }
                return cache.headers;
            },
            get cookies () {
                if (!cache.cookies) {
                    // Seal the cookies object that'll freeze out any methods that could
                    // mutate the underlying data.
                    cache.cookies = getCookies(req.headers);
                }
                return cache.cookies;
            },
            previewData
        };
        return storage.run(store, callback, store);
    }
};

//# sourceMappingURL=request-async-storage-wrapper.js.map