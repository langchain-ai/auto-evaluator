"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _isAppRouteRoute = require("../../../lib/is-app-route-route");
var _constants = require("../../../shared/lib/constants");
var _routeKind = require("../route-kind");
var _appRouteRouteMatcher = require("../route-matchers/app-route-route-matcher");
var _manifestRouteMatcherProvider = require("./manifest-route-matcher-provider");
var _app = require("../normalizers/built/app");
class AppRouteRouteMatcherProvider extends _manifestRouteMatcherProvider.ManifestRouteMatcherProvider {
    constructor(distDir, manifestLoader){
        super(_constants.APP_PATHS_MANIFEST, manifestLoader);
        this.normalizers = new _app.AppNormalizers(distDir);
    }
    async transform(manifest) {
        // This matcher only matches app routes.
        const pages = Object.keys(manifest).filter((page)=>(0, _isAppRouteRoute).isAppRouteRoute(page));
        // Format the routes.
        const matchers = [];
        for (const page1 of pages){
            const filename = this.normalizers.filename.normalize(manifest[page1]);
            const pathname = this.normalizers.pathname.normalize(page1);
            const bundlePath = this.normalizers.bundlePath.normalize(page1);
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