import { isAppPageRoute } from "../../../lib/is-app-page-route";
import { APP_PATHS_MANIFEST, SERVER_DIRECTORY } from "../../../shared/lib/constants";
import path from "../../../shared/lib/isomorphic/path";
import { normalizeAppPath } from "../../../shared/lib/router/utils/app-paths";
import { RouteKind } from "../route-kind";
import { AppPageRouteMatcher } from "../route-matchers/app-page-route-matcher";
import { ManifestRouteMatcherProvider } from "./manifest-route-matcher-provider";
export class AppPageRouteMatcherProvider extends ManifestRouteMatcherProvider {
    constructor(distDir, manifestLoader){
        super(APP_PATHS_MANIFEST, manifestLoader);
        this.distDir = distDir;
    }
    async transform(manifest) {
        // This matcher only matches app pages.
        const pages = Object.keys(manifest).filter((page)=>isAppPageRoute(page));
        // Collect all the app paths for each page. This could include any parallel
        // routes.
        const appPaths = {};
        for (const page1 of pages){
            const pathname = normalizeAppPath(page1);
            if (pathname in appPaths) appPaths[pathname].push(page1);
            else appPaths[pathname] = [
                page1
            ];
        }
        // Format the routes.
        const matchers = [];
        for (const [pathname, paths] of Object.entries(appPaths)){
            // TODO-APP: (wyattjoh) this is a hack right now, should be more deterministic
            const page = paths[0];
            const filename = path.join(this.distDir, SERVER_DIRECTORY, manifest[page]);
            const bundlePath = path.join("app", page);
            matchers.push(new AppPageRouteMatcher({
                kind: RouteKind.APP_PAGE,
                pathname,
                page,
                bundlePath,
                filename,
                appPaths: paths
            }));
        }
        return matchers;
    }
}

//# sourceMappingURL=app-page-route-matcher-provider.js.map