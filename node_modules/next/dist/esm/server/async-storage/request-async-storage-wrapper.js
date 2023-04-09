import { FLIGHT_PARAMETERS } from "../../client/components/app-router-headers";
import { ReadonlyHeaders, ReadonlyRequestCookies } from "../app-render";
function headersWithoutFlight(headers) {
    const newHeaders = {
        ...headers
    };
    for (const param of FLIGHT_PARAMETERS){
        delete newHeaders[param.toString().toLowerCase()];
    }
    return newHeaders;
}
export class RequestAsyncStorageWrapper {
    /**
   * Tries to get the preview data on the request for the given route. This
   * isn't enabled in the edge runtime yet.
   */ static tryGetPreviewData = process.env.NEXT_RUNTIME !== "edge" ? require("../api-utils/node").tryGetPreviewData : null;
    /**
   * Wrap the callback with the given store so it can access the underlying
   * store using hooks.
   *
   * @param storage underlying storage object returned by the module
   * @param context context to seed the store
   * @param callback function to call within the scope of the context
   * @returns the result returned by the callback
   */ wrap(storage, context, callback) {
        return RequestAsyncStorageWrapper.wrap(storage, context, callback);
    }
    /**
   * @deprecated instance method should be used in favor of the static method
   */ static wrap(storage, { req , res , renderOpts  }, callback) {
        // Reads of this are cached on the `req` object, so this should resolve
        // instantly. There's no need to pass this data down from a previous
        // invoke, where we'd have to consider server & serverless.
        const previewData = renderOpts && RequestAsyncStorageWrapper.tryGetPreviewData ? RequestAsyncStorageWrapper.tryGetPreviewData(req, res, renderOpts.previewProps) : false;
        let cachedHeadersInstance;
        let cachedCookiesInstance;
        const store = {
            get headers () {
                if (!cachedHeadersInstance) {
                    cachedHeadersInstance = new ReadonlyHeaders(headersWithoutFlight(req.headers));
                }
                return cachedHeadersInstance;
            },
            get cookies () {
                if (!cachedCookiesInstance) {
                    cachedCookiesInstance = new ReadonlyRequestCookies({
                        headers: {
                            get: (key)=>{
                                if (key !== "cookie") {
                                    throw new Error("Only cookie header is supported");
                                }
                                return req.headers.cookie;
                            }
                        }
                    });
                }
                return cachedCookiesInstance;
            },
            previewData
        };
        return storage.run(store, callback, store);
    }
}

//# sourceMappingURL=request-async-storage-wrapper.js.map