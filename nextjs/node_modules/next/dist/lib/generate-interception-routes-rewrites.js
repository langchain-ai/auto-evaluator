"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateInterceptionRoutesRewrites = generateInterceptionRoutesRewrites;
var _pathToRegexp = require("next/dist/compiled/path-to-regexp");
var _appRouterHeaders = require("../client/components/app-router-headers");
var _interceptionRoutes = require("../server/future/helpers/interception-routes");
// a function that converts normalised paths (e.g. /foo/[bar]/[baz]) to the format expected by pathToRegexp (e.g. /foo/:bar/:baz)
function toPathToRegexpPath(path) {
    return path.replace(/\[([^\]]+)\]/g, ":$1");
}
function generateInterceptionRoutesRewrites(appPaths) {
    const rewrites = [];
    for (const appPath of appPaths){
        if ((0, _interceptionRoutes).isInterceptionRouteAppPath(appPath)) {
            const { interceptingRoute , interceptedRoute  } = (0, _interceptionRoutes).extractInterceptionRouteInformation(appPath);
            const normalizedInterceptingRoute = `${toPathToRegexpPath(interceptingRoute)}/(.*)?`;
            const normalizedInterceptedRoute = toPathToRegexpPath(interceptedRoute);
            const normalizedAppPath = toPathToRegexpPath(appPath);
            // pathToRegexp returns a regex that matches the path, but we need to
            // convert it to a string that can be used in a header value
            // to the format that Next/the proxy expects
            let interceptingRouteRegex = (0, _pathToRegexp).pathToRegexp(normalizedInterceptingRoute).toString().slice(2, -3);
            rewrites.push({
                source: normalizedInterceptedRoute,
                destination: normalizedAppPath,
                has: [
                    {
                        type: "header",
                        key: _appRouterHeaders.NEXT_URL,
                        value: interceptingRouteRegex
                    }, 
                ]
            });
        }
    }
    return rewrites;
}

//# sourceMappingURL=generate-interception-routes-rewrites.js.map