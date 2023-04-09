import path from "../../../shared/lib/isomorphic/path";
import { isAPIRoute } from "../../../lib/is-api-route";
import { PAGES_MANIFEST, SERVER_DIRECTORY } from "../../../shared/lib/constants";
import { normalizePagePath } from "../../../shared/lib/page-path/normalize-page-path";
import { RouteKind } from "../route-kind";
import { PagesAPILocaleRouteMatcher, PagesAPIRouteMatcher } from "../route-matchers/pages-api-route-matcher";
import { ManifestRouteMatcherProvider } from "./manifest-route-matcher-provider";
export class PagesAPIRouteMatcherProvider extends ManifestRouteMatcherProvider {
    constructor(distDir, manifestLoader, localeNormalizer){
        super(PAGES_MANIFEST, manifestLoader);
        this.distDir = distDir;
        this.localeNormalizer = localeNormalizer;
    }
    async transform(manifest) {
        // This matcher is only for Pages API routes.
        const pathnames = Object.keys(manifest).filter((pathname)=>isAPIRoute(pathname));
        const matchers = [];
        for (const page of pathnames){
            if (this.localeNormalizer) {
                // Match the locale on the page name, or default to the default locale.
                const { detectedLocale , pathname  } = this.localeNormalizer.match(page);
                matchers.push(new PagesAPILocaleRouteMatcher({
                    kind: RouteKind.PAGES_API,
                    pathname,
                    page,
                    bundlePath: path.join("pages", normalizePagePath(page)),
                    filename: path.join(this.distDir, SERVER_DIRECTORY, manifest[page]),
                    i18n: {
                        locale: detectedLocale
                    }
                }));
            } else {
                matchers.push(new PagesAPIRouteMatcher({
                    kind: RouteKind.PAGES_API,
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

//# sourceMappingURL=pages-api-route-matcher-provider.js.map