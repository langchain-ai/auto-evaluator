"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _appPageRouteMatcher = require("../../route-matchers/app-page-route-matcher");
var _routeKind = require("../../route-kind");
var _fileCacheRouteMatcherProvider = require("./file-cache-route-matcher-provider");
var _app = require("../../normalizers/built/app");
class DevAppPageRouteMatcherProvider extends _fileCacheRouteMatcherProvider.FileCacheRouteMatcherProvider {
    constructor(appDir, extensions, reader){
        super(appDir, reader);
        this.normalizers = new _app.DevAppNormalizers(appDir, extensions);
        // Match any page file that ends with `/page.${extension}` under the app
        // directory.
        this.expression = new RegExp(`[/\\\\]page\\.(?:${extensions.join("|")})$`);
    }
    async transform(files) {
        // Collect all the app paths for each page. This could include any parallel
        // routes.
        const cache = new Map();
        const routeFilenames = new Array();
        const appPaths = {};
        for (const filename of files){
            // If the file isn't a match for this matcher, then skip it.
            if (!this.expression.test(filename)) continue;
            const page = this.normalizers.page.normalize(filename);
            // Validate that this is not an ignored page.
            if (page.includes("/_")) continue;
            // This is a valid file that we want to create a matcher for.
            routeFilenames.push(filename);
            const pathname = this.normalizers.pathname.normalize(filename);
            const bundlePath = this.normalizers.bundlePath.normalize(filename);
            // Save the normalization results.
            cache.set(filename, {
                page,
                pathname,
                bundlePath
            });
            if (pathname in appPaths) appPaths[pathname].push(page);
            else appPaths[pathname] = [
                page
            ];
        }
        const matchers = [];
        for (const filename1 of routeFilenames){
            // Grab the cached values (and the appPaths).
            const cached = cache.get(filename1);
            if (!cached) {
                throw new Error("Invariant: expected filename to exist in cache");
            }
            const { pathname , page , bundlePath  } = cached;
            matchers.push(new _appPageRouteMatcher.AppPageRouteMatcher({
                kind: _routeKind.RouteKind.APP_PAGE,
                pathname,
                page,
                bundlePath,
                filename: filename1,
                appPaths: appPaths[pathname]
            }));
        }
        return matchers;
    }
}
exports.DevAppPageRouteMatcherProvider = DevAppPageRouteMatcherProvider;

//# sourceMappingURL=dev-app-page-route-matcher-provider.js.map