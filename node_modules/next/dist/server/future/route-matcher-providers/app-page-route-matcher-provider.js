"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _isAppPageRoute = require("../../../lib/is-app-page-route");
var _constants = require("../../../shared/lib/constants");
var _path = _interopRequireDefault(require("../../../shared/lib/isomorphic/path"));
var _appPaths = require("../../../shared/lib/router/utils/app-paths");
var _routeKind = require("../route-kind");
var _appPageRouteMatcher = require("../route-matchers/app-page-route-matcher");
var _manifestRouteMatcherProvider = require("./manifest-route-matcher-provider");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class AppPageRouteMatcherProvider extends _manifestRouteMatcherProvider.ManifestRouteMatcherProvider {
    constructor(distDir, manifestLoader){
        super(_constants.APP_PATHS_MANIFEST, manifestLoader);
        this.distDir = distDir;
    }
    async transform(manifest) {
        // This matcher only matches app pages.
        const pages = Object.keys(manifest).filter((page)=>(0, _isAppPageRoute).isAppPageRoute(page));
        // Collect all the app paths for each page. This could include any parallel
        // routes.
        const appPaths = {};
        for (const page1 of pages){
            const pathname = (0, _appPaths).normalizeAppPath(page1);
            if (pathname in appPaths) appPaths[pathname].push(page1);
            else appPaths[pathname] = [
                page1
            ];
        }
        // Format the routes.
        const matchers = [];
        for (const [pathname, paths] of Object.entries(appPaths)){
            // TODO-APP: (wyattjoh) this is a hack right now, should be more deterministic
            const page = paths[0];
            const filename = _path.default.join(this.distDir, _constants.SERVER_DIRECTORY, manifest[page]);
            const bundlePath = _path.default.join("app", page);
            matchers.push(new _appPageRouteMatcher.AppPageRouteMatcher({
                kind: _routeKind.RouteKind.APP_PAGE,
                pathname,
                page,
                bundlePath,
                filename,
                appPaths: paths
            }));
        }
        return matchers;
    }
}
exports.AppPageRouteMatcherProvider = AppPageRouteMatcherProvider;

//# sourceMappingURL=app-page-route-matcher-provider.js.map