"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _appRouteRouteMatcher = require("../../route-matchers/app-route-route-matcher");
var _routeKind = require("../../route-kind");
var _fileCacheRouteMatcherProvider = require("./file-cache-route-matcher-provider");
var _isAppRouteRoute = require("../../../../lib/is-app-route-route");
var _app = require("../../normalizers/built/app");
class DevAppRouteRouteMatcherProvider extends _fileCacheRouteMatcherProvider.FileCacheRouteMatcherProvider {
    constructor(appDir, extensions, reader){
        super(appDir, reader);
        this.normalizers = new _app.DevAppNormalizers(appDir, extensions);
    }
    async transform(files) {
        const matchers = [];
        for (const filename of files){
            const page = this.normalizers.page.normalize(filename);
            // If the file isn't a match for this matcher, then skip it.
            if (!(0, _isAppRouteRoute).isAppRouteRoute(page)) continue;
            // Validate that this is not an ignored page.
            if (page.includes("/_")) continue;
            const pathname = this.normalizers.pathname.normalize(filename);
            const bundlePath = this.normalizers.bundlePath.normalize(filename);
            matchers.push(new _appRouteRouteMatcher.AppRouteRouteMatcher({
                kind: _routeKind.RouteKind.APP_ROUTE,
                pathname,
                page,
                bundlePath,
                filename
            }));
        }
        return matchers;
    }
}
exports.DevAppRouteRouteMatcherProvider = DevAppRouteRouteMatcherProvider;

//# sourceMappingURL=dev-app-route-route-matcher-provider.js.map