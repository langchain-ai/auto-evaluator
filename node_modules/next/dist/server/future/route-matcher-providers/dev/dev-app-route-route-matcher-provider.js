"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _appRouteRouteMatcher = require("../../route-matchers/app-route-route-matcher");
var _normalizers = require("../../normalizers/normalizers");
var _absoluteFilenameNormalizer = require("../../normalizers/absolute-filename-normalizer");
var _wrapNormalizerFn = require("../../normalizers/wrap-normalizer-fn");
var _appPaths = require("../../../../shared/lib/router/utils/app-paths");
var _prefixingNormalizer = require("../../normalizers/prefixing-normalizer");
var _routeKind = require("../../route-kind");
var _fileCacheRouteMatcherProvider = require("./file-cache-route-matcher-provider");
class DevAppRouteRouteMatcherProvider extends _fileCacheRouteMatcherProvider.FileCacheRouteMatcherProvider {
    constructor(appDir, extensions, reader){
        super(appDir, reader);
        // Match any route file that ends with `/route.${extension}` under the app directory.
        // Match top level robots file that ends with `/robots.${extension}` under the app directory.
        this.expression = new RegExp(`[/\\\\]route\\.(?:${extensions.join("|")})$|[/\\\\]robots\\.(?:${extensions.concat("txt").join("|")})?$|[/\\\\]sitemap\\.(?:${extensions.concat("xml").join("|")})?$`);
        const pageNormalizer = new _absoluteFilenameNormalizer.AbsoluteFilenameNormalizer(appDir, extensions);
        this.normalizers = {
            page: pageNormalizer,
            pathname: new _normalizers.Normalizers([
                pageNormalizer,
                // The pathname to match should have the trailing `/route` and other route
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
        const matchers = [];
        for (const filename of files){
            // If the file isn't a match for this matcher, then skip it.
            if (!this.expression.test(filename)) continue;
            const page = this.normalizers.page.normalize(filename);
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