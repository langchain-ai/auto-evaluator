"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _path = _interopRequireDefault(require("../../../shared/lib/isomorphic/path"));
var _isApiRoute = require("../../../lib/is-api-route");
var _constants = require("../../../shared/lib/constants");
var _normalizePagePath = require("../../../shared/lib/page-path/normalize-page-path");
var _routeKind = require("../route-kind");
var _pagesRouteMatcher = require("../route-matchers/pages-route-matcher");
var _manifestRouteMatcherProvider = require("./manifest-route-matcher-provider");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class PagesRouteMatcherProvider extends _manifestRouteMatcherProvider.ManifestRouteMatcherProvider {
    constructor(distDir, manifestLoader, localeNormalizer){
        super(_constants.PAGES_MANIFEST, manifestLoader);
        this.distDir = distDir;
        this.localeNormalizer = localeNormalizer;
    }
    async transform(manifest) {
        // This matcher is only for Pages routes, not Pages API routes which are
        // included in this manifest.
        const pathnames = Object.keys(manifest).filter((pathname)=>!(0, _isApiRoute).isAPIRoute(pathname))// Remove any blocked pages (page that can't be routed to, like error or
        // internal pages).
        .filter((pathname)=>{
            var ref;
            const normalized = ((ref = this.localeNormalizer) == null ? void 0 : ref.normalize(pathname)) ?? pathname;
            // Skip any blocked pages.
            if (_constants.BLOCKED_PAGES.includes(normalized)) return false;
            return true;
        });
        const matchers = [];
        for (const page of pathnames){
            if (this.localeNormalizer) {
                // Match the locale on the page name, or default to the default locale.
                const { detectedLocale , pathname  } = this.localeNormalizer.match(page);
                matchers.push(new _pagesRouteMatcher.PagesLocaleRouteMatcher({
                    kind: _routeKind.RouteKind.PAGES,
                    pathname,
                    page,
                    bundlePath: _path.default.join("pages", (0, _normalizePagePath).normalizePagePath(page)),
                    filename: _path.default.join(this.distDir, _constants.SERVER_DIRECTORY, manifest[page]),
                    i18n: {
                        locale: detectedLocale
                    }
                }));
            } else {
                matchers.push(new _pagesRouteMatcher.PagesRouteMatcher({
                    kind: _routeKind.RouteKind.PAGES,
                    pathname: page,
                    page,
                    bundlePath: _path.default.join("pages", (0, _normalizePagePath).normalizePagePath(page)),
                    filename: _path.default.join(this.distDir, _constants.SERVER_DIRECTORY, manifest[page])
                }));
            }
        }
        return matchers;
    }
}
exports.PagesRouteMatcherProvider = PagesRouteMatcherProvider;

//# sourceMappingURL=pages-route-matcher-provider.js.map