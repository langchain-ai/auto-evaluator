"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _adapter = require("./adapter");
var _removeTrailingSlash = require("../../shared/lib/router/utils/remove-trailing-slash");
var _routeMatcher = require("../future/route-matchers/route-matcher");
(0, _adapter).enhanceGlobals();
class EdgeRouteModuleWrapper {
    /**
   * The constructor is wrapped with private to ensure that it can only be
   * constructed by the static wrap method.
   *
   * @param routeModule the route module to wrap
   */ constructor(routeModule){
        this.routeModule = routeModule;
        // TODO: (wyattjoh) possibly allow the module to define it's own matcher
        this.matcher = new _routeMatcher.RouteMatcher(routeModule.definition);
    }
    /**
   * This will wrap a module with the EdgeModuleWrapper and return a function
   * that can be used as a handler for the edge runtime.
   *
   * @param module the module to wrap
   * @param options any options that should be passed to the adapter and
   *                override the ones passed from the runtime
   * @returns a function that can be used as a handler for the edge runtime
   */ static wrap(routeModule, options = {}) {
        // Create the module wrapper.
        const wrapper = new EdgeRouteModuleWrapper(routeModule);
        // Return the wrapping function.
        return (opts)=>{
            return (0, _adapter).adapter({
                ...opts,
                ...options,
                // Bind the handler method to the wrapper so it still has context.
                handler: wrapper.handler.bind(wrapper)
            });
        };
    }
    async handler(request) {
        // Setup the handler if it hasn't been setup yet. It is the responsibility
        // of the module to ensure that this is only called once.
        this.routeModule.setup();
        // Get the pathname for the matcher. Pathnames should not have trailing
        // slashes for matching.
        const pathname = (0, _removeTrailingSlash).removeTrailingSlash(new URL(request.url).pathname);
        // Get the match for this request.
        const match = this.matcher.match(pathname);
        if (!match) {
            throw new Error(`Invariant: no match found for request. Pathname '${pathname}' should have matched '${this.matcher.definition.pathname}'`);
        }
        // Create the context for the handler. This contains the params from the
        // match (if any).
        const context = {
            params: match.params,
            staticGenerationContext: {
                supportsDynamicHTML: true
            }
        };
        // Get the response from the handler.
        return await this.routeModule.handle(request, context);
    }
}
exports.EdgeRouteModuleWrapper = EdgeRouteModuleWrapper;

//# sourceMappingURL=edge-route-module-wrapper.js.map