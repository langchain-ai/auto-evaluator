"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPageFromPath = getPageFromPath;
exports.createPagesMapping = createPagesMapping;
exports.getEdgeServerEntry = getEdgeServerEntry;
exports.getAppEntry = getAppEntry;
exports.getClientEntry = getClientEntry;
exports.runDependingOnPageType = runDependingOnPageType;
exports.createEntrypoints = createEntrypoints;
exports.finalizeEntrypoint = finalizeEntrypoint;
var _chalk = _interopRequireDefault(require("next/dist/compiled/chalk"));
var _path = require("path");
var _querystring = require("querystring");
var _constants = require("../lib/constants");
var _isApiRoute = require("../lib/is-api-route");
var _isEdgeRuntime = require("../lib/is-edge-runtime");
var _constants1 = require("../shared/lib/constants");
var _log = require("./output/log");
var _utils = require("./utils");
var _getPageStaticInfo = require("./analysis/get-page-static-info");
var _normalizePathSep = require("../shared/lib/page-path/normalize-path-sep");
var _normalizePagePath = require("../shared/lib/page-path/normalize-page-path");
var _appPaths = require("../shared/lib/router/utils/app-paths");
var _nextMiddlewareLoader = require("./webpack/loaders/next-middleware-loader");
var _isAppRouteRoute = require("../lib/is-app-route-route");
var _getMetadataRoute = require("../lib/metadata/get-metadata-route");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function getPageFromPath(pagePath, pageExtensions) {
    let page = (0, _normalizePathSep).normalizePathSep(pagePath.replace(new RegExp(`\\.+(${pageExtensions.join("|")})$`), ""));
    page = page.replace(/\/index$/, "");
    return page === "" ? "/" : page;
}
function createPagesMapping({ isDev , pageExtensions , pagePaths , pagesType , pagesDir  }) {
    const isAppRoute = pagesType === "app";
    const previousPages = {};
    const pages = pagePaths.reduce((result, pagePath)=>{
        // Do not process .d.ts files inside the `pages` folder
        if (pagePath.endsWith(".d.ts") && pageExtensions.includes("ts")) {
            return result;
        }
        let pageKey = getPageFromPath(pagePath, pageExtensions);
        if (isAppRoute) {
            pageKey = pageKey.replace(/%5F/g, "_");
            pageKey = pageKey.replace(/^\/not-found$/g, "/_not-found");
        }
        if (pageKey in result) {
            (0, _log).warn(`Duplicate page detected. ${_chalk.default.cyan((0, _path).join("pages", previousPages[pageKey]))} and ${_chalk.default.cyan((0, _path).join("pages", pagePath))} both resolve to ${_chalk.default.cyan(pageKey)}.`);
        } else {
            previousPages[pageKey] = pagePath;
        }
        const normalizedPath = (0, _normalizePathSep).normalizePathSep((0, _path).join(pagesType === "pages" ? _constants.PAGES_DIR_ALIAS : pagesType === "app" ? _constants.APP_DIR_ALIAS : _constants.ROOT_DIR_ALIAS, pagePath));
        const route = pagesType === "app" ? (0, _getMetadataRoute).normalizeMetadataRoute(pageKey) : pageKey;
        result[route] = normalizedPath;
        return result;
    }, {});
    if (pagesType !== "pages") {
        return pages;
    }
    if (isDev) {
        delete pages["/_app"];
        delete pages["/_error"];
        delete pages["/_document"];
    }
    // In development we always alias these to allow Webpack to fallback to
    // the correct source file so that HMR can work properly when a file is
    // added or removed.
    const root = isDev && pagesDir ? _constants.PAGES_DIR_ALIAS : "next/dist/pages";
    return {
        "/_app": `${root}/_app`,
        "/_error": `${root}/_error`,
        "/_document": `${root}/_document`,
        ...pages
    };
}
function getEdgeServerEntry(opts) {
    var ref;
    if (opts.pagesType === "app" && (0, _isAppRouteRoute).isAppRouteRoute(opts.page) && opts.appDirLoader) {
        const loaderParams = {
            absolutePagePath: opts.absolutePagePath,
            page: opts.page,
            appDirLoader: Buffer.from(opts.appDirLoader || "").toString("base64"),
            nextConfigOutput: opts.config.output
        };
        return {
            import: `next-edge-app-route-loader?${(0, _querystring).stringify(loaderParams)}!`,
            layer: _constants.WEBPACK_LAYERS.server
        };
    }
    if ((0, _utils).isMiddlewareFile(opts.page)) {
        var ref1;
        const loaderParams = {
            absolutePagePath: opts.absolutePagePath,
            page: opts.page,
            rootDir: opts.rootDir,
            matchers: ((ref1 = opts.middleware) == null ? void 0 : ref1.matchers) ? (0, _nextMiddlewareLoader).encodeMatchers(opts.middleware.matchers) : ""
        };
        return `next-middleware-loader?${(0, _querystring).stringify(loaderParams)}!`;
    }
    if ((0, _isApiRoute).isAPIRoute(opts.page)) {
        const loaderParams = {
            absolutePagePath: opts.absolutePagePath,
            page: opts.page,
            rootDir: opts.rootDir
        };
        return `next-edge-function-loader?${(0, _querystring).stringify(loaderParams)}!`;
    }
    if ((0, _utils).isInstrumentationHookFile(opts.page)) {
        return {
            import: opts.absolutePagePath,
            filename: `edge-${_constants.INSTRUMENTATION_HOOK_FILENAME}.js`
        };
    }
    const loaderParams = {
        absolute500Path: opts.pages["/500"] || "",
        absoluteAppPath: opts.pages["/_app"],
        absoluteDocumentPath: opts.pages["/_document"],
        absoluteErrorPath: opts.pages["/_error"],
        absolutePagePath: opts.absolutePagePath,
        buildId: opts.buildId,
        dev: opts.isDev,
        isServerComponent: opts.isServerComponent,
        page: opts.page,
        stringifiedConfig: JSON.stringify(opts.config),
        pagesType: opts.pagesType,
        appDirLoader: Buffer.from(opts.appDirLoader || "").toString("base64"),
        sriEnabled: !opts.isDev && !!((ref = opts.config.experimental.sri) == null ? void 0 : ref.algorithm),
        incrementalCacheHandlerPath: opts.config.experimental.incrementalCacheHandlerPath
    };
    return {
        import: `next-edge-ssr-loader?${(0, _querystring).stringify(loaderParams)}!`,
        // The Edge bundle includes the server in its entrypoint, so it has to
        // be in the SSR layer — we later convert the page request to the RSC layer
        // via a webpack rule.
        layer: opts.appDirLoader ? _constants.WEBPACK_LAYERS.client : undefined
    };
}
function getAppEntry(opts) {
    return {
        import: `next-app-loader?${(0, _querystring).stringify(opts)}!`,
        layer: _constants.WEBPACK_LAYERS.server
    };
}
function getClientEntry(opts) {
    const loaderOptions = {
        absolutePagePath: opts.absolutePagePath,
        page: opts.page
    };
    const pageLoader = `next-client-pages-loader?${(0, _querystring).stringify(loaderOptions)}!`;
    // Make sure next/router is a dependency of _app or else chunk splitting
    // might cause the router to not be able to load causing hydration
    // to fail
    return opts.page === "/_app" ? [
        pageLoader,
        require.resolve("../client/router")
    ] : pageLoader;
}
async function runDependingOnPageType(params) {
    if (params.pageType === "root" && (0, _utils).isInstrumentationHookFile(params.page)) {
        await Promise.all([
            params.onServer(),
            params.onEdgeServer()
        ]);
        return;
    }
    if ((0, _utils).isMiddlewareFile(params.page)) {
        await params.onEdgeServer();
        return;
    }
    if ((0, _isApiRoute).isAPIRoute(params.page)) {
        if ((0, _isEdgeRuntime).isEdgeRuntime(params.pageRuntime)) {
            await params.onEdgeServer();
            return;
        }
        await params.onServer();
        return;
    }
    if (params.page === "/_document") {
        await params.onServer();
        return;
    }
    if (params.page === "/_app" || params.page === "/_error" || params.page === "/404" || params.page === "/500") {
        await Promise.all([
            params.onClient(),
            params.onServer()
        ]);
        return;
    }
    if ((0, _isEdgeRuntime).isEdgeRuntime(params.pageRuntime)) {
        await Promise.all([
            params.onClient(),
            params.onEdgeServer()
        ]);
        return;
    }
    await Promise.all([
        params.onClient(),
        params.onServer()
    ]);
    return;
}
async function createEntrypoints(params) {
    const { config , pages , pagesDir , isDev , rootDir , rootPaths , appDir , appPaths , pageExtensions ,  } = params;
    const edgeServer = {};
    const server = {};
    const client = {};
    const nestedMiddleware = [];
    let middlewareMatchers = undefined;
    let appPathsPerRoute = {};
    if (appDir && appPaths) {
        for(const pathname in appPaths){
            const normalizedPath = (0, _appPaths).normalizeAppPath(pathname);
            const actualPath = appPaths[pathname];
            if (!appPathsPerRoute[normalizedPath]) {
                appPathsPerRoute[normalizedPath] = [];
            }
            appPathsPerRoute[normalizedPath].push(// TODO-APP: refactor to pass the page path from createPagesMapping instead.
            getPageFromPath(actualPath, pageExtensions).replace(_constants.APP_DIR_ALIAS, ""));
        }
        // Make sure to sort parallel routes to make the result deterministic.
        appPathsPerRoute = Object.fromEntries(Object.entries(appPathsPerRoute).map(([k, v])=>[
                k,
                v.sort()
            ]));
    }
    const getEntryHandler = (mappings, pagesType)=>{
        return async (page)=>{
            const bundleFile = (0, _normalizePagePath).normalizePagePath(page);
            const clientBundlePath = _path.posix.join(pagesType, bundleFile);
            const serverBundlePath = pagesType === "pages" ? _path.posix.join("pages", bundleFile) : pagesType === "app" ? _path.posix.join("app", bundleFile) : bundleFile.slice(1);
            const absolutePagePath = mappings[page];
            // Handle paths that have aliases
            const pageFilePath = (()=>{
                if (absolutePagePath.startsWith(_constants.PAGES_DIR_ALIAS) && pagesDir) {
                    return absolutePagePath.replace(_constants.PAGES_DIR_ALIAS, pagesDir);
                }
                if (absolutePagePath.startsWith(_constants.APP_DIR_ALIAS) && appDir) {
                    return absolutePagePath.replace(_constants.APP_DIR_ALIAS, appDir);
                }
                if (absolutePagePath.startsWith(_constants.ROOT_DIR_ALIAS)) {
                    return absolutePagePath.replace(_constants.ROOT_DIR_ALIAS, rootDir);
                }
                return require.resolve(absolutePagePath);
            })();
            /**
       * When we find a middleware file that is not in the ROOT_DIR we fail.
       * There is no need to check on `dev` as this should only happen when
       * building for production.
       */ if (!absolutePagePath.startsWith(_constants.ROOT_DIR_ALIAS) && /[\\\\/]_middleware$/.test(page)) {
                nestedMiddleware.push(page);
            }
            const isInsideAppDir = !!appDir && (absolutePagePath.startsWith(_constants.APP_DIR_ALIAS) || absolutePagePath.startsWith(appDir));
            const staticInfo = await (0, _getPageStaticInfo).getPageStaticInfo({
                nextConfig: config,
                pageFilePath,
                isDev,
                page,
                pageType: isInsideAppDir ? "app" : "pages"
            });
            const isServerComponent = isInsideAppDir && staticInfo.rsc !== _constants1.RSC_MODULE_TYPES.client;
            if ((0, _utils).isMiddlewareFile(page)) {
                var ref;
                middlewareMatchers = ((ref = staticInfo.middleware) == null ? void 0 : ref.matchers) ?? [
                    {
                        regexp: ".*",
                        originalSource: "/:path*"
                    }, 
                ];
            }
            await runDependingOnPageType({
                page,
                pageRuntime: staticInfo.runtime,
                pageType: pagesType,
                onClient: ()=>{
                    if (isServerComponent || isInsideAppDir) {
                    // We skip the initial entries for server component pages and let the
                    // server compiler inject them instead.
                    } else {
                        client[clientBundlePath] = getClientEntry({
                            absolutePagePath: mappings[page],
                            page
                        });
                    }
                },
                onServer: ()=>{
                    if (pagesType === "app" && appDir) {
                        const matchedAppPaths = appPathsPerRoute[(0, _appPaths).normalizeAppPath(page)];
                        server[serverBundlePath] = getAppEntry({
                            page,
                            name: serverBundlePath,
                            pagePath: mappings[page],
                            appDir,
                            appPaths: matchedAppPaths,
                            pageExtensions,
                            assetPrefix: config.assetPrefix,
                            nextConfigOutput: config.output
                        });
                    } else {
                        if ((0, _utils).isInstrumentationHookFile(page) && pagesType === "root") {
                            server[serverBundlePath.replace("src/", "")] = {
                                import: mappings[page],
                                // the '../' is needed to make sure the file is not chunked
                                filename: `../${_constants.INSTRUMENTATION_HOOK_FILENAME}.js`
                            };
                        } else {
                            server[serverBundlePath] = [
                                mappings[page]
                            ];
                        }
                    }
                },
                onEdgeServer: ()=>{
                    let appDirLoader = "";
                    if (pagesType === "app") {
                        const matchedAppPaths = appPathsPerRoute[(0, _appPaths).normalizeAppPath(page)];
                        appDirLoader = getAppEntry({
                            name: serverBundlePath,
                            page,
                            pagePath: mappings[page],
                            appDir: appDir,
                            appPaths: matchedAppPaths,
                            pageExtensions,
                            assetPrefix: config.assetPrefix,
                            nextConfigOutput: config.output
                        }).import;
                    }
                    const normalizedServerBundlePath = (0, _utils).isInstrumentationHookFile(page) && pagesType === "root" ? serverBundlePath.replace("src/", "") : serverBundlePath;
                    edgeServer[normalizedServerBundlePath] = getEdgeServerEntry({
                        ...params,
                        rootDir,
                        absolutePagePath: mappings[page],
                        bundlePath: clientBundlePath,
                        isDev: false,
                        isServerComponent,
                        page,
                        middleware: staticInfo == null ? void 0 : staticInfo.middleware,
                        pagesType,
                        appDirLoader
                    });
                }
            });
        };
    };
    if (appDir && appPaths) {
        const entryHandler = getEntryHandler(appPaths, "app");
        await Promise.all(Object.keys(appPaths).map(entryHandler));
    }
    if (rootPaths) {
        await Promise.all(Object.keys(rootPaths).map(getEntryHandler(rootPaths, "root")));
    }
    await Promise.all(Object.keys(pages).map(getEntryHandler(pages, "pages")));
    if (nestedMiddleware.length > 0) {
        throw new _utils.NestedMiddlewareError(nestedMiddleware, rootDir, appDir || pagesDir);
    }
    return {
        client,
        server,
        edgeServer,
        middlewareMatchers
    };
}
function finalizeEntrypoint({ name , compilerType , value , isServerComponent , hasAppDir  }) {
    const entry = typeof value !== "object" || Array.isArray(value) ? {
        import: value
    } : value;
    const isApi = name.startsWith("pages/api/");
    if (compilerType === _constants1.COMPILER_NAMES.server) {
        return {
            publicPath: isApi ? "" : undefined,
            runtime: isApi ? "webpack-api-runtime" : "webpack-runtime",
            layer: isApi ? _constants.WEBPACK_LAYERS.api : isServerComponent ? _constants.WEBPACK_LAYERS.server : undefined,
            ...entry
        };
    }
    if (compilerType === _constants1.COMPILER_NAMES.edgeServer) {
        return {
            layer: (0, _utils).isMiddlewareFilename(name) || isApi ? _constants.WEBPACK_LAYERS.middleware : undefined,
            library: {
                name: [
                    "_ENTRIES",
                    `middleware_[name]`
                ],
                type: "assign"
            },
            runtime: _constants1.EDGE_RUNTIME_WEBPACK,
            asyncChunks: false,
            ...entry
        };
    }
    const isAppLayer = hasAppDir && (name === _constants1.CLIENT_STATIC_FILES_RUNTIME_MAIN_APP || name === _constants1.APP_CLIENT_INTERNALS || name.startsWith("app/"));
    if (// Client special cases
    name !== _constants1.CLIENT_STATIC_FILES_RUNTIME_POLYFILLS && name !== _constants1.CLIENT_STATIC_FILES_RUNTIME_MAIN && name !== _constants1.CLIENT_STATIC_FILES_RUNTIME_MAIN_APP && name !== _constants1.CLIENT_STATIC_FILES_RUNTIME_AMP && name !== _constants1.CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH) {
        if (isAppLayer) {
            return {
                dependOn: _constants1.CLIENT_STATIC_FILES_RUNTIME_MAIN_APP,
                layer: _constants.WEBPACK_LAYERS.appClient,
                ...entry
            };
        }
        return {
            dependOn: name.startsWith("pages/") && name !== "pages/_app" ? "pages/_app" : _constants1.CLIENT_STATIC_FILES_RUNTIME_MAIN,
            ...entry
        };
    }
    if (isAppLayer) {
        return {
            layer: _constants.WEBPACK_LAYERS.appClient,
            ...entry
        };
    }
    return entry;
}

//# sourceMappingURL=entries.js.map