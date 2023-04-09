import path from "../../../shared/lib/isomorphic/path";
import { isAppRouteRoute, isMetadataRoute } from "../../../lib/is-app-route-route";
import { APP_PATHS_MANIFEST, SERVER_DIRECTORY } from "../../../shared/lib/constants";
import { normalizeAppPath } from "../../../shared/lib/router/utils/app-paths";
import { RouteKind } from "../route-kind";
import { AppRouteRouteMatcher } from "../route-matchers/app-route-route-matcher";
import { ManifestRouteMatcherProvider } from "./manifest-route-matcher-provider";
export class AppRouteRouteMatcherProvider extends ManifestRouteMatcherProvider {
    constructor(distDir, manifestLoader){
        super(APP_PATHS_MANIFEST, manifestLoader);
        this.distDir = distDir;
    }
    async transform(manifest) {
        // This matcher only matches app routes.
        const pages = Object.keys(manifest).filter((page)=>isAppRouteRoute(page) || isMetadataRoute(page));
        // Format the routes.
        const matchers = [];
        for (const page1 of pages){
            const pathname = normalizeAppPath(page1);
            const filename = path.join(this.distDir, SERVER_DIRECTORY, manifest[page1]);
            const bundlePath = path.join("app", page1);
            matchers.push(new AppRouteRouteMatcher({
                kind: RouteKind.APP_ROUTE,
                pathname,
                page: page1,
                bundlePath,
                filename
            }));
        }
        return matchers;
    }
}

//# sourceMappingURL=app-route-route-matcher-provider.js.map