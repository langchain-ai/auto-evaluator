"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _isAppPageRoute = require("../../../lib/is-app-page-route");
var _constants = require("../../../shared/lib/constants");
var _app = require("../normalizers/built/app");
var _routeKind = require("../route-kind");
var _appPageRouteMatcher = require("../route-matchers/app-page-route-matcher");
var _manifestRouteMatcherProvider = require("./manifest-route-matcher-provider");
class AppPageRouteMatcherProvider extends _manifestRouteMatcherProvider.ManifestRouteMatcherProvider {
    constructor(distDir, manifestLoader){
        super(_constants.APP_PATHS_MANIFEST, manifestLoader);
        this.normalizers = new _app.AppNormalizers(distDir);
    }
    async transform(manifest) {
        // This matcher only matches app pages.
        const pages = Object.keys(manifest).filter((page)=>(0, _isAppPageRoute).isAppPageRoute(page));
        // Collect all the app paths for each page. This could include any parallel
        // routes.
        const allAppPaths = {};
        for (const page1 of pages){
            const pathname = this.normalizers.pathname.normalize(page1);
            if (pathname in allAppPaths) allAppPaths[pathname].push(page1);
            else allAppPaths[pathname] = [
                page1
            ];
        }
        // Format the routes.
        const matchers = [];
        for (const [pathname, appPaths] of Object.entries(allAppPaths)){
            // TODO-APP: (wyattjoh) this is a hack right now, should be more deterministic
            const page = appPaths[0];
            const filename = this.normalizers.filename.normalize(manifest[page]);
            const bundlePath = this.normalizers.bundlePath.normalize(page);
            matchers.push(new _appPageRouteMatcher.AppPageRouteMatcher({
                kind: _routeKind.RouteKind.APP_PAGE,
                pathname,
                page,
                bundlePath,
                filename,
                appPaths
            }));
        }
        return matchers;
    }
}
exports.AppPageRouteMatcherProvider = AppPageRouteMatcherProvider;

//# sourceMappingURL=app-page-route-matcher-provider.js.map