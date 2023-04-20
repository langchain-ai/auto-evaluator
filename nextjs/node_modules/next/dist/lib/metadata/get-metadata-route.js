"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMetadataRouteSuffix = getMetadataRouteSuffix;
exports.normalizeMetadataRoute = normalizeMetadataRoute;
var _isMetadataRoute = require("./is-metadata-route");
var _path = _interopRequireDefault(require("../../shared/lib/isomorphic/path"));
var _hash = require("../../shared/lib/hash");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function getMetadataRouteSuffix(page) {
    let suffix = "";
    if (page.includes("(") && page.includes(")") || page.includes("@")) {
        suffix = (0, _hash).djb2Hash(page).toString().slice(0, 6);
    }
    return suffix;
}
function normalizeMetadataRoute(page) {
    let route = page;
    if ((0, _isMetadataRoute).isMetadataRoute(page)) {
        // Remove the file extension, e.g. /route-path/robots.txt -> /route-path
        const pathnamePrefix = page.slice(0, -(_path.default.basename(page).length + 1));
        const suffix = getMetadataRouteSuffix(pathnamePrefix);
        if (route === "/sitemap") {
            route += ".xml";
        }
        if (route === "/robots") {
            route += ".txt";
        }
        if (route === "/manifest") {
            route += ".webmanifest";
        }
        // Support both /<metadata-route.ext> and custom routes /<metadata-route>/route.ts.
        // If it's a metadata file route, we need to append /route to the page.
        if (!route.endsWith("/route")) {
            route = `${route}${suffix ? `-${suffix}` : ""}/route`;
        }
    }
    return route;
}

//# sourceMappingURL=get-metadata-route.js.map