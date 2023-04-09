"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _routeModule = require("../route-module");
var _requestAsyncStorageWrapper = require("../../../async-storage/request-async-storage-wrapper");
var _staticGenerationAsyncStorageWrapper = require("../../../async-storage/static-generation-async-storage-wrapper");
var _responseHandlers = require("../helpers/response-handlers");
var _http = require("../../../web/http");
var _patchFetch = require("../../../lib/patch-fetch");
var _tracer = require("../../../lib/trace/tracer");
var _constants = require("../../../lib/trace/constants");
var _getPathnameFromAbsolutePath = require("./helpers/get-pathname-from-absolute-path");
var _proxyRequest = require("./helpers/proxy-request");
var _resolveHandlerError = require("./helpers/resolve-handler-error");
var _routeKind = require("../../route-kind");
var Log = _interopRequireWildcard(require("../../../../build/output/log"));
var _autoImplementMethods = require("./helpers/auto-implement-methods");
var _getNonStaticMethods = require("./helpers/get-non-static-methods");
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
var // If the static generation store does not have a revalidate value
// set, then we should set it the revalidate value from the userland
// module or default to false.
_staticGenerationStore;
class AppRouteRouteModule extends _routeModule.RouteModule {
    constructor({ userland , pathname , resolvedPagePath , nextConfigOutput  }){
        super({
            userland
        });
        this.definition = {
            kind: _routeKind.RouteKind.APP_ROUTE,
            pathname,
            // The following aren't needed for the route handler.
            page: "",
            bundlePath: "",
            filename: ""
        };
        this.pathname = pathname;
        this.resolvedPagePath = resolvedPagePath;
        this.nextConfigOutput = nextConfigOutput;
        // Automatically implement some methods if they aren't implemented by the
        // userland module.
        this.methods = (0, _autoImplementMethods).autoImplementMethods(userland);
        // Get the non-static methods for this route.
        this.nonStaticMethods = (0, _getNonStaticMethods).getNonStaticMethods(userland);
        // Get the dynamic property from the userland module.
        this.dynamic = this.userland.dynamic;
        if (this.nextConfigOutput === "export") {
            if (!this.dynamic || this.dynamic === "auto") {
                this.dynamic = "error";
            } else if (this.dynamic === "force-dynamic") {
                throw new Error(`export const dynamic = "force-dynamic" on page "${pathname}" cannot be used with "output: export". See more info here: https://nextjs.org/docs/advanced-features/static-html-export`);
            }
        }
    }
    /**
   * When true, indicates that the global interfaces have been patched via the
   * `patch()` method.
   */ hasSetup = false;
    /**
   * Validates the userland module to ensure the exported methods and properties
   * are valid.
   */ async setup() {
        // If we've already setup, then return.
        if (this.hasSetup) return;
        // Patch the global fetch.
        (0, _patchFetch).patchFetch({
            serverHooks: this.serverHooks,
            staticGenerationAsyncStorage: this.staticGenerationAsyncStorage
        });
        // Mark the module as setup. The following warnings about the userland
        // module will run if we're in development. If the module files are modified
        // when in development, then the require cache will be busted for it and
        // this method will be called again (resetting the `hasSetup` flag).
        this.hasSetup = true;
        // We only warn in development after here, so return if we're not in
        // development.
        if (process.env.NODE_ENV === "development") {
            // Print error in development if the exported handlers are in lowercase, only
            // uppercase handlers are supported.
            const lowercased = _http.HTTP_METHODS.map((method)=>method.toLowerCase());
            for (const method1 of lowercased){
                if (method1 in this.userland) {
                    Log.error(`Detected lowercase method '${method1}' in '${this.resolvedPagePath}'. Export the uppercase '${method1.toUpperCase()}' method name to fix this error.`);
                }
            }
            // Print error if the module exports a default handler, they must use named
            // exports for each HTTP method.
            if ("default" in this.userland) {
                Log.error(`Detected default export in '${this.resolvedPagePath}'. Export a named export for each HTTP method instead.`);
            }
            // If there is no methods exported by this module, then return a not found
            // response.
            if (!_http.HTTP_METHODS.some((method)=>method in this.userland)) {
                Log.error(`No HTTP methods exported in '${this.resolvedPagePath}'. Export a named export for each HTTP method.`);
            }
        }
    }
    /**
   * Resolves the handler function for the given method.
   *
   * @param method the requested method
   * @returns the handler function for the given method
   */ resolve(method) {
        // Ensure that the requested method is a valid method (to prevent RCE's).
        if (!(0, _http).isHTTPMethod(method)) return _responseHandlers.handleBadRequestResponse;
        // Return the handler.
        return this.methods[method];
    }
    /**
   * Executes the route handler.
   */ async execute(request, context) {
        // Get the handler function for the given method.
        const handler = this.resolve(request.method);
        // Get the context for the request.
        const requestContext = {
            req: request
        };
        // Get the context for the static generation.
        const staticGenerationContext = {
            pathname: this.definition.pathname,
            renderOpts: // If the staticGenerationContext is not provided then we default to
            // the default values.
            context.staticGenerationContext ?? {
                supportsDynamicHTML: false
            }
        };
        // Add the fetchCache option to the renderOpts.
        staticGenerationContext.renderOpts.fetchCache = this.userland.fetchCache;
        // Run the handler with the request AsyncLocalStorage to inject the helper
        // support. We set this to `unknown` because the type is not known until
        // runtime when we do a instanceof check below.
        const response = await _requestAsyncStorageWrapper.RequestAsyncStorageWrapper.wrap(this.requestAsyncStorage, requestContext, ()=>{
            return _staticGenerationAsyncStorageWrapper.StaticGenerationAsyncStorageWrapper.wrap(this.staticGenerationAsyncStorage, staticGenerationContext, (staticGenerationStore)=>{
                var ref;
                // Check to see if we should bail out of static generation based on
                // having non-static methods.
                if (this.nonStaticMethods) {
                    this.staticGenerationBailout(`non-static methods used ${this.nonStaticMethods.join(", ")}`);
                }
                // Update the static generation store based on the dynamic property.
                switch(this.dynamic){
                    case "force-dynamic":
                        // The dynamic property is set to force-dynamic, so we should
                        // force the page to be dynamic.
                        staticGenerationStore.forceDynamic = true;
                        this.staticGenerationBailout(`force-dynamic`, {
                            dynamic: this.dynamic
                        });
                        break;
                    case "force-static":
                        // The dynamic property is set to force-static, so we should
                        // force the page to be static.
                        staticGenerationStore.forceStatic = true;
                        break;
                    case "error":
                        // The dynamic property is set to error, so we should throw an
                        // error if the page is being statically generated.
                        staticGenerationStore.dynamicShouldError = true;
                        break;
                    default:
                        break;
                }
                (_staticGenerationStore = staticGenerationStore).revalidate ?? (_staticGenerationStore.revalidate = this.userland.revalidate ?? false);
                // Wrap the request so we can add additional functionality to cases
                // that might change it's output or affect the rendering.
                const wrappedRequest = (0, _proxyRequest).proxyRequest(request, {
                    dynamic: this.dynamic
                }, {
                    headerHooks: this.headerHooks,
                    serverHooks: this.serverHooks,
                    staticGenerationBailout: this.staticGenerationBailout
                });
                // TODO: propagate this pathname from route matcher
                const route = (0, _getPathnameFromAbsolutePath).getPathnameFromAbsolutePath(this.resolvedPagePath);
                (ref = (0, _tracer).getTracer().getRootSpanAttributes()) == null ? void 0 : ref.set("next.route", route);
                return (0, _tracer).getTracer().trace(_constants.AppRouteRouteHandlersSpan.runHandler, {
                    spanName: `executing api route (app) ${route}`,
                    attributes: {
                        "next.route": route
                    }
                }, ()=>handler(wrappedRequest, {
                        params: context.params
                    }));
            });
        });
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
    async handle(request, context) {
        try {
            // Execute the route to get the response.
            const response = await this.execute(request, context);
            // The response was handled, return it.
            return response;
        } catch (err) {
            // Try to resolve the error to a response, else throw it again.
            const response = (0, _resolveHandlerError).resolveHandlerError(err);
            if (!response) throw err;
            // The response was resolved, return it.
            return response;
        }
    }
}
exports.AppRouteRouteModule = AppRouteRouteModule;
var _default = AppRouteRouteModule;
exports.default = _default;

//# sourceMappingURL=module.js.map