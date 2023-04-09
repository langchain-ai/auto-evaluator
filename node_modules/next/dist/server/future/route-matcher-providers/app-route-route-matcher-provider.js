"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _path = _interopRequireDefault(require("../../../shared/lib/isomorphic/path"));
var _isAppRouteRoute = require("../../../lib/is-app-route-route");
var _constants = require("../../../shared/lib/constants");
var _appPaths = require("../../../shared/lib/router/utils/app-paths");
var _routeKind = require("../route-kind");
var _appRouteRouteMatcher = require("../route-matchers/app-route-route-matcher");
var _manifestRouteMatcherProvider = require("./manifest-route-matcher-provider");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class AppRouteRouteMatcherProvider extends _manifestRouteMatcherProvider.ManifestRouteMatcherProvider {
    constructor(distDir, manifestLoader){
        super(_constants.APP_PATHS_MANIFEST, manifestLoader);
        this.distDir = distDir;
    }
    async transform(manifest) {
        // This matcher only matches app routes.
        const pages = Object.keys(manifest).filter((page)=>(0, _isAppRouteRoute).isAppRouteRoute(page) || (0, _isAppRouteRoute).isMetadataRoute(page));
        // Format the routes.
        const matchers = [];
        for (const page1 of pages){
            const pathname = (0, _appPaths).normalizeAppPath(page1);
            const filename = _path.default.join(this.distDir, _constants.SERVER_DIRECTORY, manifest[page1]);
            const bundlePath = _path.default.join("app", page1);
            matchers.push(new _appRouteRouteMatcher.AppRouteRouteMatcher({
                kind: _routeKind.RouteKind.APP_ROUTE,
                pathname,
                page: page1,
                bundlePath,
                filename
            }));
        }
        return matchers;
    }
}
exports.AppRouteRouteMatcherProvider = AppRouteRouteMatcherProvider;

//# sourceMappingURL=app-route-route-matcher-provider.js.map