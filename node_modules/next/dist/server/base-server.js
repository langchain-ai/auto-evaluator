"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _utils = require("../shared/lib/utils");
var _url = require("url");
var _redirectStatus = require("../lib/redirect-status");
var _isEdgeRuntime = require("../lib/is-edge-runtime");
var _constants = require("../shared/lib/constants");
var _utils1 = require("../shared/lib/router/utils");
var _apiUtils = require("./api-utils");
var _runtimeConfig = require("../shared/lib/runtime-config");
var _router = _interopRequireDefault(require("./router"));
var _revalidateHeaders = require("./send-payload/revalidate-headers");
var _utils2 = require("./utils");
var _isBot = require("../shared/lib/router/utils/is-bot");
var _renderResult = _interopRequireDefault(require("./render-result"));
var _removeTrailingSlash = require("../shared/lib/router/utils/remove-trailing-slash");
var _denormalizePagePath = require("../shared/lib/page-path/denormalize-page-path");
var _normalizeLocalePath = require("../shared/lib/i18n/normalize-locale-path");
var Log = _interopRequireWildcard(require("../build/output/log"));
var _detectDomainLocale = require("../shared/lib/i18n/detect-domain-locale");
var _escapePathDelimiters = _interopRequireDefault(require("../shared/lib/router/utils/escape-path-delimiters"));
var _utils3 = require("../build/webpack/loaders/next-serverless-loader/utils");
var _isError = _interopRequireWildcard(require("../lib/is-error"));
var _requestMeta = require("./request-meta");
var _removePathPrefix = require("../shared/lib/router/utils/remove-path-prefix");
var _appPaths = require("../shared/lib/router/utils/app-paths");
var _getHostname = require("../shared/lib/get-hostname");
var _parseUrl = require("../shared/lib/router/utils/parse-url");
var _getNextPathnameInfo = require("../shared/lib/router/utils/get-next-pathname-info");
var _appRouterHeaders = require("../client/components/app-router-headers");
var _routeHandlerManager = require("./future/route-handler-managers/route-handler-manager");
var _localeRouteNormalizer = require("./future/normalizers/locale-route-normalizer");
var _defaultRouteMatcherManager = require("./future/route-matcher-managers/default-route-matcher-manager");
var _appPageRouteMatcherProvider = require("./future/route-matcher-providers/app-page-route-matcher-provider");
var _appRouteRouteMatcherProvider = require("./future/route-matcher-providers/app-route-route-matcher-provider");
var _pagesApiRouteMatcherProvider = require("./future/route-matcher-providers/pages-api-route-matcher-provider");
var _pagesRouteMatcherProvider = require("./future/route-matcher-providers/pages-route-matcher-provider");
var _serverManifestLoader = require("./future/route-matcher-providers/helpers/manifest-loaders/server-manifest-loader");
var _tracer = require("./lib/trace/tracer");
var _constants1 = require("./lib/trace/constants");
var _appRouteRouteHandler = require("./future/route-handlers/app-route-route-handler");
class Server {
    constructor(options){
        var ref, ref1, ref2;
        const { dir ="." , quiet =false , conf , dev =false , minimalMode =false , customServer =true , hostname , port ,  } = options;
        this.serverOptions = options;
        this.dir = process.env.NEXT_RUNTIME === "edge" ? dir : require("path").resolve(dir);
        this.quiet = quiet;
        this.loadEnvConfig({
            dev
        });
        // TODO: should conf be normalized to prevent missing
        // values from causing issues as this can be user provided
        this.nextConfig = conf;
        this.hostname = hostname;
        this.port = port;
        this.distDir = process.env.NEXT_RUNTIME === "edge" ? this.nextConfig.distDir : require("path").join(this.dir, this.nextConfig.distDir);
        this.publicDir = this.getPublicDir();
        this.hasStaticDir = !minimalMode && this.getHasStaticDir();
        // Configure the locale normalizer, it's used for routes inside `pages/`.
        this.localeNormalizer = ((ref = this.nextConfig.i18n) == null ? void 0 : ref.locales) && this.nextConfig.i18n.defaultLocale ? new _localeRouteNormalizer.LocaleRouteNormalizer(this.nextConfig.i18n.locales, this.nextConfig.i18n.defaultLocale) : undefined;
        // Only serverRuntimeConfig needs the default
        // publicRuntimeConfig gets it's default in client/index.js
        const { serverRuntimeConfig ={} , publicRuntimeConfig , assetPrefix , generateEtags ,  } = this.nextConfig;
        this.buildId = this.getBuildId();
        this.minimalMode = minimalMode || !!process.env.NEXT_PRIVATE_MINIMAL_MODE;
        this.hasAppDir = !!this.nextConfig.experimental.appDir && this.getHasAppDir(dev);
        const serverComponents = this.hasAppDir;
        this.serverComponentManifest = serverComponents ? this.getServerComponentManifest() : undefined;
        this.serverCSSManifest = serverComponents ? this.getServerCSSManifest() : undefined;
        this.nextFontManifest = this.getNextFontManifest();
        this.renderOpts = {
            poweredByHeader: this.nextConfig.poweredByHeader,
            canonicalBase: this.nextConfig.amp.canonicalBase || "",
            buildId: this.buildId,
            generateEtags,
            previewProps: this.getPreviewProps(),
            customServer: customServer === true ? true : undefined,
            ampOptimizerConfig: (ref1 = this.nextConfig.experimental.amp) == null ? void 0 : ref1.optimizer,
            basePath: this.nextConfig.basePath,
            images: this.nextConfig.images,
            optimizeFonts: this.nextConfig.optimizeFonts,
            fontManifest: this.nextConfig.optimizeFonts && !dev ? this.getFontManifest() : undefined,
            optimizeCss: this.nextConfig.experimental.optimizeCss,
            nextConfigOutput: this.nextConfig.output,
            nextScriptWorkers: this.nextConfig.experimental.nextScriptWorkers,
            disableOptimizedLoading: this.nextConfig.experimental.disableOptimizedLoading,
            domainLocales: (ref2 = this.nextConfig.i18n) == null ? void 0 : ref2.domains,
            distDir: this.distDir,
            serverComponents,
            crossOrigin: this.nextConfig.crossOrigin ? this.nextConfig.crossOrigin : undefined,
            largePageDataBytes: this.nextConfig.experimental.largePageDataBytes,
            // Only the `publicRuntimeConfig` key is exposed to the client side
            // It'll be rendered as part of __NEXT_DATA__ on the client side
            runtimeConfig: Object.keys(publicRuntimeConfig).length > 0 ? publicRuntimeConfig : undefined
        };
        // Initialize next/config with the environment configuration
        (0, _runtimeConfig).setConfig({
            serverRuntimeConfig,
            publicRuntimeConfig
        });
        this.pagesManifest = this.getPagesManifest();
        this.appPathsManifest = this.getAppPathsManifest();
        // Configure the routes.
        const { matchers , handlers  } = this.getRoutes();
        this.matchers = matchers;
        this.handlers = handlers;
        // Start route compilation. We don't wait for the routes to finish loading
        // because we use the `waitTillReady` promise below in `handleRequest` to
        // wait. Also we can't `await` in the constructor.
        matchers.reload();
        this.customRoutes = this.getCustomRoutes();
        this.router = new _router.default(this.generateRoutes());
        this.setAssetPrefix(assetPrefix);
        this.responseCache = this.getResponseCache({
            dev
        });
    }
    getRoutes() {
        // Create a new manifest loader that get's the manifests from the server.
        const manifestLoader = new _serverManifestLoader.ServerManifestLoader((name)=>{
            switch(name){
                case _constants.PAGES_MANIFEST:
                    return this.getPagesManifest() ?? null;
                case _constants.APP_PATHS_MANIFEST:
                    return this.getAppPathsManifest() ?? null;
                default:
                    return null;
            }
        });
        // Configure the matchers and handlers.
        const matchers = new _defaultRouteMatcherManager.DefaultRouteMatcherManager();
        const handlers = new _routeHandlerManager.RouteHandlerManager();
        // Match pages under `pages/`.
        matchers.push(new _pagesRouteMatcherProvider.PagesRouteMatcherProvider(this.distDir, manifestLoader, this.localeNormalizer));
        // Match api routes under `pages/api/`.
        matchers.push(new _pagesApiRouteMatcherProvider.PagesAPIRouteMatcherProvider(this.distDir, manifestLoader, this.localeNormalizer));
        // If the app directory is enabled, then add the app matchers and handlers.
        if (this.hasAppDir) {
            // Match app pages under `app/`.
            matchers.push(new _appPageRouteMatcherProvider.AppPageRouteMatcherProvider(this.distDir, manifestLoader));
            matchers.push(new _appRouteRouteMatcherProvider.AppRouteRouteMatcherProvider(this.distDir, manifestLoader));
        }
        return {
            matchers,
            handlers
        };
    }
    logError(err) {
        if (this.quiet) return;
        console.error(err);
    }
    async handleRequest(req, res, parsedUrl) {
        return (0, _tracer).getTracer().trace(_constants1.BaseServerSpan.handleRequest, async ()=>await this.handleRequestImpl(req, res, parsedUrl));
    }
    async handleRequestImpl(req, res, parsedUrl) {
        try {
            var ref, ref3;
            // Wait for the matchers to be ready.
            await this.matchers.waitTillReady();
            // ensure cookies set in middleware are merged and
            // not overridden by API routes/getServerSideProps
            const _res = res.originalResponse || res;
            const origSetHeader = _res.setHeader.bind(_res);
            _res.setHeader = (name, val)=>{
                if (name.toLowerCase() === "set-cookie") {
                    const middlewareValue = (0, _requestMeta).getRequestMeta(req, "_nextMiddlewareCookie");
                    if (!middlewareValue || !Array.isArray(val) || !val.every((item, idx)=>item === middlewareValue[idx])) {
                        val = [
                            ...middlewareValue || [],
                            ...typeof val === "string" ? [
                                val
                            ] : Array.isArray(val) ? val : [], 
                        ];
                    }
                }
                return origSetHeader(name, val);
            };
            const urlParts = (req.url || "").split("?");
            const urlNoQuery = urlParts[0];
            // this normalizes repeated slashes in the path e.g. hello//world ->
            // hello/world or backslashes to forward slashes, this does not
            // handle trailing slash as that is handled the same as a next.config.js
            // redirect
            if (urlNoQuery == null ? void 0 : urlNoQuery.match(/(\\|\/\/)/)) {
                const cleanUrl = (0, _utils).normalizeRepeatedSlashes(req.url);
                res.redirect(cleanUrl, 308).body(cleanUrl).send();
                return;
            }
            (0, _apiUtils).setLazyProp({
                req: req
            }, "cookies", (0, _apiUtils).getCookieParser(req.headers));
            // Parse url if parsedUrl not provided
            if (!parsedUrl || typeof parsedUrl !== "object") {
                parsedUrl = (0, _url).parse(req.url, true);
            }
            // Parse the querystring ourselves if the user doesn't handle querystring parsing
            if (typeof parsedUrl.query === "string") {
                parsedUrl.query = Object.fromEntries(new URLSearchParams(parsedUrl.query));
            }
            // in minimal mode we detect RSC revalidate if the .rsc
            // path is requested
            if (this.minimalMode && req.url.endsWith(".rsc")) {
                parsedUrl.query.__nextDataReq = "1";
            }
            req.url = (0, _appPaths).normalizeRscPath(req.url, this.hasAppDir);
            parsedUrl.pathname = (0, _appPaths).normalizeRscPath(parsedUrl.pathname || "", this.hasAppDir);
            this.attachRequestMeta(req, parsedUrl);
            const domainLocale = (0, _detectDomainLocale).detectDomainLocale((ref = this.nextConfig.i18n) == null ? void 0 : ref.domains, (0, _getHostname).getHostname(parsedUrl, req.headers));
            const defaultLocale = (domainLocale == null ? void 0 : domainLocale.defaultLocale) || ((ref3 = this.nextConfig.i18n) == null ? void 0 : ref3.defaultLocale);
            const url = (0, _parseUrl).parseUrl(req.url.replace(/^\/+/, "/"));
            const pathnameInfo = (0, _getNextPathnameInfo).getNextPathnameInfo(url.pathname, {
                nextConfig: this.nextConfig
            });
            url.pathname = pathnameInfo.pathname;
            if (pathnameInfo.basePath) {
                req.url = (0, _removePathPrefix).removePathPrefix(req.url, this.nextConfig.basePath);
                (0, _requestMeta).addRequestMeta(req, "_nextHadBasePath", true);
            }
            if (this.minimalMode && typeof req.headers["x-matched-path"] === "string") {
                try {
                    var ref4, ref5, ref6;
                    if (this.hasAppDir) {
                        // ensure /index path is normalized for prerender
                        // in minimal mode
                        if (req.url.match(/^\/index($|\?)/)) {
                            req.url = req.url.replace(/^\/index/, "/");
                        }
                        parsedUrl.pathname = parsedUrl.pathname === "/index" ? "/" : parsedUrl.pathname;
                    }
                    // x-matched-path is the source of truth, it tells what page
                    // should be rendered because we don't process rewrites in minimalMode
                    let matchedPath = (0, _appPaths).normalizeRscPath(new URL(req.headers["x-matched-path"], "http://localhost").pathname, this.hasAppDir);
                    let urlPathname = new URL(req.url, "http://localhost").pathname;
                    // For ISR  the URL is normalized to the prerenderPath so if
                    // it's a data request the URL path will be the data URL,
                    // basePath is already stripped by this point
                    if (urlPathname.startsWith(`/_next/data/`)) {
                        parsedUrl.query.__nextDataReq = "1";
                    }
                    const normalizedUrlPath = this.stripNextDataPath(urlPathname);
                    matchedPath = this.stripNextDataPath(matchedPath, false);
                    // Perform locale detection and normalization.
                    const options = {
                        i18n: (ref4 = this.localeNormalizer) == null ? void 0 : ref4.match(matchedPath)
                    };
                    if ((ref5 = options.i18n) == null ? void 0 : ref5.detectedLocale) {
                        parsedUrl.query.__nextLocale = options.i18n.detectedLocale;
                    }
                    // TODO: check if this is needed any more?
                    matchedPath = (0, _denormalizePagePath).denormalizePagePath(matchedPath);
                    let srcPathname = matchedPath;
                    const match = await this.matchers.match(matchedPath, options);
                    if (match) {
                        srcPathname = match.definition.pathname;
                    }
                    const pageIsDynamic = typeof (match == null ? void 0 : match.params) !== "undefined";
                    // The rest of this function can't handle i18n properly, so ensure we
                    // restore the pathname with the locale information stripped from it
                    // now that we're done matching.
                    matchedPath = ((ref6 = options.i18n) == null ? void 0 : ref6.pathname) ?? matchedPath;
                    const utils = (0, _utils3).getUtils({
                        pageIsDynamic,
                        page: srcPathname,
                        i18n: this.nextConfig.i18n,
                        basePath: this.nextConfig.basePath,
                        rewrites: this.customRoutes.rewrites
                    });
                    // ensure parsedUrl.pathname includes URL before processing
                    // rewrites or they won't match correctly
                    if (defaultLocale && !pathnameInfo.locale) {
                        parsedUrl.pathname = `/${defaultLocale}${parsedUrl.pathname}`;
                    }
                    const pathnameBeforeRewrite = parsedUrl.pathname;
                    const rewriteParams = utils.handleRewrites(req, parsedUrl);
                    const rewriteParamKeys = Object.keys(rewriteParams);
                    const didRewrite = pathnameBeforeRewrite !== parsedUrl.pathname;
                    if (didRewrite) {
                        (0, _requestMeta).addRequestMeta(req, "_nextRewroteUrl", parsedUrl.pathname);
                        (0, _requestMeta).addRequestMeta(req, "_nextDidRewrite", true);
                    }
                    // interpolate dynamic params and normalize URL if needed
                    if (pageIsDynamic) {
                        let params = {};
                        let paramsResult = utils.normalizeDynamicRouteParams(parsedUrl.query);
                        // for prerendered ISR paths we attempt parsing the route
                        // params from the URL directly as route-matches may not
                        // contain the correct values due to the filesystem path
                        // matching before the dynamic route has been matched
                        if (!paramsResult.hasValidParams && pageIsDynamic && !(0, _utils1).isDynamicRoute(normalizedUrlPath)) {
                            let matcherParams = utils.dynamicRouteMatcher == null ? void 0 : utils.dynamicRouteMatcher(normalizedUrlPath);
                            if (matcherParams) {
                                utils.normalizeDynamicRouteParams(matcherParams);
                                Object.assign(paramsResult.params, matcherParams);
                                paramsResult.hasValidParams = true;
                            }
                        }
                        if (paramsResult.hasValidParams) {
                            params = paramsResult.params;
                        }
                        if (req.headers["x-now-route-matches"] && (0, _utils1).isDynamicRoute(matchedPath) && !paramsResult.hasValidParams) {
                            const opts = {};
                            const routeParams = utils.getParamsFromRouteMatches(req, opts, parsedUrl.query.__nextLocale || "");
                            if (opts.locale) {
                                parsedUrl.query.__nextLocale = opts.locale;
                            }
                            paramsResult = utils.normalizeDynamicRouteParams(routeParams, true);
                            if (paramsResult.hasValidParams) {
                                params = paramsResult.params;
                            }
                        }
                        // handle the actual dynamic route name being requested
                        if (pageIsDynamic && utils.defaultRouteMatches && normalizedUrlPath === srcPathname && !paramsResult.hasValidParams && !utils.normalizeDynamicRouteParams({
                            ...params
                        }, true).hasValidParams) {
                            params = utils.defaultRouteMatches;
                        }
                        if (params) {
                            matchedPath = utils.interpolateDynamicPath(srcPathname, params);
                            req.url = utils.interpolateDynamicPath(req.url, params);
                        }
                        Object.assign(parsedUrl.query, params);
                    }
                    if (pageIsDynamic || didRewrite) {
                        var ref7;
                        utils.normalizeVercelUrl(req, true, [
                            ...rewriteParamKeys,
                            ...Object.keys(((ref7 = utils.defaultRouteRegex) == null ? void 0 : ref7.groups) || {}), 
                        ]);
                    }
                    parsedUrl.pathname = `${this.nextConfig.basePath || ""}${matchedPath === "/" && this.nextConfig.basePath ? "" : matchedPath}`;
                    url.pathname = parsedUrl.pathname;
                } catch (err) {
                    if (err instanceof _utils.DecodeError || err instanceof _utils.NormalizeError) {
                        res.statusCode = 400;
                        return this.renderError(null, req, res, "/_error", {});
                    }
                    throw err;
                }
            }
            (0, _requestMeta).addRequestMeta(req, "__nextHadTrailingSlash", pathnameInfo.trailingSlash);
            (0, _requestMeta).addRequestMeta(req, "__nextIsLocaleDomain", Boolean(domainLocale));
            parsedUrl.query.__nextDefaultLocale = defaultLocale;
            if (pathnameInfo.locale) {
                req.url = (0, _url).format(url);
                (0, _requestMeta).addRequestMeta(req, "__nextStrippedLocale", true);
            }
            if (!this.minimalMode || !parsedUrl.query.__nextLocale) {
                if (pathnameInfo.locale || defaultLocale) {
                    parsedUrl.query.__nextLocale = pathnameInfo.locale || defaultLocale;
                }
            }
            if (// Edge runtime always has minimal mode enabled.
            process.env.NEXT_RUNTIME !== "edge" && !this.minimalMode && defaultLocale) {
                const { getLocaleRedirect  } = require("../shared/lib/i18n/get-locale-redirect");
                const redirect = getLocaleRedirect({
                    defaultLocale,
                    domainLocale,
                    headers: req.headers,
                    nextConfig: this.nextConfig,
                    pathLocale: pathnameInfo.locale,
                    urlParsed: {
                        ...url,
                        pathname: pathnameInfo.locale ? `/${pathnameInfo.locale}${url.pathname}` : url.pathname
                    }
                });
                if (redirect) {
                    return res.redirect(redirect, _constants.TEMPORARY_REDIRECT_STATUS).body(redirect).send();
                }
            }
            res.statusCode = 200;
            return await this.run(req, res, parsedUrl);
        } catch (err) {
            if (err && typeof err === "object" && err.code === "ERR_INVALID_URL" || err instanceof _utils.DecodeError || err instanceof _utils.NormalizeError) {
                res.statusCode = 400;
                return this.renderError(null, req, res, "/_error", {});
            }
            if (this.minimalMode || this.renderOpts.dev) {
                throw err;
            }
            this.logError((0, _isError).getProperError(err));
            res.statusCode = 500;
            res.body("Internal Server Error").send();
        }
    }
    getRequestHandler() {
        return this.handleRequest.bind(this);
    }
    async handleUpgrade(_req, _socket, _head) {}
    setAssetPrefix(prefix) {
        this.renderOpts.assetPrefix = prefix ? prefix.replace(/\/$/, "") : "";
    }
    // Backwards compatibility
    async prepare() {}
    // Backwards compatibility
    async close() {}
    getPreviewProps() {
        return this.getPrerenderManifest().preview;
    }
    async _beforeCatchAllRender(_req, _res, _params, _parsedUrl) {
        return false;
    }
    getAppPathRoutes() {
        const appPathRoutes = {};
        Object.keys(this.appPathsManifest || {}).forEach((entry)=>{
            const normalizedPath = (0, _appPaths).normalizeAppPath(entry);
            if (!appPathRoutes[normalizedPath]) {
                appPathRoutes[normalizedPath] = [];
            }
            appPathRoutes[normalizedPath].push(entry);
        });
        return appPathRoutes;
    }
    async run(req, res, parsedUrl) {
        return (0, _tracer).getTracer().trace(_constants1.BaseServerSpan.run, async ()=>this.runImpl(req, res, parsedUrl));
    }
    async runImpl(req, res, parsedUrl) {
        this.handleCompression(req, res);
        // set incremental cache to request meta so it can
        // be passed down for edge functions and the fetch disk
        // cache can be leveraged locally
        if (!globalThis.__incrementalCache && !(0, _requestMeta).getRequestMeta(req, "_nextIncrementalCache")) {
            const incrementalCache = this.getIncrementalCache({
                requestHeaders: Object.assign({}, req.headers)
            });
            (0, _requestMeta).addRequestMeta(req, "_nextIncrementalCache", incrementalCache);
        }
        try {
            const matched = await this.router.execute(req, res, parsedUrl);
            if (matched) {
                return;
            }
        } catch (err) {
            if (err instanceof _utils.DecodeError || err instanceof _utils.NormalizeError) {
                res.statusCode = 400;
                return this.renderError(null, req, res, "/_error", {});
            }
            throw err;
        }
        await this.render404(req, res, parsedUrl);
    }
    async pipe(fn, partialContext) {
        return (0, _tracer).getTracer().trace(_constants1.BaseServerSpan.pipe, async ()=>this.pipeImpl(fn, partialContext));
    }
    async pipeImpl(fn, partialContext) {
        const isBotRequest = (0, _isBot).isBot(partialContext.req.headers["user-agent"] || "");
        const ctx = {
            ...partialContext,
            renderOpts: {
                ...this.renderOpts,
                supportsDynamicHTML: !isBotRequest,
                isBot: !!isBotRequest
            }
        };
        const payload = await fn(ctx);
        if (payload === null) {
            return;
        }
        const { req , res  } = ctx;
        const { body , type , revalidateOptions  } = payload;
        if (!res.sent) {
            const { generateEtags , poweredByHeader , dev  } = this.renderOpts;
            if (dev) {
                // In dev, we should not cache pages for any reason.
                res.setHeader("Cache-Control", "no-store, must-revalidate");
            }
            return this.sendRenderResult(req, res, {
                result: body,
                type,
                generateEtags,
                poweredByHeader,
                options: revalidateOptions
            });
        }
    }
    async getStaticHTML(fn, partialContext) {
        const payload = await fn({
            ...partialContext,
            renderOpts: {
                ...this.renderOpts,
                supportsDynamicHTML: false
            }
        });
        if (payload === null) {
            return null;
        }
        return payload.body.toUnchunkedString();
    }
    async render(req, res, pathname, query = {}, parsedUrl, internalRender = false) {
        return (0, _tracer).getTracer().trace(_constants1.BaseServerSpan.render, async ()=>this.renderImpl(req, res, pathname, query, parsedUrl, internalRender));
    }
    async renderImpl(req, res, pathname, query = {}, parsedUrl, internalRender = false) {
        var ref;
        if (!pathname.startsWith("/")) {
            console.warn(`Cannot render page with path "${pathname}", did you mean "/${pathname}"?. See more info here: https://nextjs.org/docs/messages/render-no-starting-slash`);
        }
        if (this.renderOpts.customServer && pathname === "/index" && !await this.hasPage("/index")) {
            // maintain backwards compatibility for custom server
            // (see custom-server integration tests)
            pathname = "/";
        }
        // we allow custom servers to call render for all URLs
        // so check if we need to serve a static _next file or not.
        // we don't modify the URL for _next/data request but still
        // call render so we special case this to prevent an infinite loop
        if (!internalRender && !this.minimalMode && !query.__nextDataReq && (((ref = req.url) == null ? void 0 : ref.match(/^\/_next\//)) || this.hasStaticDir && req.url.match(/^\/static\//))) {
            return this.handleRequest(req, res, parsedUrl);
        }
        // Custom server users can run `app.render()` which needs compression.
        if (this.renderOpts.customServer) {
            this.handleCompression(req, res);
        }
        if ((0, _utils2).isBlockedPage(pathname)) {
            return this.render404(req, res, parsedUrl);
        }
        return this.pipe((ctx)=>this.renderToResponse(ctx), {
            req,
            res,
            pathname,
            query
        });
    }
    async getStaticPaths({ pathname  }) {
        var ref;
        // `staticPaths` is intentionally set to `undefined` as it should've
        // been caught when checking disk data.
        const staticPaths = undefined;
        // Read whether or not fallback should exist from the manifest.
        const fallbackField = (ref = this.getPrerenderManifest().dynamicRoutes[pathname]) == null ? void 0 : ref.fallback;
        return {
            staticPaths,
            fallbackMode: typeof fallbackField === "string" ? "static" : fallbackField === null ? "blocking" : fallbackField
        };
    }
    async renderToResponseWithComponents(requestContext, findComponentsResult) {
        return (0, _tracer).getTracer().trace(_constants1.BaseServerSpan.renderToResponseWithComponents, async ()=>this.renderToResponseWithComponentsImpl(requestContext, findComponentsResult));
    }
    async renderToResponseWithComponentsImpl({ req , res , pathname , renderOpts: opts  }, { components , query  }) {
        var ref, ref8, ref9, ref10;
        const is404Page = pathname === "/404";
        const is500Page = pathname === "/500";
        const isAppPath = components.isAppPath;
        const hasServerProps = !!components.getServerSideProps;
        let hasStaticPaths = !!components.getStaticPaths;
        const hasGetInitialProps = !!((ref = components.Component) == null ? void 0 : ref.getInitialProps);
        let isSSG = !!components.getStaticProps;
        // Compute the iSSG cache key. We use the rewroteUrl since
        // pages with fallback: false are allowed to be rewritten to
        // and we need to look up the path by the rewritten path
        let urlPathname = (0, _url).parse(req.url || "").pathname || "/";
        let resolvedUrlPathname = (0, _requestMeta).getRequestMeta(req, "_nextRewroteUrl") || urlPathname;
        let staticPaths;
        let fallbackMode;
        if (isAppPath) {
            const pathsResult = await this.getStaticPaths({
                pathname,
                originalAppPath: components.pathname,
                requestHeaders: req.headers
            });
            staticPaths = pathsResult.staticPaths;
            fallbackMode = pathsResult.fallbackMode;
            const hasFallback = typeof fallbackMode !== "undefined";
            if (hasFallback) {
                hasStaticPaths = true;
            }
            if (hasFallback || (staticPaths == null ? void 0 : staticPaths.includes(resolvedUrlPathname))) {
                isSSG = true;
            } else if (!this.renderOpts.dev) {
                const manifest = this.getPrerenderManifest();
                isSSG = isSSG || !!manifest.routes[pathname === "/index" ? "/" : pathname];
            }
        }
        // Toggle whether or not this is a Data request
        let isDataReq = !!(query.__nextDataReq || req.headers["x-nextjs-data"] && this.serverOptions.webServerConfig) && (isSSG || hasServerProps);
        // when we are handling a middleware prefetch and it doesn't
        // resolve to a static data route we bail early to avoid
        // unexpected SSR invocations
        if (!isSSG && req.headers["x-middleware-prefetch"] && !(is404Page || pathname === "/_error")) {
            res.setHeader("x-middleware-skip", "1");
            res.body("{}").send();
            return null;
        }
        if (isAppPath) {
            res.setHeader("vary", _appRouterHeaders.RSC_VARY_HEADER);
            if (isSSG && req.headers[_appRouterHeaders.RSC.toLowerCase()]) {
                if (!this.minimalMode) {
                    isDataReq = true;
                }
                // strip header so we generate HTML still
                if (!(0, _isEdgeRuntime).isEdgeRuntime(opts.runtime) || this.serverOptions.webServerConfig) {
                    for (const param of _appRouterHeaders.FLIGHT_PARAMETERS){
                        delete req.headers[param.toString().toLowerCase()];
                    }
                }
            }
        }
        delete query.__nextDataReq;
        // normalize req.url for SSG paths as it is not exposed
        // to getStaticProps and the asPath should not expose /_next/data
        if (isSSG && this.minimalMode && req.headers["x-matched-path"] && req.url.startsWith("/_next/data")) {
            req.url = this.stripNextDataPath(req.url);
        }
        if (!!req.headers["x-nextjs-data"] && (!res.statusCode || res.statusCode === 200)) {
            res.setHeader("x-nextjs-matched-path", `${query.__nextLocale ? `/${query.__nextLocale}` : ""}${pathname}`);
        }
        // Don't delete headers[RSC] yet, it still needs to be used in renderToHTML later
        const isFlightRequest = Boolean(this.serverComponentManifest && req.headers[_appRouterHeaders.RSC.toLowerCase()]);
        // For pages we need to ensure the correct Vary header is set too, to avoid
        // caching issues when navigating between pages and app
        if (!isAppPath && isFlightRequest) {
            res.setHeader("vary", _appRouterHeaders.RSC_VARY_HEADER);
        }
        // we need to ensure the status code if /404 is visited directly
        if (is404Page && !isDataReq && !isFlightRequest) {
            res.statusCode = 404;
        }
        // ensure correct status is set when visiting a status page
        // directly e.g. /500
        if (_constants.STATIC_STATUS_PAGES.includes(pathname)) {
            res.statusCode = parseInt(pathname.slice(1), 10);
        }
        // static pages can only respond to GET/HEAD
        // requests so ensure we respond with 405 for
        // invalid requests
        if (!is404Page && !is500Page && pathname !== "/_error" && req.method !== "HEAD" && req.method !== "GET" && (typeof components.Component === "string" || isSSG)) {
            res.statusCode = 405;
            res.setHeader("Allow", [
                "GET",
                "HEAD"
            ]);
            await this.renderError(null, req, res, pathname);
            return null;
        }
        // handle static page
        if (typeof components.Component === "string") {
            return {
                type: "html",
                // TODO: Static pages should be serialized as RenderResult
                body: _renderResult.default.fromStatic(components.Component)
            };
        }
        if (!query.amp) {
            delete query.amp;
        }
        if (opts.supportsDynamicHTML === true) {
            var ref11;
            const isBotRequest = (0, _isBot).isBot(req.headers["user-agent"] || "");
            const isSupportedDocument = typeof ((ref11 = components.Document) == null ? void 0 : ref11.getInitialProps) !== "function" || // The built-in `Document` component also supports dynamic HTML for concurrent mode.
            _constants.NEXT_BUILTIN_DOCUMENT in components.Document;
            // Disable dynamic HTML in cases that we know it won't be generated,
            // so that we can continue generating a cache key when possible.
            // TODO-APP: should the first render for a dynamic app path
            // be static so we can collect revalidate and populate the
            // cache if there are no dynamic data requirements
            opts.supportsDynamicHTML = !isSSG && !isBotRequest && !query.amp && isSupportedDocument;
            opts.isBot = isBotRequest;
        }
        const defaultLocale = isSSG ? (ref8 = this.nextConfig.i18n) == null ? void 0 : ref8.defaultLocale : query.__nextDefaultLocale;
        const locale = query.__nextLocale;
        const locales = (ref9 = this.nextConfig.i18n) == null ? void 0 : ref9.locales;
        let previewData;
        let isPreviewMode = false;
        if (hasServerProps || isSSG) {
            // For the edge runtime, we don't support preview mode in SSG.
            if (process.env.NEXT_RUNTIME !== "edge") {
                const { tryGetPreviewData  } = require("./api-utils/node");
                previewData = tryGetPreviewData(req, res, this.renderOpts.previewProps);
                isPreviewMode = previewData !== false;
            }
        }
        let isManualRevalidate = false;
        let revalidateOnlyGenerated = false;
        if (isSSG) {
            ({ isManualRevalidate , revalidateOnlyGenerated  } = (0, _apiUtils).checkIsManualRevalidate(req, this.renderOpts.previewProps));
        }
        if (isSSG && this.minimalMode && req.headers["x-matched-path"]) {
            // the url value is already correct when the matched-path header is set
            resolvedUrlPathname = urlPathname;
        }
        urlPathname = (0, _removeTrailingSlash).removeTrailingSlash(urlPathname);
        resolvedUrlPathname = (0, _normalizeLocalePath).normalizeLocalePath((0, _removeTrailingSlash).removeTrailingSlash(resolvedUrlPathname), (ref10 = this.nextConfig.i18n) == null ? void 0 : ref10.locales).pathname;
        const handleRedirect = (pageData)=>{
            const redirect = {
                destination: pageData.pageProps.__N_REDIRECT,
                statusCode: pageData.pageProps.__N_REDIRECT_STATUS,
                basePath: pageData.pageProps.__N_REDIRECT_BASE_PATH
            };
            const statusCode = (0, _redirectStatus).getRedirectStatus(redirect);
            const { basePath  } = this.nextConfig;
            if (basePath && redirect.basePath !== false && redirect.destination.startsWith("/")) {
                redirect.destination = `${basePath}${redirect.destination}`;
            }
            if (redirect.destination.startsWith("/")) {
                redirect.destination = (0, _utils).normalizeRepeatedSlashes(redirect.destination);
            }
            res.redirect(redirect.destination, statusCode).body(redirect.destination).send();
        };
        // remove /_next/data prefix from urlPathname so it matches
        // for direct page visit and /_next/data visit
        if (isDataReq) {
            resolvedUrlPathname = this.stripNextDataPath(resolvedUrlPathname);
            urlPathname = this.stripNextDataPath(urlPathname);
        }
        let ssgCacheKey = isPreviewMode || !isSSG || opts.supportsDynamicHTML ? null // Preview mode, manual revalidate, flight request can bypass the cache
         : `${locale ? `/${locale}` : ""}${(pathname === "/" || resolvedUrlPathname === "/") && locale ? "" : resolvedUrlPathname}${query.amp ? ".amp" : ""}`;
        if ((is404Page || is500Page) && isSSG) {
            ssgCacheKey = `${locale ? `/${locale}` : ""}${pathname}${query.amp ? ".amp" : ""}`;
        }
        if (ssgCacheKey) {
            // we only encode path delimiters for path segments from
            // getStaticPaths so we need to attempt decoding the URL
            // to match against and only escape the path delimiters
            // this allows non-ascii values to be handled e.g. Japanese characters
            // TODO: investigate adding this handling for non-SSG pages so
            // non-ascii names work there also
            ssgCacheKey = ssgCacheKey.split("/").map((seg)=>{
                try {
                    seg = (0, _escapePathDelimiters).default(decodeURIComponent(seg), true);
                } catch (_) {
                    // An improperly encoded URL was provided
                    throw new _utils.DecodeError("failed to decode param");
                }
                return seg;
            }).join("/");
            // ensure /index and / is normalized to one key
            ssgCacheKey = ssgCacheKey === "/index" && pathname === "/" ? "/" : ssgCacheKey;
        }
        // use existing incrementalCache instance if available
        const incrementalCache = globalThis.__incrementalCache || this.getIncrementalCache({
            requestHeaders: Object.assign({}, req.headers)
        });
        let isRevalidate = false;
        const doRender = async ()=>{
            const supportsDynamicHTML = !(isSSG || hasStaticPaths);
            const match = pathname !== "/_error" && !is404Page && !is500Page ? (0, _requestMeta).getRequestMeta(req, "_nextMatch") : undefined;
            if (match) {
                const context = {
                    supportsDynamicHTML,
                    incrementalCache
                };
                let response = await this.handlers.handle(match, req, res, context, isSSG);
                if (response) {
                    if (isSSG && process.env.NEXT_RUNTIME !== "edge") {
                        const blob = await response.blob();
                        const headers = Object.fromEntries(response.headers);
                        if (!headers["content-type"] && blob.type) {
                            headers["content-type"] = blob.type;
                        }
                        const cacheEntry = {
                            value: {
                                kind: "ROUTE",
                                status: response.status,
                                body: Buffer.from(await blob.arrayBuffer()),
                                headers
                            },
                            revalidate: context.store.revalidate || false
                        };
                        return cacheEntry;
                    }
                    // dynamic response so send here
                    await (0, _appRouteRouteHandler).sendResponse(req, res, response);
                    return null;
                }
            }
            let pageData;
            let body;
            let isrRevalidate;
            let isNotFound;
            let isRedirect;
            const origQuery = (0, _url).parse(req.url || "", true).query;
            // clear any dynamic route params so they aren't in
            // the resolvedUrl
            if (opts.params) {
                Object.keys(opts.params).forEach((key)=>{
                    delete origQuery[key];
                });
            }
            const hadTrailingSlash = urlPathname !== "/" && this.nextConfig.trailingSlash;
            const resolvedUrl = (0, _url).format({
                pathname: `${resolvedUrlPathname}${hadTrailingSlash ? "/" : ""}`,
                // make sure to only add query values from original URL
                query: origQuery
            });
            const renderOpts = {
                ...components,
                ...opts,
                ...isAppPath && this.nextConfig.experimental.appDir ? {
                    incrementalCache,
                    isRevalidate: this.minimalMode || isRevalidate
                } : {},
                isDataReq,
                resolvedUrl,
                locale,
                locales,
                defaultLocale,
                // For getServerSideProps and getInitialProps we need to ensure we use the original URL
                // and not the resolved URL to prevent a hydration mismatch on
                // asPath
                resolvedAsPath: hasServerProps || hasGetInitialProps ? (0, _url).format({
                    // we use the original URL pathname less the _next/data prefix if
                    // present
                    pathname: `${urlPathname}${hadTrailingSlash ? "/" : ""}`,
                    query: origQuery
                }) : resolvedUrl,
                supportsDynamicHTML
            };
            const renderResult = await this.renderHTML(req, res, pathname, query, renderOpts);
            body = renderResult;
            // TODO: change this to a different passing mechanism
            pageData = renderOpts.pageData;
            isrRevalidate = renderOpts.revalidate;
            isNotFound = renderOpts.isNotFound;
            isRedirect = renderOpts.isRedirect;
            // we don't throw static to dynamic errors in dev as isSSG
            // is a best guess in dev since we don't have the prerender pass
            // to know whether the path is actually static or not
            if (isAppPath && isSSG && isrRevalidate === 0 && !this.renderOpts.dev) {
                const staticBailoutInfo = renderOpts.staticBailoutInfo || {};
                const err = new Error(`Page changed from static to dynamic at runtime ${urlPathname}${staticBailoutInfo.description ? `, reason: ${staticBailoutInfo.description}` : ``}` + `\nsee more here https://nextjs.org/docs/messages/app-static-to-dynamic-error`);
                if (staticBailoutInfo.stack) {
                    const stack = staticBailoutInfo.stack;
                    err.stack = err.message + stack.substring(stack.indexOf("\n"));
                }
                throw err;
            }
            let value;
            if (isNotFound) {
                value = null;
            } else if (isRedirect) {
                value = {
                    kind: "REDIRECT",
                    props: pageData
                };
            } else {
                if (!body) {
                    return null;
                }
                value = {
                    kind: "PAGE",
                    html: body,
                    pageData
                };
            }
            return {
                revalidate: isrRevalidate,
                value
            };
        };
        const cacheEntry1 = await this.responseCache.get(ssgCacheKey, async (hasResolved, hadCache)=>{
            const isProduction = !this.renderOpts.dev;
            const isDynamicPathname = (0, _utils1).isDynamicRoute(pathname);
            const didRespond = hasResolved || res.sent;
            if (hadCache) {
                isRevalidate = true;
            }
            if (!staticPaths) {
                ({ staticPaths , fallbackMode  } = hasStaticPaths ? await this.getStaticPaths({
                    pathname,
                    requestHeaders: req.headers
                }) : {
                    staticPaths: undefined,
                    fallbackMode: false
                });
            }
            if (fallbackMode === "static" && (0, _isBot).isBot(req.headers["user-agent"] || "")) {
                fallbackMode = "blocking";
            }
            // skip manual revalidate if cache is not present and
            // revalidate-if-generated is set
            if (isManualRevalidate && revalidateOnlyGenerated && !hadCache && !this.minimalMode) {
                await this.render404(req, res);
                return null;
            }
            // only allow manual revalidate for fallback: true/blocking
            // or for prerendered fallback: false paths
            if (isManualRevalidate && (fallbackMode !== false || hadCache)) {
                fallbackMode = "blocking";
            }
            // When we did not respond from cache, we need to choose to block on
            // rendering or return a skeleton.
            //
            // * Data requests always block.
            //
            // * Blocking mode fallback always blocks.
            //
            // * Preview mode toggles all pages to be resolved in a blocking manner.
            //
            // * Non-dynamic pages should block (though this is an impossible
            //   case in production).
            //
            // * Dynamic pages should return their skeleton if not defined in
            //   getStaticPaths, then finish the data request on the client-side.
            //
            if (process.env.NEXT_RUNTIME !== "edge" && this.minimalMode !== true && fallbackMode !== "blocking" && ssgCacheKey && !didRespond && !isPreviewMode && isDynamicPathname && // Development should trigger fallback when the path is not in
            // `getStaticPaths`
            (isProduction || !staticPaths || !staticPaths.includes(// we use ssgCacheKey here as it is normalized to match the
            // encoding from getStaticPaths along with including the locale
            query.amp ? ssgCacheKey.replace(/\.amp$/, "") : ssgCacheKey))) {
                if (// In development, fall through to render to handle missing
                // getStaticPaths.
                (isProduction || staticPaths) && // When fallback isn't present, abort this render so we 404
                fallbackMode !== "static") {
                    throw new NoFallbackError();
                }
                if (!isDataReq) {
                    // Production already emitted the fallback as static HTML.
                    if (isProduction) {
                        const html = await this.getFallback(locale ? `/${locale}${pathname}` : pathname);
                        return {
                            value: {
                                kind: "PAGE",
                                html: _renderResult.default.fromStatic(html),
                                pageData: {}
                            }
                        };
                    } else {
                        query.__nextFallback = "true";
                        const result = await doRender();
                        if (!result) {
                            return null;
                        }
                        // Prevent caching this result
                        delete result.revalidate;
                        return result;
                    }
                }
            }
            const result = await doRender();
            if (!result) {
                return null;
            }
            return {
                ...result,
                revalidate: result.revalidate !== undefined ? result.revalidate : /* default to minimum revalidate (this should be an invariant) */ 1
            };
        }, {
            incrementalCache,
            isManualRevalidate,
            isPrefetch: req.headers.purpose === "prefetch"
        });
        if (!cacheEntry1) {
            if (ssgCacheKey && !(isManualRevalidate && revalidateOnlyGenerated)) {
                // A cache entry might not be generated if a response is written
                // in `getInitialProps` or `getServerSideProps`, but those shouldn't
                // have a cache key. If we do have a cache key but we don't end up
                // with a cache entry, then either Next.js or the application has a
                // bug that needs fixing.
                throw new Error("invariant: cache entry required but not generated");
            }
            return null;
        }
        if (isSSG && !this.minimalMode) {
            // set x-nextjs-cache header to match the header
            // we set for the image-optimizer
            res.setHeader("x-nextjs-cache", isManualRevalidate ? "REVALIDATED" : cacheEntry1.isMiss ? "MISS" : cacheEntry1.isStale ? "STALE" : "HIT");
        }
        const { revalidate , value: cachedData  } = cacheEntry1;
        const revalidateOptions = typeof revalidate !== "undefined" && (!this.renderOpts.dev || hasServerProps && !isDataReq) ? {
            // When the page is 404 cache-control should not be added unless
            // we are rendering the 404 page for notFound: true which should
            // cache according to revalidate correctly
            private: isPreviewMode || is404Page && cachedData,
            stateful: !isSSG,
            revalidate
        } : undefined;
        if (!cachedData) {
            if (revalidateOptions) {
                (0, _revalidateHeaders).setRevalidateHeaders(res, revalidateOptions);
            }
            if (isDataReq) {
                res.statusCode = 404;
                res.body('{"notFound":true}').send();
                return null;
            } else {
                if (this.renderOpts.dev) {
                    query.__nextNotFoundSrcPage = pathname;
                }
                await this.render404(req, res, {
                    pathname,
                    query
                }, false);
                return null;
            }
        } else if (cachedData.kind === "REDIRECT") {
            if (revalidateOptions) {
                (0, _revalidateHeaders).setRevalidateHeaders(res, revalidateOptions);
            }
            if (isDataReq) {
                return {
                    type: "json",
                    body: _renderResult.default.fromStatic(// @TODO: Handle flight data.
                    JSON.stringify(cachedData.props)),
                    revalidateOptions
                };
            } else {
                await handleRedirect(cachedData.props);
                return null;
            }
        } else if (cachedData.kind === "IMAGE") {
            throw new Error("invariant SSG should not return an image cache value");
        } else if (cachedData.kind === "ROUTE") {
            await (0, _appRouteRouteHandler).sendResponse(req, res, new Response(cachedData.body, {
                headers: new Headers(cachedData.headers || {}),
                status: cachedData.status || 200
            }));
            return null;
        } else {
            if (isAppPath) {
                if (isDataReq && typeof cachedData.pageData !== "string") {
                    throw new Error("invariant: Expected pageData to be a string for app data request but received " + typeof cachedData.pageData + ". This is a bug in Next.js.");
                }
                return {
                    type: isDataReq ? "rsc" : "html",
                    body: isDataReq ? _renderResult.default.fromStatic(cachedData.pageData) : cachedData.html
                };
            }
            return {
                type: isDataReq ? "json" : "html",
                body: isDataReq ? _renderResult.default.fromStatic(JSON.stringify(cachedData.pageData)) : cachedData.html,
                revalidateOptions
            };
        }
    }
    stripNextDataPath(path, stripLocale = true) {
        if (path.includes(this.buildId)) {
            const splitPath = path.substring(path.indexOf(this.buildId) + this.buildId.length);
            path = (0, _denormalizePagePath).denormalizePagePath(splitPath.replace(/\.json$/, ""));
        }
        if (this.nextConfig.i18n && stripLocale) {
            const { locales  } = this.nextConfig.i18n;
            return (0, _normalizeLocalePath).normalizeLocalePath(path, locales).pathname;
        }
        return path;
    }
    // map the route to the actual bundle name
    getOriginalAppPaths(route) {
        if (this.hasAppDir) {
            var ref;
            const originalAppPath = (ref = this.appPathRoutes) == null ? void 0 : ref[route];
            if (!originalAppPath) {
                return null;
            }
            return originalAppPath;
        }
        return null;
    }
    async renderPageComponent(ctx, bubbleNoFallback) {
        var ref;
        const { query , pathname  } = ctx;
        const appPaths = this.getOriginalAppPaths(pathname);
        const isAppPath = Array.isArray(appPaths);
        let page = pathname;
        if (isAppPath) {
            // When it's an array, we need to pass all parallel routes to the loader.
            page = appPaths[0];
        }
        const result = await this.findPageComponents({
            pathname: page,
            query,
            params: ctx.renderOpts.params || {},
            isAppPath,
            sriEnabled: !!((ref = this.nextConfig.experimental.sri) == null ? void 0 : ref.algorithm),
            appPaths,
            // Ensuring for loading page component routes is done via the matcher.
            shouldEnsure: false
        });
        if (result) {
            try {
                return await this.renderToResponseWithComponents(ctx, result);
            } catch (err) {
                const isNoFallbackError = err instanceof NoFallbackError;
                if (!isNoFallbackError || isNoFallbackError && bubbleNoFallback) {
                    throw err;
                }
            }
        }
        return false;
    }
    async renderToResponse(ctx) {
        return (0, _tracer).getTracer().trace(_constants1.BaseServerSpan.renderToResponse, async ()=>{
            return this.renderToResponseImpl(ctx);
        });
    }
    async renderToResponseImpl(ctx) {
        var ref;
        const { res , query , pathname  } = ctx;
        let page = pathname;
        const bubbleNoFallback = !!query._nextBubbleNoFallback;
        delete query._nextBubbleNoFallback;
        const options = {
            i18n: (ref = this.localeNormalizer) == null ? void 0 : ref.match(pathname)
        };
        try {
            for await (const match of this.matchers.matchAll(pathname, options)){
                const result = await this.renderPageComponent({
                    ...ctx,
                    pathname: match.definition.pathname,
                    renderOpts: {
                        ...ctx.renderOpts,
                        params: match.params
                    }
                }, bubbleNoFallback);
                if (result !== false) return result;
            }
            // currently edge functions aren't receiving the x-matched-path
            // header so we need to fallback to matching the current page
            // when we weren't able to match via dynamic route to handle
            // the rewrite case
            // @ts-expect-error extended in child class web-server
            if (this.serverOptions.webServerConfig) {
                // @ts-expect-error extended in child class web-server
                ctx.pathname = this.serverOptions.webServerConfig.page;
                const result = await this.renderPageComponent(ctx, bubbleNoFallback);
                if (result !== false) return result;
            }
        } catch (error) {
            const err = (0, _isError).getProperError(error);
            if (error instanceof _utils.MissingStaticPage) {
                console.error("Invariant: failed to load static page", JSON.stringify({
                    page,
                    url: ctx.req.url,
                    matchedPath: ctx.req.headers["x-matched-path"],
                    initUrl: (0, _requestMeta).getRequestMeta(ctx.req, "__NEXT_INIT_URL"),
                    didRewrite: (0, _requestMeta).getRequestMeta(ctx.req, "_nextDidRewrite"),
                    rewroteUrl: (0, _requestMeta).getRequestMeta(ctx.req, "_nextRewroteUrl")
                }, null, 2));
                throw err;
            }
            if (err instanceof NoFallbackError && bubbleNoFallback) {
                throw err;
            }
            if (err instanceof _utils.DecodeError || err instanceof _utils.NormalizeError) {
                res.statusCode = 400;
                return await this.renderErrorToResponse(ctx, err);
            }
            res.statusCode = 500;
            // if pages/500 is present we still need to trigger
            // /_error `getInitialProps` to allow reporting error
            if (await this.hasPage("/500")) {
                ctx.query.__nextCustomErrorRender = "1";
                await this.renderErrorToResponse(ctx, err);
                delete ctx.query.__nextCustomErrorRender;
            }
            const isWrappedError = err instanceof WrappedBuildError;
            if (!isWrappedError) {
                if (this.minimalMode && process.env.NEXT_RUNTIME !== "edge" || this.renderOpts.dev) {
                    if ((0, _isError).default(err)) err.page = page;
                    throw err;
                }
                this.logError((0, _isError).getProperError(err));
            }
            const response = await this.renderErrorToResponse(ctx, isWrappedError ? err.innerError : err);
            return response;
        }
        if (this.router.catchAllMiddleware[0] && !!ctx.req.headers["x-nextjs-data"] && (!res.statusCode || res.statusCode === 200 || res.statusCode === 404)) {
            res.setHeader("x-nextjs-matched-path", `${query.__nextLocale ? `/${query.__nextLocale}` : ""}${pathname}`);
            res.statusCode = 200;
            res.setHeader("content-type", "application/json");
            res.body("{}");
            res.send();
            return null;
        }
        res.statusCode = 404;
        return this.renderErrorToResponse(ctx, null);
    }
    async renderToHTML(req, res, pathname, query = {}) {
        return (0, _tracer).getTracer().trace(_constants1.BaseServerSpan.renderToHTML, async ()=>{
            return this.renderToHTMLImpl(req, res, pathname, query);
        });
    }
    async renderToHTMLImpl(req, res, pathname, query = {}) {
        return this.getStaticHTML((ctx)=>this.renderToResponse(ctx), {
            req,
            res,
            pathname,
            query
        });
    }
    async renderError(err, req, res, pathname, query = {}, setHeaders = true) {
        return (0, _tracer).getTracer().trace(_constants1.BaseServerSpan.renderError, async ()=>{
            return this.renderErrorImpl(err, req, res, pathname, query, setHeaders);
        });
    }
    async renderErrorImpl(err, req, res, pathname, query = {}, setHeaders = true) {
        if (setHeaders) {
            res.setHeader("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
        }
        return this.pipe(async (ctx)=>{
            const response = await this.renderErrorToResponse(ctx, err);
            if (this.minimalMode && res.statusCode === 500) {
                throw err;
            }
            return response;
        }, {
            req,
            res,
            pathname,
            query
        });
    }
    customErrorNo404Warn = (0, _utils).execOnce(()=>{
        Log.warn(`You have added a custom /_error page without a custom /404 page. This prevents the 404 page from being auto statically optimized.\nSee here for info: https://nextjs.org/docs/messages/custom-error-no-custom-404`);
    });
    async renderErrorToResponse(ctx, err) {
        return (0, _tracer).getTracer().trace(_constants1.BaseServerSpan.renderErrorToResponse, async ()=>{
            return this.renderErrorToResponseImpl(ctx, err);
        });
    }
    async renderErrorToResponseImpl(ctx, err) {
        const { res , query  } = ctx;
        try {
            let result = null;
            const is404 = res.statusCode === 404;
            let using404Page = false;
            // use static 404 page if available and is 404 response
            if (is404 && await this.hasPage("/404")) {
                result = await this.findPageComponents({
                    pathname: "/404",
                    query,
                    params: {},
                    isAppPath: false,
                    // Ensuring can't be done here because you never "match" a 404 route.
                    shouldEnsure: true
                });
                using404Page = result !== null;
            }
            let statusPage = `/${res.statusCode}`;
            if (!ctx.query.__nextCustomErrorRender && !result && _constants.STATIC_STATUS_PAGES.includes(statusPage)) {
                // skip ensuring /500 in dev mode as it isn't used and the
                // dev overlay is used instead
                if (statusPage !== "/500" || !this.renderOpts.dev) {
                    result = await this.findPageComponents({
                        pathname: statusPage,
                        query,
                        params: {},
                        isAppPath: false,
                        // Ensuring can't be done here because you never "match" a 500
                        // route.
                        shouldEnsure: true
                    });
                }
            }
            if (!result) {
                result = await this.findPageComponents({
                    pathname: "/_error",
                    query,
                    params: {},
                    isAppPath: false,
                    // Ensuring can't be done here because you never "match" an error
                    // route.
                    shouldEnsure: true
                });
                statusPage = "/_error";
            }
            if (process.env.NODE_ENV !== "production" && !using404Page && await this.hasPage("/_error") && !await this.hasPage("/404")) {
                this.customErrorNo404Warn();
            }
            if (!result) {
                // this can occur when a project directory has been moved/deleted
                // which is handled in the parent process in development
                if (this.renderOpts.dev) {
                    return {
                        type: "html",
                        // wait for dev-server to restart before refreshing
                        body: _renderResult.default.fromStatic(`
              <pre>missing required error components, refreshing...</pre>
              <script>
                async function check() {
                  const res = await fetch(location.href).catch(() => ({}))

                  if (res.status === 200) {
                    location.reload()
                  } else {
                    setTimeout(check, 1000)
                  }
                }
                check()
              </script>`)
                    };
                }
                throw new WrappedBuildError(new Error("missing required error components"));
            }
            try {
                return await this.renderToResponseWithComponents({
                    ...ctx,
                    pathname: statusPage,
                    renderOpts: {
                        ...ctx.renderOpts,
                        err
                    }
                }, result);
            } catch (maybeFallbackError) {
                if (maybeFallbackError instanceof NoFallbackError) {
                    throw new Error("invariant: failed to render error page");
                }
                throw maybeFallbackError;
            }
        } catch (error) {
            const renderToHtmlError = (0, _isError).getProperError(error);
            const isWrappedError = renderToHtmlError instanceof WrappedBuildError;
            if (!isWrappedError) {
                this.logError(renderToHtmlError);
            }
            res.statusCode = 500;
            const fallbackComponents = await this.getFallbackErrorComponents();
            if (fallbackComponents) {
                return this.renderToResponseWithComponents({
                    ...ctx,
                    pathname: "/_error",
                    renderOpts: {
                        ...ctx.renderOpts,
                        // We render `renderToHtmlError` here because `err` is
                        // already captured in the stacktrace.
                        err: isWrappedError ? renderToHtmlError.innerError : renderToHtmlError
                    }
                }, {
                    query,
                    components: fallbackComponents
                });
            }
            return {
                type: "html",
                body: _renderResult.default.fromStatic("Internal Server Error")
            };
        }
    }
    async renderErrorToHTML(err, req, res, pathname, query = {}) {
        return this.getStaticHTML((ctx)=>this.renderErrorToResponse(ctx, err), {
            req,
            res,
            pathname,
            query
        });
    }
    async getFallbackErrorComponents() {
        // The development server will provide an implementation for this
        return null;
    }
    async render404(req, res, parsedUrl, setHeaders = true) {
        const { pathname , query  } = parsedUrl ? parsedUrl : (0, _url).parse(req.url, true);
        if (this.nextConfig.i18n) {
            query.__nextLocale = query.__nextLocale || this.nextConfig.i18n.defaultLocale;
            query.__nextDefaultLocale = query.__nextDefaultLocale || this.nextConfig.i18n.defaultLocale;
        }
        res.statusCode = 404;
        return this.renderError(null, req, res, pathname, query, setHeaders);
    }
}
exports.default = Server;
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function() {
        return cache;
    };
    return cache;
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
class NoFallbackError extends Error {
}
exports.NoFallbackError = NoFallbackError;
class WrappedBuildError extends Error {
    constructor(innerError){
        super();
        this.innerError = innerError;
    }
}
exports.WrappedBuildError = WrappedBuildError;

//# sourceMappingURL=base-server.js.map