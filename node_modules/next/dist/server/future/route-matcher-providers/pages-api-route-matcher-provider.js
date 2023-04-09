"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _path = _interopRequireDefault(require("../../../shared/lib/isomorphic/path"));
var _isApiRoute = require("../../../lib/is-api-route");
var _constants = require("../../../shared/lib/constants");
var _normalizePagePath = require("../../../shared/lib/page-path/normalize-page-path");
var _routeKind = require("../route-kind");
var _pagesApiRouteMatcher = require("../route-matchers/pages-api-route-matcher");
var _manifestRouteMatcherProvider = require("./manifest-route-matcher-provider");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class PagesAPIRouteMatcherProvider extends _manifestRouteMatcherProvider.ManifestRouteMatcherProvider {
    constructor(distDir, manifestLoader, localeNormalizer){
        super(_constants.PAGES_MANIFEST, manifestLoader);
        this.distDir = distDir;
        this.localeNormalizer = localeNormalizer;
    }
    async transform(manifest) {
        // This matcher is only for Pages API routes.
        const pathnames = Object.keys(manifest).filter((pathname)=>(0, _isApiRoute).isAPIRoute(pathname));
        const matchers = [];
        for (const page of pathnames){
            if (this.localeNormalizer) {
                // Match the locale on the page name, or default to the default locale.
                const { detectedLocale , pathname  } = this.localeNormalizer.match(page);
                matchers.push(new _pagesApiRouteMatcher.PagesAPILocaleRouteMatcher({
                    kind: _routeKind.RouteKind.PAGES_API,
                    pathname,
                    page,
                    bundlePath: _path.default.join("pages", (0, _normalizePagePath).normalizePagePath(page)),
                    filename: _path.default.join(this.distDir, _constants.SERVER_DIRECTORY, manifest[page]),
                    i18n: {
                        locale: detectedLocale
                    }
                }));
            } else {
                matchers.push(new _pagesApiRouteMatcher.PagesAPIRouteMatcher({
                    kind: _routeKind.RouteKind.PAGES_API,
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
exports.PagesAPIRouteMatcherProvider = PagesAPIRouteMatcherProvider;

//# sourceMappingURL=pages-api-route-matcher-provider.js.map