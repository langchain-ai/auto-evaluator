"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isInterceptionRouteAppPath = isInterceptionRouteAppPath;
exports.extractInterceptionRouteInformation = extractInterceptionRouteInformation;
exports.INTERCEPTION_ROUTE_MARKERS = void 0;
var _appPaths = require("../../../shared/lib/router/utils/app-paths");
const INTERCEPTION_ROUTE_MARKERS = [
    "(..)(..)",
    "(..)",
    "(...)"
];
exports.INTERCEPTION_ROUTE_MARKERS = INTERCEPTION_ROUTE_MARKERS;
function isInterceptionRouteAppPath(path) {
    // TODO-APP: add more serious validation
    return path.split("/").find((segment)=>INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m))) !== undefined;
}
function extractInterceptionRouteInformation(path) {
    let interceptingRoute, marker, interceptedRoute;
    for (const segment of path.split("/")){
        marker = INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m));
        if (marker) {
            [interceptingRoute, interceptedRoute] = path.split(marker, 2);
            break;
        }
    }
    if (!interceptingRoute || !marker || !interceptedRoute) {
        throw new Error(`Invalid interception route: ${path}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`);
    }
    interceptingRoute = interceptingRoute.slice(0, -1) // remove the trailing slash
    ;
    interceptingRoute = (0, _appPaths // normalize the path, e.g. /(blog)/feed -> /feed
    ).normalizeAppPath(interceptingRoute);
    if (marker === "(..)") {
        // (..) indicates that we should remove the last segment of the intercepting
        // route to prepend the intercepted route.
        interceptedRoute = interceptingRoute.split("/").slice(0, -1).join("/") + "/" + interceptedRoute;
    }
    if (marker === "(...)") {
        // (...) will match the route segment in the root directory, so we need to
        // use the root directory to prepend the intercepted route.
        interceptedRoute = "/" + interceptedRoute;
    }
    if (marker === "(..)(..)") {
        // (..)(..) indicates that we should remove the last two segments of the
        // intercepting route to prepend the intercepted route.
        interceptedRoute = interceptingRoute.split("/").slice(0, -2).join("/") + "/" + interceptedRoute;
    }
    return {
        interceptingRoute,
        interceptedRoute
    };
}

//# sourceMappingURL=interception-routes.js.map