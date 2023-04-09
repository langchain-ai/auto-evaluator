import { join } from "path";
import { parse as parseStackTrace } from "next/dist/compiled/stacktrace-parser";
import { RouteKind } from "../future/route-kind";
import { DefaultRouteMatcherManager } from "../future/route-matcher-managers/default-route-matcher-manager";
import { getMiddlewareMatchers } from "../../build/analysis/get-page-static-info";
import { getMiddlewareRouteMatcher } from "../../shared/lib/router/utils/middleware-route-matcher";
import { CLIENT_STATIC_FILES_PATH, DEV_CLIENT_PAGES_MANIFEST } from "../../shared/lib/constants";
class DevRouteMatcherManager extends DefaultRouteMatcherManager {
    constructor(hasPage){
        super();
        this.hasPage = hasPage;
    }
    async match(pathname) {
        if (await this.hasPage(pathname)) {
            return {
                definition: {
                    kind: RouteKind.PAGES,
                    page: "",
                    pathname,
                    filename: "",
                    bundlePath: ""
                },
                params: {}
            };
        }
        return null;
    }
    async test(pathname) {
        return await this.match(pathname) !== null;
    }
}
export async function makeResolver(dir, nextConfig, middleware) {
    var ref1;
    const url = require("url");
    const { default: Router  } = require("../router");
    const { getPathMatch  } = require("../../shared/lib/router/utils/path-match");
    const { default: DevServer  } = require("../dev/next-dev-server");
    const { NodeNextRequest , NodeNextResponse  } = require("../base-http/node");
    const { default: loadCustomRoutes  } = require("../../lib/load-custom-routes");
    const routeResults = new WeakMap();
    class TurbopackDevServerProxy extends DevServer {
        // make sure static files are served by turbopack
        serveStatic() {
            return Promise.resolve();
        }
        // make turbopack handle errors
        async renderError(err, req) {
            if (err != null) {
                routeResults.set(req, {
                    type: "error",
                    error: {
                        name: err.name,
                        message: err.message,
                        stack: parseStackTrace(err.stack)
                    }
                });
            }
            return Promise.resolve();
        }
        // make turbopack handle 404s
        render404() {
            return Promise.resolve();
        }
    }
    const devServer = new TurbopackDevServerProxy({
        dir,
        conf: nextConfig,
        hostname: "localhost",
        port: 3000
    });
    await devServer.matchers.reload();
    // @ts-expect-error private
    devServer.setDevReady();
    // @ts-expect-error protected
    devServer.customRoutes = await loadCustomRoutes(nextConfig);
    if ((ref1 = middleware.files) == null ? void 0 : ref1.length) {
        const matchers = middleware.matcher ? getMiddlewareMatchers(middleware.matcher, nextConfig) : [
            {
                regexp: ".*",
                originalSource: "/:path*"
            }
        ];
        // @ts-expect-error
        devServer.middleware = {
            page: "/",
            match: getMiddlewareRouteMatcher(matchers),
            matchers
        };
        const getEdgeFunctionInfo = (original)=>{
            return (params)=>{
                if (params.middleware) {
                    return {
                        name: "middleware",
                        paths: middleware.files.map((file)=>join(process.cwd(), file)),
                        env: Object.keys(process.env),
                        wasm: [],
                        assets: []
                    };
                }
                return original(params);
            };
        };
        // @ts-expect-error protected
        devServer.getEdgeFunctionInfo = getEdgeFunctionInfo(// @ts-expect-error protected
        devServer.getEdgeFunctionInfo.bind(devServer));
        // @ts-expect-error protected
        devServer.hasMiddleware = ()=>true;
    }
    const routes = devServer.generateRoutes(true);
    // @ts-expect-error protected
    const catchAllMiddleware = devServer.generateCatchAllMiddlewareRoute(true);
    routes.matchers = new DevRouteMatcherManager(// @ts-expect-error internal method
    devServer.hasPage.bind(devServer));
    // @ts-expect-error protected
    const buildId = devServer.buildId;
    const pagesManifestRoute = routes.fsRoutes.find((r)=>r.name === `_next/${CLIENT_STATIC_FILES_PATH}/${buildId}/${DEV_CLIENT_PAGES_MANIFEST}`);
    if (pagesManifestRoute) {
        // make sure turbopack serves this
        pagesManifestRoute.fn = ()=>{
            return {
                finished: true
            };
        };
    }
    const router = new Router({
        ...routes,
        catchAllMiddleware,
        catchAllRoute: {
            match: getPathMatch("/:path*"),
            name: "catchall route",
            fn: async (req, res, _params, parsedUrl)=>{
                // clean up internal query values
                for (const key of Object.keys(parsedUrl.query || {})){
                    if (key.startsWith("_next")) {
                        delete parsedUrl.query[key];
                    }
                }
                routeResults.set(req, {
                    type: "rewrite",
                    url: url.format({
                        pathname: parsedUrl.pathname,
                        query: parsedUrl.query,
                        hash: parsedUrl.hash
                    }),
                    statusCode: 200,
                    headers: res.getHeaders()
                });
                return {
                    finished: true
                };
            }
        }
    });
    // @ts-expect-error internal field
    router.compiledRoutes = router.compiledRoutes.filter((route)=>{
        var ref;
        return route.type === "rewrite" || route.type === "redirect" || route.type === "header" || route.name === "catchall route" || route.name === "middleware catchall" || ((ref = route.name) == null ? void 0 : ref.includes("check"));
    });
    return async function resolveRoute(_req, _res) {
        const req = new NodeNextRequest(_req);
        const res = new NodeNextResponse(_res);
        const parsedUrl = url.parse(req.url, true);
        // @ts-expect-error protected
        devServer.attachRequestMeta(req, parsedUrl);
        req._initUrl = req.url;
        await router.execute(req, res, parsedUrl);
        if (!res.originalResponse.headersSent) {
            res.setHeader("x-nextjs-route-result", "1");
            const routeResult = routeResults.get(req) ?? {
                type: "none"
            };
            res.body(JSON.stringify(routeResult)).send();
        }
        routeResults.delete(req);
    };
}

//# sourceMappingURL=route-resolver.js.map