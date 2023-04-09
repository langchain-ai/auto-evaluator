"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _appPageRouteMatcher = require("../../route-matchers/app-page-route-matcher");
var _absoluteFilenameNormalizer = require("../../normalizers/absolute-filename-normalizer");
var _normalizers = require("../../normalizers/normalizers");
var _wrapNormalizerFn = require("../../normalizers/wrap-normalizer-fn");
var _appPaths = require("../../../../shared/lib/router/utils/app-paths");
var _prefixingNormalizer = require("../../normalizers/prefixing-normalizer");
var _routeKind = require("../../route-kind");
var _fileCacheRouteMatcherProvider = require("./file-cache-route-matcher-provider");
class DevAppPageRouteMatcherProvider extends _fileCacheRouteMatcherProvider.FileCacheRouteMatcherProvider {
    constructor(appDir, extensions, reader){
        super(appDir, reader);
        // Match any page file that ends with `/page.${extension}` under the app
        // directory.
        this.expression = new RegExp(`[/\\\\]page\\.(?:${extensions.join("|")})$`);
        const pageNormalizer = new _absoluteFilenameNormalizer.AbsoluteFilenameNormalizer(appDir, extensions);
        this.normalizers = {
            page: pageNormalizer,
            pathname: new _normalizers.Normalizers([
                pageNormalizer,
                // The pathname to match should have the trailing `/page` and other route
                // group information stripped from it.
                (0, _wrapNormalizerFn).wrapNormalizerFn(_appPaths.normalizeAppPath), 
            ]),
            bundlePath: new _normalizers.Normalizers([
                pageNormalizer,
                // Prefix the bundle path with `app/`.
                new _prefixingNormalizer.PrefixingNormalizer("app"), 
            ])
        };
    }
    async transform(files) {
        // Collect all the app paths for each page. This could include any parallel
        // routes.
        const cache = new Map();
        const appPaths = {};
        for (const filename of files){
            const page = this.normalizers.page.normalize(filename);
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
        for (const filename1 of files){
            // If the file isn't a match for this matcher, then skip it.
            if (!this.expression.test(filename1)) continue;
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