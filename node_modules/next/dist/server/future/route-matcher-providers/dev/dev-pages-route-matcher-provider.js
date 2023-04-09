"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _pagesRouteMatcher = require("../../route-matchers/pages-route-matcher");
var _absoluteFilenameNormalizer = require("../../normalizers/absolute-filename-normalizer");
var _normalizers = require("../../normalizers/normalizers");
var _wrapNormalizerFn = require("../../normalizers/wrap-normalizer-fn");
var _normalizePagePath = require("../../../../shared/lib/page-path/normalize-page-path");
var _prefixingNormalizer = require("../../normalizers/prefixing-normalizer");
var _routeKind = require("../../route-kind");
var _path = _interopRequireDefault(require("path"));
var _fileCacheRouteMatcherProvider = require("./file-cache-route-matcher-provider");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class DevPagesRouteMatcherProvider extends _fileCacheRouteMatcherProvider.FileCacheRouteMatcherProvider {
    constructor(pagesDir, extensions, reader, localeNormalizer){
        super(pagesDir, reader);
        this.pagesDir = pagesDir;
        this.extensions = extensions;
        this.localeNormalizer = localeNormalizer;
        // Match any route file that ends with `/${filename}.${extension}` under the
        // pages directory.
        this.expression = new RegExp(`\\.(?:${extensions.join("|")})$`);
        const pageNormalizer = new _absoluteFilenameNormalizer.AbsoluteFilenameNormalizer(pagesDir, extensions);
        this.normalizers = {
            page: pageNormalizer,
            pathname: pageNormalizer,
            bundlePath: new _normalizers.Normalizers([
                pageNormalizer,
                // If the bundle path would have ended in a `/`, add a `index` to it.
                (0, _wrapNormalizerFn).wrapNormalizerFn(_normalizePagePath.normalizePagePath),
                // Prefix the bundle path with `pages/`.
                new _prefixingNormalizer.PrefixingNormalizer("pages"), 
            ])
        };
    }
    test(filename) {
        // If the file does not end in the correct extension it's not a match.
        if (!this.expression.test(filename)) return false;
        // Pages routes must exist in the pages directory without the `/api/`
        // prefix. The pathnames being tested here though are the full filenames,
        // so we need to include the pages directory.
        // TODO: could path separator normalization be needed here?
        if (filename.startsWith(_path.default.join(this.pagesDir, "/api/"))) return false;
        for (const extension of this.extensions){
            // We can also match if we have `pages/api.${extension}`, so check to
            // see if it's a match.
            if (filename === _path.default.join(this.pagesDir, `api.${extension}`)) {
                return false;
            }
        }
        return true;
    }
    async transform(files) {
        const matchers = [];
        for (const filename of files){
            // If the file isn't a match for this matcher, then skip it.
            if (!this.test(filename)) continue;
            const pathname = this.normalizers.pathname.normalize(filename);
            const page = this.normalizers.page.normalize(filename);
            const bundlePath = this.normalizers.bundlePath.normalize(filename);
            if (this.localeNormalizer) {
                matchers.push(new _pagesRouteMatcher.PagesLocaleRouteMatcher({
                    kind: _routeKind.RouteKind.PAGES,
                    pathname,
                    page,
                    bundlePath,
                    filename,
                    i18n: {}
                }));
            } else {
                matchers.push(new _pagesRouteMatcher.PagesRouteMatcher({
                    kind: _routeKind.RouteKind.PAGES,
                    pathname,
                    page,
                    bundlePath,
                    filename
                }));
            }
        }
        return matchers;
    }
}
exports.DevPagesRouteMatcherProvider = DevPagesRouteMatcherProvider;

//# sourceMappingURL=dev-pages-route-matcher-provider.js.map