"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendResponse = sendResponse;
var _notFound = require("../../../client/components/not-found");
var _redirect = require("../../../client/components/redirect");
var _requestAsyncStorageWrapper = require("../../async-storage/request-async-storage-wrapper");
var _requestMeta = require("../../request-meta");
var _responseHandlers = require("../helpers/response-handlers");
var _http = require("../../web/http");
var _request = require("../../web/spec-extension/request");
var _utils = require("../../web/utils");
var Log = _interopRequireWildcard(require("../../../build/output/log"));
var _patchFetch = require("../../lib/patch-fetch");
var _staticGenerationAsyncStorageWrapper = require("../../async-storage/static-generation-async-storage-wrapper");
var _cookies = require("next/dist/compiled/@edge-runtime/cookies");
var _nextUrl = require("../../web/next-url");
function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function() {
        return cache;
    };
    return cache;
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
// TODO-APP: This module has a dynamic require so when bundling for edge it causes issues.
const NodeModuleLoader = process.env.NEXT_RUNTIME !== "edge" ? require("../helpers/module-loader/node-module-loader").NodeModuleLoader : class {
};
/**
 * Wraps the base next request to a request compatible with the app route
 * signature.
 *
 * @param req base request to adapt for use with app routes
 * @returns the wrapped request.
 */ function wrapRequest(req) {
    const { originalRequest  } = req;
    const url = (0, _requestMeta).getRequestMeta(originalRequest, "__NEXT_INIT_URL");
    if (!url) throw new Error("Invariant: missing url on request");
    // HEAD and GET requests can not have a body.
    const body = req.method !== "GET" && req.method !== "HEAD" && req.body ? req.body : null;
    return new _request.NextRequest(url, {
        body,
        // @ts-expect-error - see https://github.com/whatwg/fetch/pull/1457
        duplex: "half",
        method: req.method,
        headers: (0, _utils).fromNodeHeaders(req.headers)
    });
}
function resolveHandlerError(err, bubbleResult) {
    if ((0, _redirect).isRedirectError(err)) {
        const redirect = (0, _redirect).getURLFromRedirectError(err);
        if (!redirect) {
            throw new Error("Invariant: Unexpected redirect url format");
        }
        // This is a redirect error! Send the redirect response.
        return (0, _responseHandlers).handleTemporaryRedirectResponse(redirect);
    }
    if ((0, _notFound).isNotFoundError(err)) {
        // This is a not found error! Send the not found response.
        return (0, _responseHandlers).handleNotFoundResponse();
    }
    if (bubbleResult) {
        throw err;
    }
    // TODO: validate the correct handling behavior
    Log.error(err);
    return (0, _responseHandlers).handleInternalServerErrorResponse();
}
async function sendResponse(req, res, response) {
    // Don't use in edge runtime
    if (process.env.NEXT_RUNTIME !== "edge") {
        var // Copy over the response headers.
        ref;
        // Copy over the response status.
        res.statusCode = response.status;
        res.statusMessage = response.statusText;
        (ref = response.headers) == null ? void 0 : ref.forEach((value, name)=>{
            // The append handling is special cased for `set-cookie`.
            if (name.toLowerCase() === "set-cookie") {
                res.setHeader(name, value);
            } else {
                res.appendHeader(name, value);
            }
        });
        /**
     * The response can't be directly piped to the underlying response. The
     * following is duplicated from the edge runtime handler.
     *
     * See packages/next/server/next-server.ts
     */ const originalResponse = res.originalResponse;
        // A response body must not be sent for HEAD requests. See https://httpwg.org/specs/rfc9110.html#HEAD
        if (response.body && req.method !== "HEAD") {
            const { consumeUint8ArrayReadableStream  } = require("next/dist/compiled/edge-runtime");
            const iterator = consumeUint8ArrayReadableStream(response.body);
            try {
                for await (const chunk of iterator){
                    originalResponse.write(chunk);
                }
            } finally{
                originalResponse.end();
            }
        } else {
            originalResponse.end();
        }
    }
}
function cleanURL(urlString) {
    const url = new URL(urlString);
    url.host = "localhost:3000";
    url.search = "";
    url.protocol = "http";
    return url.toString();
}
function proxyRequest(req, module) {
    function handleNextUrlBailout(prop) {
        switch(prop){
            case "search":
            case "searchParams":
            case "toString":
            case "href":
            case "origin":
                module.staticGenerationBailout(`nextUrl.${prop}`);
                return;
            default:
                return;
        }
    }
    const cache = {};
    const handleForceStatic = (url, prop)=>{
        switch(prop){
            case "search":
                return "";
            case "searchParams":
                if (!cache.searchParams) cache.searchParams = new URLSearchParams();
                return cache.searchParams;
            case "url":
            case "href":
                if (!cache.url) cache.url = cleanURL(url);
                return cache.url;
            case "toJSON":
            case "toString":
                if (!cache.url) cache.url = cleanURL(url);
                if (!cache.toString) cache.toString = ()=>cache.url;
                return cache.toString;
            case "headers":
                if (!cache.headers) cache.headers = new Headers();
                return cache.headers;
            case "cookies":
                if (!cache.headers) cache.headers = new Headers();
                if (!cache.cookies) cache.cookies = new _cookies.RequestCookies(cache.headers);
                return cache.cookies;
            case "clone":
                if (!cache.url) cache.url = cleanURL(url);
                return ()=>new _nextUrl.NextURL(cache.url);
            default:
                break;
        }
    };
    const wrappedNextUrl = new Proxy(req.nextUrl, {
        get (target, prop) {
            handleNextUrlBailout(prop);
            if (module.handlers.dynamic === "force-static" && typeof prop === "string") {
                const result = handleForceStatic(target.href, prop);
                if (result !== undefined) return result;
            }
            return target[prop];
        },
        set (target, prop, value) {
            handleNextUrlBailout(prop);
            target[prop] = value;
            return true;
        }
    });
    const handleReqBailout = (prop)=>{
        switch(prop){
            case "headers":
                module.headerHooks.headers();
                return;
            // if request.url is accessed directly instead of
            // request.nextUrl we bail since it includes query
            // values that can be relied on dynamically
            case "url":
            case "body":
            case "blob":
            case "json":
            case "text":
            case "arrayBuffer":
            case "formData":
                module.staticGenerationBailout(`request.${prop}`);
                return;
            default:
                return;
        }
    };
    return new Proxy(req, {
        get (target, prop) {
            handleReqBailout(prop);
            if (prop === "nextUrl") {
                return wrappedNextUrl;
            }
            if (module.handlers.dynamic === "force-static" && typeof prop === "string") {
                const result = handleForceStatic(target.url, prop);
                if (result !== undefined) return result;
            }
            return target[prop];
        },
        set (target, prop, value) {
            handleReqBailout(prop);
            target[prop] = value;
            return true;
        }
    });
}
class AppRouteRouteHandler {
    constructor(requestAsyncLocalStorageWrapper = new _requestAsyncStorageWrapper.RequestAsyncStorageWrapper(), staticAsyncLocalStorageWrapper = new _staticGenerationAsyncStorageWrapper.StaticGenerationAsyncStorageWrapper(), moduleLoader = new NodeModuleLoader()){
        this.requestAsyncLocalStorageWrapper = requestAsyncLocalStorageWrapper;
        this.staticAsyncLocalStorageWrapper = staticAsyncLocalStorageWrapper;
        this.moduleLoader = moduleLoader;
    }
    resolve(method, mod) {
        // Ensure that the requested method is a valid method (to prevent RCE's).
        if (!(0, _http).isHTTPMethod(method)) return _responseHandlers.handleBadRequestResponse;
        // Pull out the handlers from the app route module.
        const { handlers , resolvedPagePath  } = mod;
        if (process.env.NODE_ENV !== "production") {
            // Print error in development if the exported handlers are in lowercase, only uppercase handlers are supported
            for (const invalidMethodName of [
                "get",
                "head",
                "options",
                "post",
                "put",
                "delete",
                "patch", 
            ]){
                if (handlers[invalidMethodName]) {
                    Log.error(`Detected lowercase method '${invalidMethodName}' in '${resolvedPagePath}'. Export the uppercase '${invalidMethodName.toUpperCase()}' method name to fix this error.`);
                }
            }
        }
        // Check to see if the requested method is available.
        const handler = handlers[method];
        if (handler) return handler;
        /**
     * If the request got here, then it means that there was not a handler for
     * the requested method. We'll try to automatically setup some methods if
     * there's enough information to do so.
     */ // If HEAD is not provided, but GET is, then we respond to HEAD using the
        // GET handler without the body.
        if (method === "HEAD" && "GET" in handlers) {
            return handlers["GET"];
        }
        // If OPTIONS is not provided then implement it.
        if (method === "OPTIONS") {
            // TODO: check if HEAD is implemented, if so, use it to add more headers
            // Get all the handler methods from the list of handlers.
            const methods = Object.keys(handlers).filter((handlerMethod)=>(0, _http).isHTTPMethod(handlerMethod));
            // If the list of methods doesn't include OPTIONS, add it, as it's
            // automatically implemented.
            if (!methods.includes("OPTIONS")) {
                methods.push("OPTIONS");
            }
            // If the list of methods doesn't include HEAD, but it includes GET, then
            // add HEAD as it's automatically implemented.
            if (!methods.includes("HEAD") && methods.includes("GET")) {
                methods.push("HEAD");
            }
            // Sort and join the list with commas to create the `Allow` header. See:
            // https://httpwg.org/specs/rfc9110.html#field.allow
            const allow = methods.sort().join(", ");
            return ()=>new Response(null, {
                    status: 204,
                    headers: {
                        Allow: allow
                    }
                });
        }
        // A handler for the requested method was not found, so we should respond
        // with the method not allowed handler.
        return _responseHandlers.handleMethodNotAllowedResponse;
    }
    // TODO-APP: this is temporarily used for edge.
    async execute({ params , definition  }, module, req, res, context, // TODO-APP: this is temporarily used for edge.
    request) {
        // Get the handler function for the given method.
        const handle = this.resolve(req.method, module);
        // This is added by the webpack loader, we load it directly from the module.
        const { requestAsyncStorage , staticGenerationAsyncStorage  } = module;
        const requestContext = process.env.NEXT_RUNTIME === "edge" ? {
            req,
            res
        } : {
            req: req.originalRequest,
            res: res.originalResponse
        };
        // Run the handler with the request AsyncLocalStorage to inject the helper
        // support.
        const response = await this.requestAsyncLocalStorageWrapper.wrap(requestAsyncStorage, requestContext, ()=>this.staticAsyncLocalStorageWrapper.wrap(staticGenerationAsyncStorage, {
                pathname: definition.pathname,
                renderOpts: context ?? {
                    supportsDynamicHTML: false
                }
            }, (staticGenerationStore)=>{
                // We can currently only statically optimize if only GET/HEAD
                // are used as a Prerender can't be used conditionally based
                // on the method currently
                const nonStaticHandlers = [
                    "OPTIONS",
                    "POST",
                    "PUT",
                    "DELETE",
                    "PATCH", 
                ];
                const usedNonStaticHandlers = nonStaticHandlers.filter((name)=>name in module.handlers);
                if (usedNonStaticHandlers.length > 0) {
                    module.staticGenerationBailout(`non-static methods used ${usedNonStaticHandlers.join(", ")}`);
                }
                switch(module.handlers.dynamic){
                    case "force-dynamic":
                        staticGenerationStore.forceDynamic = true;
                        module.staticGenerationBailout(`dynamic = 'force-dynamic'`);
                        break;
                    case "force-static":
                        staticGenerationStore.forceStatic = true;
                        break;
                    default:
                        break;
                }
                if (typeof staticGenerationStore.revalidate === "undefined") {
                    staticGenerationStore.revalidate = module.handlers.revalidate ?? false;
                }
                // Wrap the request so we can add additional functionality to cases
                // that might change it's output or affect the rendering.
                const wrappedRequest = proxyRequest(// TODO: investigate why/how this cast is necessary/possible
                (request ? request : wrapRequest(req)), module);
                return handle(wrappedRequest, {
                    params
                });
            }));
        // If the handler did't return a valid response, then return the internal
        // error response.
        if (!(response instanceof Response)) {
            // TODO: validate the correct handling behavior, maybe log something?
            return (0, _responseHandlers).handleInternalServerErrorResponse();
        }
        if (response.headers.has("x-middleware-rewrite")) {
            // TODO: move this error into the `NextResponse.rewrite()` function.
            // TODO-APP: re-enable support below when we can proxy these type of requests
            throw new Error("NextResponse.rewrite() was used in a app route handler, this is not currently supported. Please remove the invocation to continue.");
        // // This is a rewrite created via `NextResponse.rewrite()`. We need to send
        // // the response up so it can be handled by the backing server.
        // // If the server is running in minimal mode, we just want to forward the
        // // response (including the rewrite headers) upstream so it can perform the
        // // redirect for us, otherwise return with the special condition so this
        // // server can perform a rewrite.
        // if (!minimalMode) {
        //   return { response, condition: 'rewrite' }
        // }
        // // Relativize the url so it's relative to the base url. This is so the
        // // outgoing headers upstream can be relative.
        // const rewritePath = response.headers.get('x-middleware-rewrite')!
        // const initUrl = getRequestMeta(req, '__NEXT_INIT_URL')!
        // const { pathname } = parseUrl(relativizeURL(rewritePath, initUrl))
        // response.headers.set('x-middleware-rewrite', pathname)
        }
        if (response.headers.get("x-middleware-next") === "1") {
            // TODO: move this error into the `NextResponse.next()` function.
            throw new Error("NextResponse.next() was used in a app route handler, this is not supported. See here for more info: https://nextjs.org/docs/messages/next-response-next-in-app-route-handler");
        }
        return response;
    }
    async handle(match, req, res, context, bubbleResult) {
        try {
            // Load the module using the module loader.
            const appRouteModule = await this.moduleLoader.load(match.definition.filename);
            (0, _patchFetch).patchFetch(appRouteModule);
            // Execute the route to get the response.
            const response = await this.execute(match, appRouteModule, req, res, context);
            if (bubbleResult) {
                return response;
            }
            // Send the response back to the response.
            await sendResponse(req, res, response);
        } catch (err) {
            const response = resolveHandlerError(err, bubbleResult);
            if (bubbleResult) {
                return response;
            }
            // Get the correct response based on the error.
            await sendResponse(req, res, response);
        }
    }
}
exports.AppRouteRouteHandler = AppRouteRouteHandler;

//# sourceMappingURL=app-route-route-handler.js.map