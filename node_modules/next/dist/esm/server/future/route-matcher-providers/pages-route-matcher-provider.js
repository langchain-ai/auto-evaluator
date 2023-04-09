import path from "../../../shared/lib/isomorphic/path";
import { isAPIRoute } from "../../../lib/is-api-route";
import { BLOCKED_PAGES, PAGES_MANIFEST, SERVER_DIRECTORY } from "../../../shared/lib/constants";
import { normalizePagePath } from "../../../shared/lib/page-path/normalize-page-path";
import { RouteKind } from "../route-kind";
import { PagesLocaleRouteMatcher, PagesRouteMatcher } from "../route-matchers/pages-route-matcher";
import { ManifestRouteMatcherProvider } from "./manifest-route-matcher-provider";
export class PagesRouteMatcherProvider extends ManifestRouteMatcherProvider {
    constructor(distDir, manifestLoader, localeNormalizer){
        super(PAGES_MANIFEST, manifestLoader);
        this.distDir = distDir;
        this.localeNormalizer = localeNormalizer;
    }
    async transform(manifest) {
        // This matcher is only for Pages routes, not Pages API routes which are
        // included in this manifest.
        const pathnames = Object.keys(manifest).filter((pathname)=>!isAPIRoute(pathname))// Remove any blocked pages (page that can't be routed to, like error or
        // internal pages).
        .filter((pathname)=>{
            var ref;
            const normalized = ((ref = this.localeNormalizer) == null ? void 0 : ref.normalize(pathname)) ?? pathname;
            // Skip any blocked pages.
            if (BLOCKED_PAGES.includes(normalized)) return false;
            return true;
        });
        const matchers = [];
        for (const page of pathnames){
            if (this.localeNormalizer) {
                // Match the locale on the page name, or default to the default locale.
                const { detectedLocale , pathname  } = this.localeNormalizer.match(page);
                matchers.push(new PagesLocaleRouteMatcher({
                    kind: RouteKind.PAGES,
                    pathname,
                    page,
                    bundlePath: path.join("pages", normalizePagePath(page)),
                    filename: path.join(this.distDir, SERVER_DIRECTORY, manifest[page]),
                    i18n: {
                        locale: detectedLocale
                    }
                }));
            } else {
                matchers.push(new PagesRouteMatcher({
                    kind: RouteKind.PAGES,
                    pathname: page,
                    page,
                    bundlePath: path.join("pages", normalizePagePath(page)),
                    filename: path.join(this.distDir, SERVER_DIRECTORY, manifest[page])
                }));
            }
        }
        return matchers;
    }
}

//# sourceMappingURL=pages-route-matcher-provider.js.map