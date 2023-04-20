"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _isApiRoute = require("../../../lib/is-api-route");
var _constants = require("../../../shared/lib/constants");
var _routeKind = require("../route-kind");
var _pagesRouteMatcher = require("../route-matchers/pages-route-matcher");
var _manifestRouteMatcherProvider = require("./manifest-route-matcher-provider");
var _pages = require("../normalizers/built/pages");
class PagesRouteMatcherProvider extends _manifestRouteMatcherProvider.ManifestRouteMatcherProvider {
    constructor(distDir, manifestLoader, i18nProvider){
        super(_constants.PAGES_MANIFEST, manifestLoader);
        this.i18nProvider = i18nProvider;
        this.normalizers = new _pages.PagesNormalizers(distDir);
    }
    async transform(manifest) {
        // This matcher is only for Pages routes, not Pages API routes which are
        // included in this manifest.
        const pathnames = Object.keys(manifest).filter((pathname)=>!(0, _isApiRoute).isAPIRoute(pathname))// Remove any blocked pages (page that can't be routed to, like error or
        // internal pages).
        .filter((pathname)=>{
            var ref;
            const normalized = ((ref = this.i18nProvider) == null ? void 0 : ref.analyze(pathname).pathname) ?? pathname;
            // Skip any blocked pages.
            if (_constants.BLOCKED_PAGES.includes(normalized)) return false;
            return true;
        });
        const matchers = [];
        for (const page of pathnames){
            if (this.i18nProvider) {
                // Match the locale on the page name, or default to the default locale.
                const { detectedLocale , pathname  } = this.i18nProvider.analyze(page);
                matchers.push(new _pagesRouteMatcher.PagesLocaleRouteMatcher({
                    kind: _routeKind.RouteKind.PAGES,
                    pathname,
                    page,
                    bundlePath: this.normalizers.bundlePath.normalize(page),
                    filename: this.normalizers.filename.normalize(manifest[page]),
                    i18n: {
                        locale: detectedLocale
                    }
                }));
            } else {
                matchers.push(new _pagesRouteMatcher.PagesRouteMatcher({
                    kind: _routeKind.RouteKind.PAGES,
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
exports.PagesRouteMatcherProvider = PagesRouteMatcherProvider;

//# sourceMappingURL=pages-route-matcher-provider.js.map