"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getHandle = getHandle;
var _web = require("../../../../server/base-http/web");
var _appRouteRouteHandler = require("../../../../server/future/route-handlers/app-route-route-handler");
var _routeKind = require("../../../../server/future/route-kind");
var _appRouteRouteMatcher = require("../../../../server/future/route-matchers/app-route-route-matcher");
var _appPaths = require("../../../../shared/lib/router/utils/app-paths");
var _removeTrailingSlash = require("../../../../shared/lib/router/utils/remove-trailing-slash");
function getHandle({ page , mod  }) {
    const appRouteRouteHandler = new _appRouteRouteHandler.AppRouteRouteHandler();
    const appRouteRouteMatcher = new _appRouteRouteMatcher.AppRouteRouteMatcher({
        kind: _routeKind.RouteKind.APP_ROUTE,
        pathname: (0, _appPaths).normalizeAppPath(page),
        page: "",
        bundlePath: "",
        filename: ""
    });
    return async function handle(request) {
        const extendedReq = new _web.WebNextRequest(request);
        const extendedRes = new _web.WebNextResponse();
        const match = appRouteRouteMatcher.match((0, _removeTrailingSlash).removeTrailingSlash(new URL(request.url).pathname));
        const response = await appRouteRouteHandler.execute(match, mod, extendedReq, extendedRes, // TODO: pass incrementalCache here
        {
            supportsDynamicHTML: true
        }, request);
        return response;
    };
}

//# sourceMappingURL=handle.js.map