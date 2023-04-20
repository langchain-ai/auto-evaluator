"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _isApiRoute = require("../../../lib/is-api-route");
var _constants = require("../../../shared/lib/constants");
var _routeKind = require("../route-kind");
var _pagesApiRouteMatcher = require("../route-matchers/pages-api-route-matcher");
var _manifestRouteMatcherProvider = require("./manifest-route-matcher-provider");
var _pages = require("../normalizers/built/pages");
class PagesAPIRouteMatcherProvider extends _manifestRouteMatcherProvider.ManifestRouteMatcherProvider {
    constructor(distDir, manifestLoader, i18nProvider){
        super(_constants.PAGES_MANIFEST, manifestLoader);
        this.i18nProvider = i18nProvider;
        this.normalizers = new _pages.PagesNormalizers(distDir);
    }
    async transform(manifest) {
        // This matcher is only for Pages API routes.
        const pathnames = Object.keys(manifest).filter((pathname)=>(0, _isApiRoute).isAPIRoute(pathname));
        const matchers = [];
        for (const page of pathnames){
            if (this.i18nProvider) {
                // Match the locale on the page name, or default to the default locale.
                const { detectedLocale , pathname  } = this.i18nProvider.analyze(page);
                matchers.push(new _pagesApiRouteMatcher.PagesAPILocaleRouteMatcher({
                    kind: _routeKind.RouteKind.PAGES_API,
                    pathname,
                    page,
                    bundlePath: this.normalizers.bundlePath.normalize(page),
                    filename: this.normalizers.filename.normalize(manifest[page]),
                    i18n: {
                        locale: detectedLocale
                    }
                }));
            } else {
                matchers.push(new _pagesApiRouteMatcher.PagesAPIRouteMatcher({
                    kind: _routeKind.RouteKind.PAGES_API,
                    pathname: page,
                    page,
                    bundlePath: this.normalizers.bundlePath.normalize(page),
                    filename: this.normalizers.filename.normalize(manifest[page])
                }));
            }
        }
        return matchers;
    }
}
exports.PagesAPIRouteMatcherProvider = PagesAPIRouteMatcherProvider;

//# sourceMappingURL=pages-api-route-matcher-provider.js.map