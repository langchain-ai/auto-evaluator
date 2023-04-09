"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = build;
require("../lib/setup-exception-listeners");
var _env = require("@next/env");
var _chalk = _interopRequireDefault(require("next/dist/compiled/chalk"));
var _crypto = _interopRequireDefault(require("crypto"));
var _micromatch = require("next/dist/compiled/micromatch");
var _fs = require("fs");
var _os = _interopRequireDefault(require("os"));
var _worker = require("../lib/worker");
var _configShared = require("../server/config-shared");
var _devalue = _interopRequireDefault(require("next/dist/compiled/devalue"));
var _escapeRegexp = require("../shared/lib/escape-regexp");
var _findUp = _interopRequireDefault(require("next/dist/compiled/find-up"));
var _indexCjs = require("next/dist/compiled/nanoid/index.cjs");
var _pathToRegexp = require("next/dist/compiled/path-to-regexp");
var _path = _interopRequireDefault(require("path"));
var _constants = require("../lib/constants");
var _fileExists = require("../lib/file-exists");
var _findPagesDir = require("../lib/find-pages-dir");
var _loadCustomRoutes = _interopRequireWildcard(require("../lib/load-custom-routes"));
var _redirectStatus = require("../lib/redirect-status");
var _nonNullable = require("../lib/non-nullable");
var _recursiveDelete = require("../lib/recursive-delete");
var _verifyPartytownSetup = require("../lib/verify-partytown-setup");
var _constants1 = require("../shared/lib/constants");
var _utils = require("../shared/lib/router/utils");
var _config = _interopRequireDefault(require("../server/config"));
var _normalizePagePath = require("../shared/lib/page-path/normalize-page-path");
var _require = require("../server/require");
var ciEnvironment = _interopRequireWildcard(require("../telemetry/ci-info"));
var _events = require("../telemetry/events");
var _storage = require("../telemetry/storage");
var _getPageStaticInfo = require("./analysis/get-page-static-info");
var _entries = require("./entries");
var _generateBuildId = require("./generate-build-id");
var _isWriteable = require("./is-writeable");
var Log = _interopRequireWildcard(require("./output/log"));
var _spinner = _interopRequireDefault(require("./spinner"));
var _trace = require("../trace");
var _utils1 = require("./utils");
var _writeBuildId = require("./write-build-id");
var _normalizeLocalePath = require("../shared/lib/i18n/normalize-locale-path");
var _isError = _interopRequireDefault(require("../lib/is-error"));
var _isEdgeRuntime = require("../lib/is-edge-runtime");
var _recursiveCopy = require("../lib/recursive-copy");
var _recursiveReaddir = require("../lib/recursive-readdir");
var _swc = require("./swc");
var _routeRegex = require("../shared/lib/router/utils/route-regex");
var _flatReaddir = require("../lib/flat-readdir");
var _swcPlugins = require("../telemetry/events/swc-plugins");
var _appPaths = require("../shared/lib/router/utils/app-paths");
var _appRouterHeaders = require("../client/components/app-router-headers");
var _webpackBuild = require("./webpack-build");
var _buildContext = require("./build-context");
var _normalizePathSep = require("../shared/lib/page-path/normalize-path-sep");
var _isAppRouteRoute = require("../lib/is-app-route-route");
var _createClientRouterFilter = require("../lib/create-client-router-filter");
var _findPageFile = require("../server/lib/find-page-file");
var _typeCheck = require("./type-check");
var _generateInterceptionRoutesRewrites = require("../lib/generate-interception-routes-rewrites");
async function build(dir, reactProductionProfiling = false, debugOutput = false, runLint = true, noMangling = false, appDirOnly = false, turboNextBuild = false) {
    let hasAppDir = false;
    try {
        const nextBuildSpan = (0, _trace).trace("next-build", undefined, {
            version: "13.3.0"
        });
        _buildContext.NextBuildContext.nextBuildSpan = nextBuildSpan;
        _buildContext.NextBuildContext.dir = dir;
        _buildContext.NextBuildContext.appDirOnly = appDirOnly;
        _buildContext.NextBuildContext.reactProductionProfiling = reactProductionProfiling;
        _buildContext.NextBuildContext.noMangling = noMangling;
        const buildResult = await nextBuildSpan.traceAsyncFn(async ()=>{
            var ref3, ref1;
            // attempt to load global env values so they are available in next.config.js
            const { loadedEnvFiles  } = nextBuildSpan.traceChild("load-dotenv").traceFn(()=>(0, _env).loadEnvConfig(dir, false, Log));
            _buildContext.NextBuildContext.loadedEnvFiles = loadedEnvFiles;
            const config = await nextBuildSpan.traceChild("load-next-config").traceAsyncFn(()=>(0, _config).default(_constants1.PHASE_PRODUCTION_BUILD, dir));
            _buildContext.NextBuildContext.config = config;
            let configOutDir = "out";
            if (config.output === "export" && config.distDir !== ".next") {
                // In the past, a user had to run "next build" to generate
                // ".next" (or whatever the distDir) followed by "next export"
                // to generate "out" (or whatever the outDir). However, when
                // "output: export" is configured, "next build" does both steps.
                // So the user-configured dirDir is actually the outDir.
                configOutDir = config.distDir;
                config.distDir = ".next";
            }
            const distDir = _path.default.join(dir, config.distDir);
            (0, _trace).setGlobal("phase", _constants1.PHASE_PRODUCTION_BUILD);
            (0, _trace).setGlobal("distDir", distDir);
            const buildId = await nextBuildSpan.traceChild("generate-buildid").traceAsyncFn(()=>(0, _generateBuildId).generateBuildId(config.generateBuildId, _indexCjs.nanoid));
            _buildContext.NextBuildContext.buildId = buildId;
            const customRoutes = await nextBuildSpan.traceChild("load-custom-routes").traceAsyncFn(()=>(0, _loadCustomRoutes).default(config));
            const { headers , rewrites , redirects  } = customRoutes;
            _buildContext.NextBuildContext.rewrites = rewrites;
            _buildContext.NextBuildContext.originalRewrites = config._originalRewrites;
            _buildContext.NextBuildContext.originalRedirects = config._originalRedirects;
            const cacheDir = _path.default.join(distDir, "cache");
            if (ciEnvironment.isCI && !ciEnvironment.hasNextSupport) {
                const hasCache = await (0, _fileExists).fileExists(cacheDir);
                if (!hasCache) {
                    // Intentionally not piping to stderr in case people fail in CI when
                    // stderr is detected.
                    console.log(`${Log.prefixes.warn} No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache`);
                }
            }
            const telemetry = new _storage.Telemetry({
                distDir
            });
            (0, _trace).setGlobal("telemetry", telemetry);
            const publicDir = _path.default.join(dir, "public");
            const isAppDirEnabled = !!config.experimental.appDir;
            const initialRequireHookFilePath = require.resolve("next/dist/server/initialize-require-hook");
            const content = await _fs.promises.readFile(initialRequireHookFilePath, "utf8");
            if (isAppDirEnabled) {
                process.env.NEXT_PREBUNDLED_REACT = "1";
            }
            await _fs.promises.writeFile(initialRequireHookFilePath, content.replace(/isPrebundled = (true|false)/, `isPrebundled = ${isAppDirEnabled}`)).catch((err)=>{
                if (isAppDirEnabled) {
                    throw err;
                }
            });
            const { pagesDir , appDir  } = (0, _findPagesDir).findPagesDir(dir, isAppDirEnabled);
            _buildContext.NextBuildContext.pagesDir = pagesDir;
            _buildContext.NextBuildContext.appDir = appDir;
            hasAppDir = Boolean(appDir);
            const isSrcDir = _path.default.relative(dir, pagesDir || appDir || "").startsWith("src");
            const hasPublicDir = await (0, _fileExists).fileExists(publicDir);
            telemetry.record((0, _events).eventCliSession(dir, config, {
                webpackVersion: 5,
                cliCommand: "build",
                isSrcDir,
                hasNowJson: !!await (0, _findUp).default("now.json", {
                    cwd: dir
                }),
                isCustomServer: null,
                turboFlag: false,
                pagesDir: !!pagesDir,
                appDir: !!appDir
            }));
            (0, _events).eventNextPlugins(_path.default.resolve(dir)).then((events)=>telemetry.record(events));
            (0, _swcPlugins).eventSwcPlugins(_path.default.resolve(dir), config).then((events)=>telemetry.record(events));
            const ignoreESLint = Boolean(config.eslint.ignoreDuringBuilds);
            const shouldLint = !ignoreESLint && runLint;
            const typeCheckingOptions = {
                dir,
                appDir,
                pagesDir,
                isAppDirEnabled,
                runLint,
                shouldLint,
                ignoreESLint,
                telemetry,
                nextBuildSpan,
                config,
                cacheDir
            };
            // For app directory, we run type checking after build. That's because
            // we dynamically generate types for each layout and page in the app
            // directory.
            if (!appDir) await (0, _typeCheck).startTypeChecking(typeCheckingOptions);
            if (appDir && "exportPathMap" in config) {
                Log.error('The "exportPathMap" configuration cannot be used with the "app" directory. Please use generateStaticParams() instead.');
                await telemetry.flush();
                process.exit(1);
            }
            const buildLintEvent = {
                featureName: "build-lint",
                invocationCount: shouldLint ? 1 : 0
            };
            telemetry.record({
                eventName: _events.EVENT_BUILD_FEATURE_USAGE,
                payload: buildLintEvent
            });
            const buildSpinner = (0, _spinner).default({
                prefixText: `${Log.prefixes.info} Creating an optimized production build`
            });
            _buildContext.NextBuildContext.buildSpinner = buildSpinner;
            const validFileMatcher = (0, _findPageFile).createValidFileMatcher(config.pageExtensions, appDir);
            const pagesPaths = !appDirOnly && pagesDir ? await nextBuildSpan.traceChild("collect-pages").traceAsyncFn(()=>(0, _recursiveReaddir).recursiveReadDir(pagesDir, validFileMatcher.isPageFile)) : [];
            let appPaths;
            if (appDir) {
                appPaths = await nextBuildSpan.traceChild("collect-app-paths").traceAsyncFn(()=>(0, _recursiveReaddir).recursiveReadDir(appDir, (absolutePath)=>{
                        if (validFileMatcher.isAppRouterPage(absolutePath)) {
                            return true;
                        }
                        // For now we only collect the root /not-found page in the app
                        // directory as the 404 fallback.
                        if (validFileMatcher.isRootNotFound(absolutePath)) {
                            return true;
                        }
                        return false;
                    }, undefined, (part)=>part.startsWith("_")));
            }
            const middlewareDetectionRegExp = new RegExp(`^${_constants.MIDDLEWARE_FILENAME}\\.(?:${config.pageExtensions.join("|")})$`);
            const instrumentationHookDetectionRegExp = new RegExp(`^${_constants.INSTRUMENTATION_HOOK_FILENAME}\\.(?:${config.pageExtensions.join("|")})$`);
            const rootDir = _path.default.join(pagesDir || appDir, "..");
            const instrumentationHookEnabled = Boolean(config.experimental.instrumentationHook);
            const rootPaths = (await (0, _flatReaddir).flatReaddir(rootDir, [
                middlewareDetectionRegExp,
                ...instrumentationHookEnabled ? [
                    instrumentationHookDetectionRegExp
                ] : [], 
            ])).map((absoluteFile)=>absoluteFile.replace(dir, ""));
            const hasInstrumentationHook = rootPaths.some((p)=>p.includes(_constants.INSTRUMENTATION_HOOK_FILENAME));
            _buildContext.NextBuildContext.hasInstrumentationHook = hasInstrumentationHook;
            const previewProps = {
                previewModeId: _crypto.default.randomBytes(16).toString("hex"),
                previewModeSigningKey: _crypto.default.randomBytes(32).toString("hex"),
                previewModeEncryptionKey: _crypto.default.randomBytes(32).toString("hex")
            };
            _buildContext.NextBuildContext.previewProps = previewProps;
            const mappedPages = nextBuildSpan.traceChild("create-pages-mapping").traceFn(()=>(0, _entries).createPagesMapping({
                    isDev: false,
                    pageExtensions: config.pageExtensions,
                    pagesType: "pages",
                    pagePaths: pagesPaths,
                    pagesDir
                }));
            _buildContext.NextBuildContext.mappedPages = mappedPages;
            let mappedAppPages;
            let denormalizedAppPages;
            if (appPaths && appDir) {
                mappedAppPages = nextBuildSpan.traceChild("create-app-mapping").traceFn(()=>(0, _entries).createPagesMapping({
                        pagePaths: appPaths,
                        isDev: false,
                        pagesType: "app",
                        pageExtensions: config.pageExtensions,
                        pagesDir: pagesDir
                    }));
                _buildContext.NextBuildContext.mappedAppPages = mappedAppPages;
            }
            let mappedRootPaths = {};
            if (rootPaths.length > 0) {
                mappedRootPaths = (0, _entries).createPagesMapping({
                    isDev: false,
                    pageExtensions: config.pageExtensions,
                    pagePaths: rootPaths,
                    pagesType: "root",
                    pagesDir: pagesDir
                });
            }
            _buildContext.NextBuildContext.mappedRootPaths = mappedRootPaths;
            const pagesPageKeys = Object.keys(mappedPages);
            const conflictingAppPagePaths = [];
            const appPageKeys = [];
            if (mappedAppPages) {
                denormalizedAppPages = Object.keys(mappedAppPages);
                for (const appKey of denormalizedAppPages){
                    const normalizedAppPageKey = (0, _appPaths).normalizeAppPath(appKey);
                    const pagePath = mappedPages[normalizedAppPageKey];
                    if (pagePath) {
                        const appPath = mappedAppPages[appKey];
                        conflictingAppPagePaths.push([
                            pagePath.replace(/^private-next-pages/, "pages"),
                            appPath.replace(/^private-next-app-dir/, "app"), 
                        ]);
                    }
                    appPageKeys.push(normalizedAppPageKey);
                }
            }
            // Interception routes are modelled as beforeFiles rewrites
            rewrites.beforeFiles.unshift(...(0, _generateInterceptionRoutesRewrites).generateInterceptionRoutesRewrites(appPageKeys));
            const totalAppPagesCount = appPageKeys.length;
            const pageKeys = {
                pages: pagesPageKeys,
                app: appPageKeys.length > 0 ? appPageKeys : undefined
            };
            const numConflictingAppPaths = conflictingAppPagePaths.length;
            if (mappedAppPages && numConflictingAppPaths > 0) {
                Log.error(`Conflicting app and page file${numConflictingAppPaths === 1 ? " was" : "s were"} found, please remove the conflicting files to continue:`);
                for (const [pagePath, appPath] of conflictingAppPagePaths){
                    Log.error(`  "${pagePath}" - "${appPath}"`);
                }
                await telemetry.flush();
                process.exit(1);
            }
            const conflictingPublicFiles = [];
            const hasPages404 = (ref3 = mappedPages["/404"]) == null ? void 0 : ref3.startsWith(_constants.PAGES_DIR_ALIAS);
            const hasApp404 = !!(mappedAppPages == null ? void 0 : mappedAppPages["/_not-found"]);
            const hasCustomErrorPage = mappedPages["/_error"].startsWith(_constants.PAGES_DIR_ALIAS);
            if (hasPublicDir) {
                const hasPublicUnderScoreNextDir = await (0, _fileExists).fileExists(_path.default.join(publicDir, "_next"));
                if (hasPublicUnderScoreNextDir) {
                    throw new Error(_constants.PUBLIC_DIR_MIDDLEWARE_CONFLICT);
                }
            }
            await nextBuildSpan.traceChild("public-dir-conflict-check").traceAsyncFn(async ()=>{
                // Check if pages conflict with files in `public`
                // Only a page of public file can be served, not both.
                for(const page in mappedPages){
                    const hasPublicPageFile = await (0, _fileExists).fileExists(_path.default.join(publicDir, page === "/" ? "/index" : page), "file");
                    if (hasPublicPageFile) {
                        conflictingPublicFiles.push(page);
                    }
                }
                const numConflicting = conflictingPublicFiles.length;
                if (numConflicting) {
                    throw new Error(`Conflicting public and page file${numConflicting === 1 ? " was" : "s were"} found. https://nextjs.org/docs/messages/conflicting-public-file-page\n${conflictingPublicFiles.join("\n")}`);
                }
            });
            const nestedReservedPages = pageKeys.pages.filter((page)=>{
                return page.match(/\/(_app|_document|_error)$/) && _path.default.dirname(page) !== "/";
            });
            if (nestedReservedPages.length) {
                Log.warn(`The following reserved Next.js pages were detected not directly under the pages directory:\n` + nestedReservedPages.join("\n") + `\nSee more info here: https://nextjs.org/docs/messages/nested-reserved-page\n`);
            }
            const restrictedRedirectPaths = [
                "/_next"
            ].map((p)=>config.basePath ? `${config.basePath}${p}` : p);
            const buildCustomRoute = (r, type)=>{
                const keys = [];
                const routeRegex = (0, _pathToRegexp).pathToRegexp(r.source, keys, {
                    strict: true,
                    sensitive: false,
                    delimiter: "/"
                });
                let regexSource = routeRegex.source;
                if (!r.internal) {
                    regexSource = (0, _redirectStatus).modifyRouteRegex(routeRegex.source, type === "redirect" ? restrictedRedirectPaths : undefined);
                }
                return {
                    ...r,
                    ...type === "redirect" ? {
                        statusCode: (0, _redirectStatus).getRedirectStatus(r),
                        permanent: undefined
                    } : {},
                    regex: (0, _loadCustomRoutes).normalizeRouteRegex(regexSource)
                };
            };
            const routesManifestPath = _path.default.join(distDir, _constants1.ROUTES_MANIFEST);
            const routesManifest = nextBuildSpan.traceChild("generate-routes-manifest").traceFn(()=>{
                const sortedRoutes = (0, _utils).getSortedRoutes([
                    ...pageKeys.pages,
                    ...pageKeys.app ?? [], 
                ]);
                const dynamicRoutes = [];
                const staticRoutes = [];
                for (const route of sortedRoutes){
                    if ((0, _utils).isDynamicRoute(route)) {
                        dynamicRoutes.push(pageToRoute(route));
                    } else if (!(0, _utils1).isReservedPage(route)) {
                        staticRoutes.push(pageToRoute(route));
                    }
                }
                return {
                    version: 3,
                    pages404: true,
                    basePath: config.basePath,
                    redirects: redirects.map((r)=>buildCustomRoute(r, "redirect")),
                    headers: headers.map((r)=>buildCustomRoute(r, "header")),
                    dynamicRoutes,
                    staticRoutes,
                    dataRoutes: [],
                    i18n: config.i18n || undefined,
                    rsc: {
                        header: _appRouterHeaders.RSC,
                        varyHeader: _appRouterHeaders.RSC_VARY_HEADER,
                        contentTypeHeader: _appRouterHeaders.RSC_CONTENT_TYPE_HEADER
                    },
                    skipMiddlewareUrlNormalize: config.skipMiddlewareUrlNormalize
                };
            });
            if (rewrites.beforeFiles.length === 0 && rewrites.fallback.length === 0) {
                routesManifest.rewrites = rewrites.afterFiles.map((r)=>buildCustomRoute(r, "rewrite"));
            } else {
                routesManifest.rewrites = {
                    beforeFiles: rewrites.beforeFiles.map((r)=>buildCustomRoute(r, "rewrite")),
                    afterFiles: rewrites.afterFiles.map((r)=>buildCustomRoute(r, "rewrite")),
                    fallback: rewrites.fallback.map((r)=>buildCustomRoute(r, "rewrite"))
                };
            }
            const combinedRewrites = [
                ...rewrites.beforeFiles,
                ...rewrites.afterFiles,
                ...rewrites.fallback, 
            ];
            if (config.experimental.clientRouterFilter) {
                const nonInternalRedirects = (config._originalRedirects || []).filter((r)=>!r.internal);
                const clientRouterFilters = (0, _createClientRouterFilter).createClientRouterFilter(appPageKeys, config.experimental.clientRouterFilterRedirects ? nonInternalRedirects : [], config.experimental.clientRouterFilterAllowedRate);
                _buildContext.NextBuildContext.clientRouterFilters = clientRouterFilters;
            }
            const distDirCreated = await nextBuildSpan.traceChild("create-dist-dir").traceAsyncFn(async ()=>{
                try {
                    await _fs.promises.mkdir(distDir, {
                        recursive: true
                    });
                    return true;
                } catch (err) {
                    if ((0, _isError).default(err) && err.code === "EPERM") {
                        return false;
                    }
                    throw err;
                }
            });
            if (!distDirCreated || !await (0, _isWriteable).isWriteable(distDir)) {
                throw new Error("> Build directory is not writeable. https://nextjs.org/docs/messages/build-dir-not-writeable");
            }
            if (config.cleanDistDir) {
                await (0, _recursiveDelete).recursiveDelete(distDir, /^cache/);
            }
            // Ensure commonjs handling is used for files in the distDir (generally .next)
            // Files outside of the distDir can be "type": "module"
            await _fs.promises.writeFile(_path.default.join(distDir, "package.json"), '{"type": "commonjs"}');
            // We need to write the manifest with rewrites before build
            await nextBuildSpan.traceChild("write-routes-manifest").traceAsyncFn(()=>_fs.promises.writeFile(routesManifestPath, JSON.stringify(routesManifest), "utf8"));
            const outputFileTracingRoot = config.experimental.outputFileTracingRoot || dir;
            const manifestPath = _path.default.join(distDir, _constants1.SERVER_DIRECTORY, _constants1.PAGES_MANIFEST);
            const requiredServerFiles = nextBuildSpan.traceChild("generate-required-server-files").traceFn(()=>({
                    version: 1,
                    config: {
                        ...config,
                        configFile: undefined,
                        ...ciEnvironment.hasNextSupport ? {
                            compress: false
                        } : {},
                        experimental: {
                            ...config.experimental,
                            trustHostHeader: ciEnvironment.hasNextSupport,
                            incrementalCacheHandlerPath: config.experimental.incrementalCacheHandlerPath ? _path.default.relative(distDir, config.experimental.incrementalCacheHandlerPath) : undefined
                        }
                    },
                    appDir: dir,
                    relativeAppDir: _path.default.relative(outputFileTracingRoot, dir),
                    files: [
                        _constants1.ROUTES_MANIFEST,
                        _path.default.relative(distDir, manifestPath),
                        _constants1.BUILD_MANIFEST,
                        _constants1.PRERENDER_MANIFEST,
                        _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.MIDDLEWARE_MANIFEST),
                        _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.MIDDLEWARE_BUILD_MANIFEST + ".js"),
                        _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.MIDDLEWARE_REACT_LOADABLE_MANIFEST + ".js"),
                        ...appDir ? [
                            ...config.experimental.sri ? [
                                _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.SUBRESOURCE_INTEGRITY_MANIFEST + ".js"),
                                _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.SUBRESOURCE_INTEGRITY_MANIFEST + ".json"), 
                            ] : [],
                            _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.APP_PATHS_MANIFEST),
                            _constants1.APP_BUILD_MANIFEST,
                            _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.CLIENT_REFERENCE_MANIFEST + ".js"),
                            _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.CLIENT_REFERENCE_MANIFEST + ".json"),
                            _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.FLIGHT_SERVER_CSS_MANIFEST + ".js"),
                            _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.FLIGHT_SERVER_CSS_MANIFEST + ".json"),
                            _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.SERVER_REFERENCE_MANIFEST + ".js"),
                            _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.SERVER_REFERENCE_MANIFEST + ".json"), 
                        ] : [],
                        _constants1.REACT_LOADABLE_MANIFEST,
                        config.optimizeFonts ? _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.FONT_MANIFEST) : null,
                        _constants1.BUILD_ID_FILE,
                        appDir ? _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.APP_PATHS_MANIFEST) : null,
                        _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.NEXT_FONT_MANIFEST + ".js"),
                        _path.default.join(_constants1.SERVER_DIRECTORY, _constants1.NEXT_FONT_MANIFEST + ".json"),
                        ...hasInstrumentationHook ? [
                            _path.default.join(_constants1.SERVER_DIRECTORY, `${_constants.INSTRUMENTATION_HOOK_FILENAME}.js`),
                            _path.default.join(_constants1.SERVER_DIRECTORY, `edge-${_constants.INSTRUMENTATION_HOOK_FILENAME}.js`), 
                        ] : [], 
                    ].filter(_nonNullable.nonNullable).map((file)=>_path.default.join(config.distDir, file)),
                    ignore: []
                }));
            let binding = await (0, _swc).loadBindings();
            async function turbopackBuild() {
                const turboNextBuildStart = process.hrtime();
                await binding.turbo.nextBuild(_buildContext.NextBuildContext);
                const [duration] = process.hrtime(turboNextBuildStart);
                return {
                    duration,
                    turbotraceContext: null
                };
            }
            const { duration: webpackBuildDuration , turbotraceContext  } = turboNextBuild ? await turbopackBuild() : await (0, _webpackBuild).webpackBuild();
            telemetry.record((0, _events).eventBuildCompleted(pagesPaths, {
                durationInSeconds: webpackBuildDuration,
                totalAppPagesCount
            }));
            let turboTasksForTrace;
            async function runTurbotrace(staticPages) {
                if (!turbotraceContext) {
                    return;
                }
                if (!(binding == null ? void 0 : binding.isWasm) && typeof binding.turbo.startTrace === "function") {
                    var ref;
                    let turbotraceOutputPath;
                    let turbotraceFiles;
                    turboTasksForTrace = binding.turbo.createTurboTasks((((ref = config.experimental.turbotrace) == null ? void 0 : ref.memoryLimit) ?? _constants1.TURBO_TRACE_DEFAULT_MEMORY_LIMIT) * 1024 * 1024);
                    const { entriesTrace , chunksTrace  } = turbotraceContext;
                    if (entriesTrace) {
                        const { appDir: turbotraceContextAppDir , depModArray , entryNameMap , outputPath , action ,  } = entriesTrace;
                        const depModSet = new Set(depModArray);
                        const filesTracedInEntries = await binding.turbo.startTrace(action, turboTasksForTrace);
                        const { contextDirectory , input: entriesToTrace  } = action;
                        // only trace the assets under the appDir
                        // exclude files from node_modules, entries and processed by webpack
                        const filesTracedFromEntries = filesTracedInEntries.map((f)=>_path.default.join(contextDirectory, f)).filter((f)=>!f.includes("/node_modules/") && f.startsWith(turbotraceContextAppDir) && !entriesToTrace.includes(f) && !depModSet.has(f));
                        if (filesTracedFromEntries.length) {
                            // The turbo trace doesn't provide the traced file type and reason at present
                            // let's write the traced files into the first [entry].nft.json
                            const [[, entryName]] = Array.from(entryNameMap.entries()).filter(([k])=>k.startsWith(turbotraceContextAppDir));
                            const traceOutputPath = _path.default.join(outputPath, `../${entryName}.js.nft.json`);
                            const traceOutputDir = _path.default.dirname(traceOutputPath);
                            turbotraceOutputPath = traceOutputPath;
                            turbotraceFiles = filesTracedFromEntries.map((file)=>_path.default.relative(traceOutputDir, file));
                        }
                    }
                    if (chunksTrace) {
                        const { action , outputPath  } = chunksTrace;
                        action.input = action.input.filter((f)=>{
                            const outputPagesPath = _path.default.join(outputPath, "..", "pages");
                            return !f.startsWith(outputPagesPath) || !staticPages.has(// strip `outputPagesPath` and file ext from absolute
                            f.substring(outputPagesPath.length, f.length - 3));
                        });
                        await binding.turbo.startTrace(action, turboTasksForTrace);
                        if (turbotraceOutputPath && turbotraceFiles) {
                            const existedNftFile = await _fs.promises.readFile(turbotraceOutputPath, "utf8").then((existedContent)=>JSON.parse(existedContent)).catch(()=>({
                                    version: _constants1.TRACE_OUTPUT_VERSION,
                                    files: []
                                }));
                            existedNftFile.files.push(...turbotraceFiles);
                            const filesSet = new Set(existedNftFile.files);
                            existedNftFile.files = [
                                ...filesSet
                            ];
                            await _fs.promises.writeFile(turbotraceOutputPath, JSON.stringify(existedNftFile), "utf8");
                        }
                    }
                }
            }
            // For app directory, we run type checking after build.
            if (appDir) {
                await (0, _typeCheck).startTypeChecking(typeCheckingOptions);
            }
            const postCompileSpinner = (0, _spinner).default({
                prefixText: `${Log.prefixes.info} Collecting page data`
            });
            const buildManifestPath = _path.default.join(distDir, _constants1.BUILD_MANIFEST);
            const appBuildManifestPath = _path.default.join(distDir, _constants1.APP_BUILD_MANIFEST);
            let staticAppPagesCount = 0;
            let serverAppPagesCount = 0;
            let edgeRuntimeAppCount = 0;
            let edgeRuntimePagesCount = 0;
            const ssgPages = new Set();
            const ssgStaticFallbackPages = new Set();
            const ssgBlockingFallbackPages = new Set();
            const staticPages1 = new Set();
            const invalidPages = new Set();
            const hybridAmpPages = new Set();
            const serverPropsPages = new Set();
            const additionalSsgPaths = new Map();
            const additionalSsgPathsEncoded = new Map();
            const appStaticPaths = new Map();
            const appStaticPathsEncoded = new Map();
            const appNormalizedPaths = new Map();
            const appDynamicParamPaths = new Set();
            const appDefaultConfigs = new Map();
            const pageInfos = new Map();
            const pagesManifest = JSON.parse(await _fs.promises.readFile(manifestPath, "utf8"));
            const buildManifest = JSON.parse(await _fs.promises.readFile(buildManifestPath, "utf8"));
            const appBuildManifest = appDir ? JSON.parse(await _fs.promises.readFile(appBuildManifestPath, "utf8")) : undefined;
            const timeout = config.staticPageGenerationTimeout || 0;
            const sharedPool = config.experimental.sharedPool || false;
            const staticWorker = sharedPool ? require.resolve("./worker") : require.resolve("./utils");
            let infoPrinted = false;
            let appPathsManifest = {};
            const appPathRoutes = {};
            if (appDir) {
                appPathsManifest = JSON.parse(await _fs.promises.readFile(_path.default.join(distDir, _constants1.SERVER_DIRECTORY, _constants1.APP_PATHS_MANIFEST), "utf8"));
                Object.keys(appPathsManifest).forEach((entry)=>{
                    appPathRoutes[entry] = (0, _appPaths).normalizeAppPath(entry);
                });
                await _fs.promises.writeFile(_path.default.join(distDir, _constants1.APP_PATH_ROUTES_MANIFEST), JSON.stringify(appPathRoutes, null, 2));
            }
            process.env.NEXT_PHASE = _constants1.PHASE_PRODUCTION_BUILD;
            // We limit the number of workers used based on the number of CPUs and
            // the current available memory. This is to prevent the system from
            // running out of memory as well as maximize speed. We assume that
            // each worker will consume ~1GB of memory in a production build.
            // For example, if the system has 10 CPU cores and 8GB of remaining memory
            // we will use 8 workers.
            const numWorkers = Math.max(config.experimental.cpus !== _configShared.defaultConfig.experimental.cpus ? config.experimental.cpus : Math.min(config.experimental.cpus || 1, Math.floor(_os.default.freemem() / 1e9)), // enforce a minimum of 4 workers
            4);
            const staticWorkers = new _worker.Worker(staticWorker, {
                timeout: timeout * 1000,
                onRestart: (method, [arg], attempts)=>{
                    if (method === "exportPage") {
                        const { path: pagePath  } = arg;
                        if (attempts >= 3) {
                            throw new Error(`Static page generation for ${pagePath} is still timing out after 3 attempts. See more info here https://nextjs.org/docs/messages/static-page-generation-timeout`);
                        }
                        Log.warn(`Restarted static page generation for ${pagePath} because it took more than ${timeout} seconds`);
                    } else {
                        const pagePath = arg;
                        if (attempts >= 2) {
                            throw new Error(`Collecting page data for ${pagePath} is still timing out after 2 attempts. See more info here https://nextjs.org/docs/messages/page-data-collection-timeout`);
                        }
                        Log.warn(`Restarted collecting page data for ${pagePath} because it took more than ${timeout} seconds`);
                    }
                    if (!infoPrinted) {
                        Log.warn("See more info here https://nextjs.org/docs/messages/static-page-generation-timeout");
                        infoPrinted = true;
                    }
                },
                numWorkers,
                enableWorkerThreads: config.experimental.workerThreads,
                computeWorkerKey (method, ...args) {
                    if (method === "exportPage") {
                        const typedArgs = args;
                        return typedArgs[0].pathMap.page;
                    } else if (method === "isPageStatic") {
                        const typedArgs = args;
                        return typedArgs[0].originalAppPath || typedArgs[0].page;
                    }
                    return method;
                },
                exposedMethods: sharedPool ? [
                    "hasCustomGetInitialProps",
                    "isPageStatic",
                    "getNamedExports",
                    "exportPage", 
                ] : [
                    "hasCustomGetInitialProps",
                    "isPageStatic",
                    "getNamedExports"
                ]
            });
            const analysisBegin = process.hrtime();
            const staticCheckSpan = nextBuildSpan.traceChild("static-check");
            const { customAppGetInitialProps , namedExports , isNextImageImported: isNextImageImported1 , hasSsrAmpPages: hasSsrAmpPages1 , hasNonStaticErrorPage ,  } = await staticCheckSpan.traceAsyncFn(async ()=>{
                const { configFileName , publicRuntimeConfig , serverRuntimeConfig  } = config;
                const runtimeEnvConfig = {
                    publicRuntimeConfig,
                    serverRuntimeConfig
                };
                const nonStaticErrorPageSpan = staticCheckSpan.traceChild("check-static-error-page");
                const errorPageHasCustomGetInitialProps = nonStaticErrorPageSpan.traceAsyncFn(async ()=>hasCustomErrorPage && await staticWorkers.hasCustomGetInitialProps("/_error", distDir, runtimeEnvConfig, false));
                const errorPageStaticResult = nonStaticErrorPageSpan.traceAsyncFn(async ()=>{
                    var ref, ref4;
                    return hasCustomErrorPage && staticWorkers.isPageStatic({
                        page: "/_error",
                        distDir,
                        configFileName,
                        runtimeEnvConfig,
                        httpAgentOptions: config.httpAgentOptions,
                        enableUndici: config.experimental.enableUndici,
                        locales: (ref = config.i18n) == null ? void 0 : ref.locales,
                        defaultLocale: (ref4 = config.i18n) == null ? void 0 : ref4.defaultLocale,
                        nextConfigOutput: config.output
                    });
                });
                const appPageToCheck = "/_app";
                const customAppGetInitialPropsPromise = staticWorkers.hasCustomGetInitialProps(appPageToCheck, distDir, runtimeEnvConfig, true);
                const namedExportsPromise = staticWorkers.getNamedExports(appPageToCheck, distDir, runtimeEnvConfig);
                // eslint-disable-next-line @typescript-eslint/no-shadow
                let isNextImageImported;
                // eslint-disable-next-line @typescript-eslint/no-shadow
                let hasSsrAmpPages = false;
                const computedManifestData = await (0, _utils1).computeFromManifest({
                    build: buildManifest,
                    app: appBuildManifest
                }, distDir, config.experimental.gzipSize);
                const middlewareManifest = require(_path.default.join(distDir, _constants1.SERVER_DIRECTORY, _constants1.MIDDLEWARE_MANIFEST));
                const actionManifest = appDir ? require(_path.default.join(distDir, _constants1.SERVER_DIRECTORY, _constants1.SERVER_REFERENCE_MANIFEST + ".json")) : null;
                const entriesWithAction = actionManifest ? new Set() : null;
                if (actionManifest && entriesWithAction) {
                    for(const id in actionManifest){
                        for(const entry in actionManifest[id].workers){
                            entriesWithAction.add(entry);
                        }
                    }
                }
                for (const key1 of Object.keys(middlewareManifest == null ? void 0 : middlewareManifest.functions)){
                    if (key1.startsWith("/api")) {
                        edgeRuntimePagesCount++;
                    }
                }
                await Promise.all(Object.entries(pageKeys).reduce((acc, [key, files])=>{
                    if (!files) {
                        return acc;
                    }
                    const pageType = key;
                    for (const page of files){
                        acc.push({
                            pageType,
                            page
                        });
                    }
                    return acc;
                }, []).map(({ pageType , page  })=>{
                    const checkPageSpan = staticCheckSpan.traceChild("check-page", {
                        page
                    });
                    return checkPageSpan.traceAsyncFn(async ()=>{
                        const actualPage = (0, _normalizePagePath).normalizePagePath(page);
                        const [selfSize, allSize] = await (0, _utils1).getJsPageSizeInKb(pageType, actualPage, distDir, buildManifest, appBuildManifest, config.experimental.gzipSize, computedManifestData);
                        let isSsg = false;
                        let isStatic = false;
                        let isServerComponent = false;
                        let isHybridAmp = false;
                        let ssgPageRoutes = null;
                        let pagePath = "";
                        if (pageType === "pages") {
                            pagePath = pagesPaths.find((p)=>{
                                p = (0, _normalizePathSep).normalizePathSep(p);
                                return p.startsWith(actualPage + ".") || p.startsWith(actualPage + "/index.");
                            }) || "";
                        }
                        let originalAppPath;
                        if (pageType === "app" && mappedAppPages) {
                            for (const [originalPath, normalizedPath] of Object.entries(appPathRoutes)){
                                if (normalizedPath === page) {
                                    pagePath = mappedAppPages[originalPath].replace(/^private-next-app-dir/, "");
                                    originalAppPath = originalPath;
                                    break;
                                }
                            }
                        }
                        const staticInfo = pagePath ? await (0, _getPageStaticInfo).getPageStaticInfo({
                            pageFilePath: _path.default.join((pageType === "pages" ? pagesDir : appDir) || "", pagePath),
                            nextConfig: config,
                            pageType
                        }) : undefined;
                        const pageRuntime = staticInfo == null ? void 0 : staticInfo.runtime;
                        isServerComponent = pageType === "app" && (staticInfo == null ? void 0 : staticInfo.rsc) !== _constants1.RSC_MODULE_TYPES.client;
                        if (pageType === "app" || !(0, _utils1).isReservedPage(page)) {
                            try {
                                let edgeInfo;
                                if ((0, _isEdgeRuntime).isEdgeRuntime(pageRuntime)) {
                                    if (pageType === "app") {
                                        edgeRuntimeAppCount++;
                                    } else {
                                        edgeRuntimePagesCount++;
                                    }
                                    const manifestKey = pageType === "pages" ? page : originalAppPath || "";
                                    edgeInfo = middlewareManifest.functions[manifestKey];
                                }
                                let isPageStaticSpan = checkPageSpan.traceChild("is-page-static");
                                let workerResult = await isPageStaticSpan.traceAsyncFn(()=>{
                                    var ref, ref5;
                                    return staticWorkers.isPageStatic({
                                        page,
                                        originalAppPath,
                                        distDir,
                                        configFileName,
                                        runtimeEnvConfig,
                                        httpAgentOptions: config.httpAgentOptions,
                                        enableUndici: config.experimental.enableUndici,
                                        locales: (ref = config.i18n) == null ? void 0 : ref.locales,
                                        defaultLocale: (ref5 = config.i18n) == null ? void 0 : ref5.defaultLocale,
                                        parentId: isPageStaticSpan.id,
                                        pageRuntime,
                                        edgeInfo,
                                        pageType,
                                        hasServerComponents: !!appDir,
                                        incrementalCacheHandlerPath: config.experimental.incrementalCacheHandlerPath,
                                        isrFlushToDisk: config.experimental.isrFlushToDisk,
                                        maxMemoryCacheSize: config.experimental.isrMemoryCacheSize,
                                        nextConfigOutput: config.output
                                    });
                                });
                                if (pageType === "app" && originalAppPath) {
                                    appNormalizedPaths.set(originalAppPath, page);
                                    // TODO-APP: handle prerendering with edge
                                    if ((0, _isEdgeRuntime).isEdgeRuntime(pageRuntime)) {
                                        isStatic = false;
                                        isSsg = false;
                                    } else {
                                        // If a page has action and it is static, we need to
                                        // change it to SSG to keep the worker created.
                                        // TODO: This is a workaround for now, we should have a
                                        // dedicated worker defined in a heuristic way.
                                        const hasAction = entriesWithAction == null ? void 0 : entriesWithAction.has("app" + originalAppPath);
                                        if (workerResult.encodedPrerenderRoutes && workerResult.prerenderRoutes) {
                                            appStaticPaths.set(originalAppPath, workerResult.prerenderRoutes);
                                            appStaticPathsEncoded.set(originalAppPath, workerResult.encodedPrerenderRoutes);
                                            ssgPageRoutes = workerResult.prerenderRoutes;
                                            isSsg = true;
                                        }
                                        const appConfig = workerResult.appConfig || {};
                                        if (appConfig.revalidate !== 0 && !hasAction) {
                                            var ref6;
                                            const isDynamic = (0, _utils).isDynamicRoute(page);
                                            const hasGenerateStaticParams = !!((ref6 = workerResult.prerenderRoutes) == null ? void 0 : ref6.length);
                                            if (// Mark the app as static if:
                                            // - It has no dynamic param
                                            // - It doesn't have generateStaticParams but `dynamic` is set to
                                            //   `error` or `force-static`
                                            !isDynamic) {
                                                appStaticPaths.set(originalAppPath, [
                                                    page
                                                ]);
                                                appStaticPathsEncoded.set(originalAppPath, [
                                                    page
                                                ]);
                                                isStatic = true;
                                            } else if (isDynamic && !hasGenerateStaticParams && (appConfig.dynamic === "error" || appConfig.dynamic === "force-static")) {
                                                appStaticPaths.set(originalAppPath, []);
                                                appStaticPathsEncoded.set(originalAppPath, []);
                                                isStatic = true;
                                            }
                                        }
                                        if (workerResult.prerenderFallback) {
                                            // whether or not to allow requests for paths not
                                            // returned from generateStaticParams
                                            appDynamicParamPaths.add(originalAppPath);
                                        }
                                        appDefaultConfigs.set(originalAppPath, appConfig);
                                    }
                                } else {
                                    if ((0, _isEdgeRuntime).isEdgeRuntime(pageRuntime)) {
                                        if (workerResult.hasStaticProps) {
                                            console.warn(`"getStaticProps" is not yet supported fully with "experimental-edge", detected on ${page}`);
                                        }
                                        // TODO: add handling for statically rendering edge
                                        // pages and allow edge with Prerender outputs
                                        workerResult.isStatic = false;
                                        workerResult.hasStaticProps = false;
                                    }
                                    if (workerResult.isStatic === false && (workerResult.isHybridAmp || workerResult.isAmpOnly)) {
                                        hasSsrAmpPages = true;
                                    }
                                    if (workerResult.isHybridAmp) {
                                        isHybridAmp = true;
                                        hybridAmpPages.add(page);
                                    }
                                    if (workerResult.isNextImageImported) {
                                        isNextImageImported = true;
                                    }
                                    if (workerResult.hasStaticProps) {
                                        ssgPages.add(page);
                                        isSsg = true;
                                        if (workerResult.prerenderRoutes && workerResult.encodedPrerenderRoutes) {
                                            additionalSsgPaths.set(page, workerResult.prerenderRoutes);
                                            additionalSsgPathsEncoded.set(page, workerResult.encodedPrerenderRoutes);
                                            ssgPageRoutes = workerResult.prerenderRoutes;
                                        }
                                        if (workerResult.prerenderFallback === "blocking") {
                                            ssgBlockingFallbackPages.add(page);
                                        } else if (workerResult.prerenderFallback === true) {
                                            ssgStaticFallbackPages.add(page);
                                        }
                                    } else if (workerResult.hasServerProps) {
                                        serverPropsPages.add(page);
                                    } else if (workerResult.isStatic && !isServerComponent && await customAppGetInitialPropsPromise === false) {
                                        staticPages1.add(page);
                                        isStatic = true;
                                    } else if (isServerComponent) {
                                        // This is a static server component page that doesn't have
                                        // gSP or gSSP. We still treat it as a SSG page.
                                        ssgPages.add(page);
                                        isSsg = true;
                                    }
                                    if (hasPages404 && page === "/404") {
                                        if (!workerResult.isStatic && !workerResult.hasStaticProps) {
                                            throw new Error(`\`pages/404\` ${_constants.STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR}`);
                                        }
                                        // we need to ensure the 404 lambda is present since we use
                                        // it when _app has getInitialProps
                                        if (await customAppGetInitialPropsPromise && !workerResult.hasStaticProps) {
                                            staticPages1.delete(page);
                                        }
                                    }
                                    if (_constants1.STATIC_STATUS_PAGES.includes(page) && !workerResult.isStatic && !workerResult.hasStaticProps) {
                                        throw new Error(`\`pages${page}\` ${_constants.STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR}`);
                                    }
                                }
                            } catch (err) {
                                if (!(0, _isError).default(err) || err.message !== "INVALID_DEFAULT_EXPORT") throw err;
                                invalidPages.add(page);
                            }
                        }
                        if (pageType === "app") {
                            if (isSsg || isStatic) {
                                staticAppPagesCount++;
                            } else {
                                serverAppPagesCount++;
                            }
                        }
                        pageInfos.set(page, {
                            size: selfSize,
                            totalSize: allSize,
                            static: isStatic,
                            isSsg,
                            isHybridAmp,
                            ssgPageRoutes,
                            initialRevalidateSeconds: false,
                            runtime: pageRuntime,
                            pageDuration: undefined,
                            ssgPageDurations: undefined
                        });
                    });
                }));
                const errorPageResult = await errorPageStaticResult;
                const nonStaticErrorPage = await errorPageHasCustomGetInitialProps || errorPageResult && errorPageResult.hasServerProps;
                const returnValue = {
                    customAppGetInitialProps: await customAppGetInitialPropsPromise,
                    namedExports: await namedExportsPromise,
                    isNextImageImported,
                    hasSsrAmpPages,
                    hasNonStaticErrorPage: nonStaticErrorPage
                };
                if (!sharedPool) staticWorkers.end();
                return returnValue;
            });
            await runTurbotrace(staticPages1);
            if (customAppGetInitialProps) {
                console.warn(_chalk.default.bold.yellow(`Warning: `) + _chalk.default.yellow(`You have opted-out of Automatic Static Optimization due to \`getInitialProps\` in \`pages/_app\`. This does not opt-out pages with \`getStaticProps\``));
                console.warn("Read more: https://nextjs.org/docs/messages/opt-out-auto-static-optimization\n");
            }
            if (!hasSsrAmpPages1) {
                requiredServerFiles.ignore.push(_path.default.relative(dir, _path.default.join(_path.default.dirname(require.resolve("next/dist/compiled/@ampproject/toolbox-optimizer")), "**/*")));
            }
            const nextServerTraceOutput = _path.default.join(distDir, "next-server.js.nft.json");
            if (config.outputFileTracing) {
                let nodeFileTrace;
                if (config.experimental.turbotrace) {
                    if (!(binding == null ? void 0 : binding.isWasm)) {
                        nodeFileTrace = binding.turbo.startTrace;
                    }
                }
                if (!nodeFileTrace) {
                    nodeFileTrace = require("next/dist/compiled/@vercel/nft").nodeFileTrace;
                }
                const includeExcludeSpan = nextBuildSpan.traceChild("apply-include-excludes");
                const resolvedTraceIncludes = new Map();
                const { outputFileTracingIncludes ={} , outputFileTracingExcludes ={} ,  } = config.experimental;
                const includeGlobKeys = Object.keys(outputFileTracingIncludes);
                const excludeGlobKeys = Object.keys(outputFileTracingExcludes);
                await includeExcludeSpan.traceAsyncFn(async ()=>{
                    const globOrig = require("next/dist/compiled/glob");
                    const glob = (pattern)=>{
                        return new Promise((resolve, reject)=>{
                            globOrig(pattern, {
                                cwd: dir,
                                nodir: true,
                                dot: true
                            }, (err, files)=>{
                                if (err) {
                                    return reject(err);
                                }
                                resolve(files);
                            });
                        });
                    };
                    if (config.outputFileTracing) {
                        for (let page of pageKeys.pages){
                            const combinedIncludes = new Set();
                            const combinedExcludes = new Set();
                            page = (0, _normalizePagePath).normalizePagePath(page);
                            for (const curGlob of includeGlobKeys){
                                if ((0, _micromatch).isMatch(page, [
                                    curGlob
                                ])) {
                                    outputFileTracingIncludes[curGlob].forEach((include)=>{
                                        combinedIncludes.add(include);
                                    });
                                }
                            }
                            for (const curGlob1 of excludeGlobKeys){
                                if ((0, _micromatch).isMatch(page, [
                                    curGlob1
                                ])) {
                                    outputFileTracingExcludes[curGlob1].forEach((exclude)=>{
                                        combinedExcludes.add(exclude);
                                    });
                                }
                            }
                            if (!(combinedIncludes == null ? void 0 : combinedIncludes.size) && !(combinedExcludes == null ? void 0 : combinedExcludes.size)) {
                                continue;
                            }
                            const traceFile = _path.default.join(distDir, "server/pages", `${page}.js.nft.json`);
                            const pageDir = _path.default.dirname(traceFile);
                            const traceContent = JSON.parse(await _fs.promises.readFile(traceFile, "utf8"));
                            const includes = [];
                            if (combinedIncludes == null ? void 0 : combinedIncludes.size) {
                                await Promise.all([
                                    ...combinedIncludes
                                ].map(async (includeGlob)=>{
                                    const results = await glob(includeGlob);
                                    const resolvedInclude = resolvedTraceIncludes.get(includeGlob) || [
                                        ...results.map((file)=>{
                                            return _path.default.relative(pageDir, _path.default.join(dir, file));
                                        }), 
                                    ];
                                    includes.push(...resolvedInclude);
                                    resolvedTraceIncludes.set(includeGlob, resolvedInclude);
                                }));
                            }
                            const combined = new Set([
                                ...traceContent.files,
                                ...includes
                            ]);
                            if (combinedExcludes == null ? void 0 : combinedExcludes.size) {
                                const resolvedGlobs = [
                                    ...combinedExcludes
                                ].map((exclude)=>_path.default.join(dir, exclude));
                                combined.forEach((file)=>{
                                    if ((0, _micromatch).isMatch(_path.default.join(pageDir, file), resolvedGlobs)) {
                                        combined.delete(file);
                                    }
                                });
                            }
                            await _fs.promises.writeFile(traceFile, JSON.stringify({
                                version: traceContent.version,
                                files: [
                                    ...combined
                                ]
                            }));
                        }
                    }
                });
                await nextBuildSpan.traceChild("trace-next-server").traceAsyncFn(async ()=>{
                    var ref, ref9;
                    let cacheKey;
                    // consider all lockFiles in tree in case user accidentally
                    // has both package-lock.json and yarn.lock
                    const lockFiles = (await Promise.all([
                        "package-lock.json",
                        "yarn.lock",
                        "pnpm-lock.yaml"
                    ].map((file)=>(0, _findUp).default(file, {
                            cwd: dir
                        })))).filter(Boolean)// TypeScript doesn't like this filter
                    ;
                    const cachedTracePath = _path.default.join(distDir, "cache/next-server.js.nft.json");
                    if (lockFiles.length > 0 && // we can't leverage trace cache if this is configured
                    // currently unless we break this to a separate trace
                    // file
                    !config.experimental.incrementalCacheHandlerPath) {
                        const cacheHash = require("crypto").createHash("sha256");
                        cacheHash.update(require("next/package").version);
                        cacheHash.update(hasSsrAmpPages1 + "");
                        cacheHash.update(ciEnvironment.hasNextSupport + "");
                        await Promise.all(lockFiles.map(async (lockFile)=>{
                            cacheHash.update(await _fs.promises.readFile(lockFile));
                        }));
                        cacheKey = cacheHash.digest("hex");
                        try {
                            const existingTrace = JSON.parse(await _fs.promises.readFile(cachedTracePath, "utf8"));
                            if (existingTrace.cacheKey === cacheKey) {
                                await _fs.promises.copyFile(cachedTracePath, nextServerTraceOutput);
                                return;
                            }
                        } catch (_) {}
                    }
                    const root = ((ref = config.experimental) == null ? void 0 : (ref9 = ref.turbotrace) == null ? void 0 : ref9.contextDirectory) ?? outputFileTracingRoot;
                    const nextServerEntry = require.resolve("next/dist/server/next-server");
                    const toTrace = [
                        nextServerEntry
                    ];
                    // ensure we trace any dependencies needed for custom
                    // incremental cache handler
                    if (config.experimental.incrementalCacheHandlerPath) {
                        toTrace.push(require.resolve(config.experimental.incrementalCacheHandlerPath));
                    }
                    let serverResult;
                    const additionalIgnores = new Set();
                    for (const glob of excludeGlobKeys){
                        if ((0, _micromatch).isMatch("next-server", glob)) {
                            outputFileTracingExcludes[glob].forEach((exclude)=>{
                                additionalIgnores.add(exclude);
                            });
                        }
                    }
                    const ignores = [
                        "**/*.d.ts",
                        "**/*.map",
                        "**/next/dist/pages/**/*",
                        "**/next/dist/compiled/jest-worker/**/*",
                        "**/next/dist/compiled/webpack/(bundle4|bundle5).js",
                        "**/node_modules/webpack5/**/*",
                        "**/next/dist/server/lib/squoosh/**/*.wasm",
                        "**/next/dist/server/lib/route-resolver*",
                        ...ciEnvironment.hasNextSupport ? [
                            // only ignore image-optimizer code when
                            // this is being handled outside of next-server
                            "**/next/dist/server/image-optimizer.js",
                            "**/node_modules/sharp/**/*", 
                        ] : [],
                        ...!hasSsrAmpPages1 ? [
                            "**/next/dist/compiled/@ampproject/toolbox-optimizer/**/*"
                        ] : [],
                        ...additionalIgnores, 
                    ];
                    const ignoreFn = (pathname)=>{
                        if (_path.default.isAbsolute(pathname) && !pathname.startsWith(root)) {
                            return true;
                        }
                        return (0, _micromatch).isMatch(pathname, ignores, {
                            contains: true,
                            dot: true
                        });
                    };
                    const traceContext = _path.default.join(nextServerEntry, "..", "..");
                    const tracedFiles = new Set();
                    if (config.experimental.turbotrace) {
                        const files = await nodeFileTrace({
                            action: "print",
                            input: toTrace,
                            contextDirectory: traceContext,
                            logLevel: config.experimental.turbotrace.logLevel,
                            processCwd: config.experimental.turbotrace.processCwd,
                            logDetail: config.experimental.turbotrace.logDetail,
                            showAll: config.experimental.turbotrace.logAll
                        }, turboTasksForTrace);
                        for (const file of files){
                            if (!ignoreFn(_path.default.join(traceContext, file))) {
                                tracedFiles.add(_path.default.relative(distDir, _path.default.join(traceContext, file)).replace(/\\/g, "/"));
                            }
                        }
                    } else {
                        serverResult = await nodeFileTrace(toTrace, {
                            base: root,
                            processCwd: dir,
                            ignore: ignoreFn
                        });
                        serverResult.fileList.forEach((file)=>{
                            tracedFiles.add(_path.default.relative(distDir, _path.default.join(root, file)).replace(/\\/g, "/"));
                        });
                    }
                    await _fs.promises.writeFile(nextServerTraceOutput, JSON.stringify({
                        version: 1,
                        cacheKey,
                        files: Array.from(tracedFiles)
                    }));
                    await _fs.promises.unlink(cachedTracePath).catch(()=>{});
                    await _fs.promises.copyFile(nextServerTraceOutput, cachedTracePath).catch(()=>{});
                });
            }
            if (serverPropsPages.size > 0 || ssgPages.size > 0) {
                // We update the routes manifest after the build with the
                // data routes since we can't determine these until after build
                routesManifest.dataRoutes = (0, _utils).getSortedRoutes([
                    ...serverPropsPages,
                    ...ssgPages, 
                ]).map((page)=>{
                    const pagePath = (0, _normalizePagePath).normalizePagePath(page);
                    const dataRoute = _path.default.posix.join("/_next/data", buildId, `${pagePath}.json`);
                    let dataRouteRegex;
                    let namedDataRouteRegex;
                    let routeKeys;
                    if ((0, _utils).isDynamicRoute(page)) {
                        const routeRegex = (0, _routeRegex).getNamedRouteRegex(dataRoute.replace(/\.json$/, ""), true);
                        dataRouteRegex = (0, _loadCustomRoutes).normalizeRouteRegex(routeRegex.re.source.replace(/\(\?:\\\/\)\?\$$/, `\\.json$`));
                        namedDataRouteRegex = routeRegex.namedRegex.replace(/\(\?:\/\)\?\$$/, `\\.json$`);
                        routeKeys = routeRegex.routeKeys;
                    } else {
                        dataRouteRegex = (0, _loadCustomRoutes).normalizeRouteRegex(new RegExp(`^${_path.default.posix.join("/_next/data", (0, _escapeRegexp).escapeStringRegexp(buildId), `${pagePath}.json`)}$`).source);
                    }
                    return {
                        page,
                        routeKeys,
                        dataRouteRegex,
                        namedDataRouteRegex
                    };
                });
                await _fs.promises.writeFile(routesManifestPath, JSON.stringify(routesManifest), "utf8");
            }
            // Since custom _app.js can wrap the 404 page we have to opt-out of static optimization if it has getInitialProps
            // Only export the static 404 when there is no /_error present
            const useStatic404 = !customAppGetInitialProps && (!hasNonStaticErrorPage || hasPages404 || hasApp404);
            if (invalidPages.size > 0) {
                const err = new Error(`Build optimization failed: found page${invalidPages.size === 1 ? "" : "s"} without a React Component as default export in \n${[
                    ...invalidPages
                ].map((pg)=>`pages${pg}`).join("\n")}\n\nSee https://nextjs.org/docs/messages/page-without-valid-component for more info.\n`);
                err.code = "BUILD_OPTIMIZATION_FAILED";
                throw err;
            }
            await (0, _writeBuildId).writeBuildId(distDir, buildId);
            if (config.experimental.optimizeCss) {
                const globOrig = require("next/dist/compiled/glob");
                const cssFilePaths = await new Promise((resolve, reject)=>{
                    globOrig("**/*.css", {
                        cwd: _path.default.join(distDir, "static")
                    }, (err, files)=>{
                        if (err) {
                            return reject(err);
                        }
                        resolve(files);
                    });
                });
                requiredServerFiles.files.push(...cssFilePaths.map((filePath)=>_path.default.join(config.distDir, "static", filePath)));
            }
            const features = [
                {
                    featureName: "experimental/optimizeCss",
                    invocationCount: config.experimental.optimizeCss ? 1 : 0
                },
                {
                    featureName: "experimental/nextScriptWorkers",
                    invocationCount: config.experimental.nextScriptWorkers ? 1 : 0
                },
                {
                    featureName: "optimizeFonts",
                    invocationCount: config.optimizeFonts ? 1 : 0
                }, 
            ];
            telemetry.record(features.map((feature)=>{
                return {
                    eventName: _events.EVENT_BUILD_FEATURE_USAGE,
                    payload: feature
                };
            }));
            await _fs.promises.writeFile(_path.default.join(distDir, _constants1.SERVER_FILES_MANIFEST), JSON.stringify(requiredServerFiles), "utf8");
            const middlewareManifest1 = JSON.parse(await _fs.promises.readFile(_path.default.join(distDir, _constants1.SERVER_DIRECTORY, _constants1.MIDDLEWARE_MANIFEST), "utf8"));
            if (config.output === "standalone") {
                await nextBuildSpan.traceChild("copy-traced-files").traceAsyncFn(async ()=>{
                    await (0, _utils1).copyTracedFiles(dir, distDir, pageKeys.pages, denormalizedAppPages, outputFileTracingRoot, requiredServerFiles.config, middlewareManifest1);
                });
            }
            const finalPrerenderRoutes = {};
            const finalDynamicRoutes = {};
            const tbdPrerenderRoutes = [];
            let ssgNotFoundPaths = [];
            if (postCompileSpinner) postCompileSpinner.stopAndPersist();
            const { i18n  } = config;
            const usedStaticStatusPages = _constants1.STATIC_STATUS_PAGES.filter((page)=>mappedPages[page] && mappedPages[page].startsWith("private-next-pages"));
            usedStaticStatusPages.forEach((page)=>{
                if (!ssgPages.has(page) && !customAppGetInitialProps) {
                    staticPages1.add(page);
                }
            });
            const hasPages500 = usedStaticStatusPages.includes("/500");
            const useDefaultStatic500 = !hasPages500 && !hasNonStaticErrorPage && !customAppGetInitialProps;
            const combinedPages = [
                ...staticPages1,
                ...ssgPages
            ];
            // we need to trigger automatic exporting when we have
            // - static 404/500
            // - getStaticProps paths
            // - experimental app is enabled
            if (combinedPages.length > 0 || useStatic404 || useDefaultStatic500 || isAppDirEnabled) {
                const staticGenerationSpan = nextBuildSpan.traceChild("static-generation");
                await staticGenerationSpan.traceAsyncFn(async ()=>{
                    (0, _utils1).detectConflictingPaths([
                        ...combinedPages,
                        ...pageKeys.pages.filter((page)=>!combinedPages.includes(page)), 
                    ], ssgPages, additionalSsgPaths);
                    const exportApp = require("../export").default;
                    const exportConfig = {
                        ...config,
                        initialPageRevalidationMap: {},
                        initialPageMetaMap: {},
                        pageDurationMap: {},
                        ssgNotFoundPaths: [],
                        // Default map will be the collection of automatic statically exported
                        // pages and incremental pages.
                        // n.b. we cannot handle this above in combinedPages because the dynamic
                        // page must be in the `pages` array, but not in the mapping.
                        exportPathMap: (defaultMap)=>{
                            // Dynamically routed pages should be prerendered to be used as
                            // a client-side skeleton (fallback) while data is being fetched.
                            // This ensures the end-user never sees a 500 or slow response from the
                            // server.
                            //
                            // Note: prerendering disables automatic static optimization.
                            ssgPages.forEach((page)=>{
                                if ((0, _utils).isDynamicRoute(page)) {
                                    tbdPrerenderRoutes.push(page);
                                    if (ssgStaticFallbackPages.has(page)) {
                                        // Override the rendering for the dynamic page to be treated as a
                                        // fallback render.
                                        if (i18n) {
                                            defaultMap[`/${i18n.defaultLocale}${page}`] = {
                                                page,
                                                query: {
                                                    __nextFallback: "true"
                                                }
                                            };
                                        } else {
                                            defaultMap[page] = {
                                                page,
                                                query: {
                                                    __nextFallback: "true"
                                                }
                                            };
                                        }
                                    } else {
                                        // Remove dynamically routed pages from the default path map when
                                        // fallback behavior is disabled.
                                        delete defaultMap[page];
                                    }
                                }
                            });
                            // Append the "well-known" routes we should prerender for, e.g. blog
                            // post slugs.
                            additionalSsgPaths.forEach((routes, page)=>{
                                const encodedRoutes = additionalSsgPathsEncoded.get(page);
                                routes.forEach((route, routeIdx)=>{
                                    defaultMap[route] = {
                                        page,
                                        query: {
                                            __nextSsgPath: encodedRoutes == null ? void 0 : encodedRoutes[routeIdx]
                                        }
                                    };
                                });
                            });
                            if (useStatic404) {
                                defaultMap["/404"] = {
                                    page: hasPages404 ? "/404" : "/_error"
                                };
                            }
                            if (useDefaultStatic500) {
                                defaultMap["/500"] = {
                                    page: "/_error"
                                };
                            }
                            // TODO: output manifest specific to app paths and their
                            // revalidate periods and dynamicParams settings
                            appStaticPaths.forEach((routes, originalAppPath)=>{
                                const encodedRoutes = appStaticPathsEncoded.get(originalAppPath);
                                const appConfig = appDefaultConfigs.get(originalAppPath) || {};
                                routes.forEach((route, routeIdx)=>{
                                    defaultMap[route] = {
                                        page: originalAppPath,
                                        query: {
                                            __nextSsgPath: encodedRoutes == null ? void 0 : encodedRoutes[routeIdx]
                                        },
                                        _isDynamicError: appConfig.dynamic === "error",
                                        _isAppDir: true
                                    };
                                });
                            });
                            if (i18n) {
                                for (const page of [
                                    ...staticPages1,
                                    ...ssgPages,
                                    ...useStatic404 ? [
                                        "/404"
                                    ] : [],
                                    ...useDefaultStatic500 ? [
                                        "/500"
                                    ] : [], 
                                ]){
                                    const isSsg = ssgPages.has(page);
                                    const isDynamic = (0, _utils).isDynamicRoute(page);
                                    const isFallback = isSsg && ssgStaticFallbackPages.has(page);
                                    for (const locale of i18n.locales){
                                        var ref;
                                        // skip fallback generation for SSG pages without fallback mode
                                        if (isSsg && isDynamic && !isFallback) continue;
                                        const outputPath = `/${locale}${page === "/" ? "" : page}`;
                                        defaultMap[outputPath] = {
                                            page: ((ref = defaultMap[page]) == null ? void 0 : ref.page) || page,
                                            query: {
                                                __nextLocale: locale,
                                                __nextFallback: isFallback ? "true" : undefined
                                            }
                                        };
                                    }
                                    if (isSsg) {
                                        // remove non-locale prefixed variant from defaultMap
                                        delete defaultMap[page];
                                    }
                                }
                            }
                            return defaultMap;
                        }
                    };
                    const exportOptions = {
                        isInvokedFromCli: false,
                        nextConfig: exportConfig,
                        hasAppDir,
                        silent: false,
                        buildExport: true,
                        debugOutput,
                        threads: config.experimental.cpus,
                        pages: combinedPages,
                        outdir: _path.default.join(distDir, "export"),
                        statusMessage: "Generating static pages",
                        exportPageWorker: sharedPool ? staticWorkers.exportPage.bind(staticWorkers) : undefined,
                        endWorker: sharedPool ? async ()=>{
                            await staticWorkers.end();
                        } : undefined
                    };
                    await exportApp(dir, exportOptions, nextBuildSpan);
                    const postBuildSpinner = (0, _spinner).default({
                        prefixText: `${Log.prefixes.info} Finalizing page optimization`
                    });
                    ssgNotFoundPaths = exportConfig.ssgNotFoundPaths;
                    // remove server bundles that were exported
                    for (const page2 of staticPages1){
                        const serverBundle = (0, _require).getPagePath(page2, distDir, undefined, false);
                        await _fs.promises.unlink(serverBundle);
                    }
                    for (const [originalAppPath1, routes1] of appStaticPaths){
                        const page = appNormalizedPaths.get(originalAppPath1) || "";
                        const appConfig = appDefaultConfigs.get(originalAppPath1) || {};
                        let hasDynamicData = appConfig.revalidate === 0 || exportConfig.initialPageRevalidationMap[page] === 0;
                        const isRouteHandler = (0, _isAppRouteRoute).isAppRouteRoute(originalAppPath1);
                        routes1.forEach((route)=>{
                            if ((0, _utils).isDynamicRoute(page) && route === page) return;
                            if (route === "/_not-found") return;
                            let revalidate = exportConfig.initialPageRevalidationMap[route];
                            if (typeof revalidate === "undefined") {
                                revalidate = typeof appConfig.revalidate !== "undefined" ? appConfig.revalidate : false;
                            }
                            // ensure revalidate is normalized correctly
                            if (typeof revalidate !== "number" && typeof revalidate !== "boolean") {
                                revalidate = false;
                            }
                            if (revalidate !== 0) {
                                const normalizedRoute = (0, _normalizePagePath).normalizePagePath(route);
                                const dataRoute = isRouteHandler ? null : _path.default.posix.join(`${normalizedRoute}.rsc`);
                                const routeMeta = {};
                                if (isRouteHandler) {
                                    const exportRouteMeta = exportConfig.initialPageMetaMap[route] || {};
                                    if (exportRouteMeta.status !== 200) {
                                        routeMeta.initialStatus = exportRouteMeta.status;
                                    }
                                    if (Object.keys(exportRouteMeta.headers).length) {
                                        routeMeta.initialHeaders = exportRouteMeta.headers;
                                    }
                                }
                                finalPrerenderRoutes[route] = {
                                    ...routeMeta,
                                    initialRevalidateSeconds: revalidate,
                                    srcRoute: page,
                                    dataRoute
                                };
                            } else {
                                hasDynamicData = true;
                                // we might have determined during prerendering that this page
                                // used dynamic data
                                pageInfos.set(route, {
                                    ...pageInfos.get(route),
                                    isSsg: false,
                                    static: false
                                });
                            }
                        });
                        if (!hasDynamicData && (0, _utils).isDynamicRoute(originalAppPath1)) {
                            const normalizedRoute = (0, _normalizePagePath).normalizePagePath(page);
                            const dataRoute = _path.default.posix.join(`${normalizedRoute}.rsc`);
                            // TODO: create a separate manifest to allow enforcing
                            // dynamicParams for non-static paths?
                            finalDynamicRoutes[page] = {
                                routeRegex: (0, _loadCustomRoutes).normalizeRouteRegex((0, _routeRegex).getNamedRouteRegex(page, false).re.source),
                                dataRoute,
                                // if dynamicParams are enabled treat as fallback:
                                // 'blocking' if not it's fallback: false
                                fallback: appDynamicParamPaths.has(originalAppPath1) ? null : false,
                                dataRouteRegex: isRouteHandler ? null : (0, _loadCustomRoutes).normalizeRouteRegex((0, _routeRegex).getNamedRouteRegex(dataRoute.replace(/\.rsc$/, ""), false).re.source.replace(/\(\?:\\\/\)\?\$$/, "\\.rsc$"))
                            };
                        }
                    }
                    const moveExportedPage = async (originPage, page, file, isSsg, ext, additionalSsgFile = false)=>{
                        return staticGenerationSpan.traceChild("move-exported-page").traceAsyncFn(async ()=>{
                            file = `${file}.${ext}`;
                            const orig = _path.default.join(exportOptions.outdir, file);
                            const pagePath = (0, _require).getPagePath(originPage, distDir, undefined, false);
                            const relativeDest = _path.default.relative(_path.default.join(distDir, _constants1.SERVER_DIRECTORY), _path.default.join(_path.default.join(pagePath, // strip leading / and then recurse number of nested dirs
                            // to place from base folder
                            originPage.slice(1).split("/").map(()=>"..").join("/")), file)).replace(/\\/g, "/");
                            if (!isSsg && !// don't add static status page to manifest if it's
                            // the default generated version e.g. no pages/500
                            (_constants1.STATIC_STATUS_PAGES.includes(page) && !usedStaticStatusPages.includes(page))) {
                                pagesManifest[page] = relativeDest;
                            }
                            const dest = _path.default.join(distDir, _constants1.SERVER_DIRECTORY, relativeDest);
                            const isNotFound = ssgNotFoundPaths.includes(page);
                            // for SSG files with i18n the non-prerendered variants are
                            // output with the locale prefixed so don't attempt moving
                            // without the prefix
                            if ((!i18n || additionalSsgFile) && !isNotFound) {
                                await _fs.promises.mkdir(_path.default.dirname(dest), {
                                    recursive: true
                                });
                                await _fs.promises.rename(orig, dest);
                            } else if (i18n && !isSsg) {
                                // this will be updated with the locale prefixed variant
                                // since all files are output with the locale prefix
                                delete pagesManifest[page];
                            }
                            if (i18n) {
                                if (additionalSsgFile) return;
                                for (const locale of i18n.locales){
                                    const curPath = `/${locale}${page === "/" ? "" : page}`;
                                    const localeExt = page === "/" ? _path.default.extname(file) : "";
                                    const relativeDestNoPages = relativeDest.slice("pages/".length);
                                    if (isSsg && ssgNotFoundPaths.includes(curPath)) {
                                        continue;
                                    }
                                    const updatedRelativeDest = _path.default.join("pages", locale + localeExt, // if it's the top-most index page we want it to be locale.EXT
                                    // instead of locale/index.html
                                    page === "/" ? "" : relativeDestNoPages).replace(/\\/g, "/");
                                    const updatedOrig = _path.default.join(exportOptions.outdir, locale + localeExt, page === "/" ? "" : file);
                                    const updatedDest = _path.default.join(distDir, _constants1.SERVER_DIRECTORY, updatedRelativeDest);
                                    if (!isSsg) {
                                        pagesManifest[curPath] = updatedRelativeDest;
                                    }
                                    await _fs.promises.mkdir(_path.default.dirname(updatedDest), {
                                        recursive: true
                                    });
                                    await _fs.promises.rename(updatedOrig, updatedDest);
                                }
                            }
                        });
                    };
                    async function moveExportedAppNotFoundTo404() {
                        return staticGenerationSpan.traceChild("move-exported-app-not-found-").traceAsyncFn(async ()=>{
                            const orig = _path.default.join(distDir, "server", "app", "_not-found.html");
                            const updatedRelativeDest = _path.default.join("pages", "404.html").replace(/\\/g, "/");
                            if (await (0, _fileExists).fileExists(orig)) {
                                await _fs.promises.copyFile(orig, _path.default.join(distDir, "server", updatedRelativeDest));
                                pagesManifest["/404"] = updatedRelativeDest;
                            }
                        });
                    }
                    // If there's /not-found inside app, we prefer it over the pages 404
                    if (hasApp404 && useStatic404) {
                        // await moveExportedPage('/_error', '/404', '/404', false, 'html')
                        await moveExportedAppNotFoundTo404();
                    } else {
                        // Only move /404 to /404 when there is no custom 404 as in that case we don't know about the 404 page
                        if (!hasPages404 && useStatic404) {
                            await moveExportedPage("/_error", "/404", "/404", false, "html");
                        }
                    }
                    if (useDefaultStatic500) {
                        await moveExportedPage("/_error", "/500", "/500", false, "html");
                    }
                    for (const page1 of combinedPages){
                        const isSsg = ssgPages.has(page1);
                        const isStaticSsgFallback = ssgStaticFallbackPages.has(page1);
                        const isDynamic = (0, _utils).isDynamicRoute(page1);
                        const hasAmp = hybridAmpPages.has(page1);
                        const file = (0, _normalizePagePath).normalizePagePath(page1);
                        const pageInfo = pageInfos.get(page1);
                        const durationInfo = exportConfig.pageDurationMap[page1];
                        if (pageInfo && durationInfo) {
                            // Set Build Duration
                            if (pageInfo.ssgPageRoutes) {
                                pageInfo.ssgPageDurations = pageInfo.ssgPageRoutes.map((pagePath)=>durationInfo[pagePath]);
                            }
                            pageInfo.pageDuration = durationInfo[page1];
                        }
                        // The dynamic version of SSG pages are only prerendered if the
                        // fallback is enabled. Below, we handle the specific prerenders
                        // of these.
                        const hasHtmlOutput = !(isSsg && isDynamic && !isStaticSsgFallback);
                        if (hasHtmlOutput) {
                            await moveExportedPage(page1, page1, file, isSsg, "html");
                        }
                        if (hasAmp && (!isSsg || isSsg && !isDynamic)) {
                            const ampPage = `${file}.amp`;
                            await moveExportedPage(page1, ampPage, ampPage, isSsg, "html");
                            if (isSsg) {
                                await moveExportedPage(page1, ampPage, ampPage, isSsg, "json");
                            }
                        }
                        if (isSsg) {
                            // For a non-dynamic SSG page, we must copy its data file
                            // from export, we already moved the HTML file above
                            if (!isDynamic) {
                                await moveExportedPage(page1, page1, file, isSsg, "json");
                                if (i18n) {
                                    // TODO: do we want to show all locale variants in build output
                                    for (const locale of i18n.locales){
                                        const localePage = `/${locale}${page1 === "/" ? "" : page1}`;
                                        finalPrerenderRoutes[localePage] = {
                                            initialRevalidateSeconds: exportConfig.initialPageRevalidationMap[localePage],
                                            srcRoute: null,
                                            dataRoute: _path.default.posix.join("/_next/data", buildId, `${file}.json`)
                                        };
                                    }
                                } else {
                                    finalPrerenderRoutes[page1] = {
                                        initialRevalidateSeconds: exportConfig.initialPageRevalidationMap[page1],
                                        srcRoute: null,
                                        dataRoute: _path.default.posix.join("/_next/data", buildId, `${file}.json`)
                                    };
                                }
                                // Set Page Revalidation Interval
                                if (pageInfo) {
                                    pageInfo.initialRevalidateSeconds = exportConfig.initialPageRevalidationMap[page1];
                                }
                            } else {
                                // For a dynamic SSG page, we did not copy its data exports and only
                                // copy the fallback HTML file (if present).
                                // We must also copy specific versions of this page as defined by
                                // `getStaticPaths` (additionalSsgPaths).
                                const extraRoutes = additionalSsgPaths.get(page1) || [];
                                for (const route of extraRoutes){
                                    const pageFile = (0, _normalizePagePath).normalizePagePath(route);
                                    await moveExportedPage(page1, route, pageFile, isSsg, "html", true);
                                    await moveExportedPage(page1, route, pageFile, isSsg, "json", true);
                                    if (hasAmp) {
                                        const ampPage = `${pageFile}.amp`;
                                        await moveExportedPage(page1, ampPage, ampPage, isSsg, "html", true);
                                        await moveExportedPage(page1, ampPage, ampPage, isSsg, "json", true);
                                    }
                                    finalPrerenderRoutes[route] = {
                                        initialRevalidateSeconds: exportConfig.initialPageRevalidationMap[route],
                                        srcRoute: page1,
                                        dataRoute: _path.default.posix.join("/_next/data", buildId, `${(0, _normalizePagePath).normalizePagePath(route)}.json`)
                                    };
                                    // Set route Revalidation Interval
                                    if (pageInfo) {
                                        pageInfo.initialRevalidateSeconds = exportConfig.initialPageRevalidationMap[route];
                                    }
                                }
                            }
                        }
                    }
                    // remove temporary export folder
                    await (0, _recursiveDelete).recursiveDelete(exportOptions.outdir);
                    await _fs.promises.rmdir(exportOptions.outdir);
                    await _fs.promises.writeFile(manifestPath, JSON.stringify(pagesManifest, null, 2), "utf8");
                    if (postBuildSpinner) postBuildSpinner.stopAndPersist();
                    console.log();
                });
            }
            // ensure the worker is not left hanging
            staticWorkers.close();
            const analysisEnd = process.hrtime(analysisBegin);
            telemetry.record((0, _events).eventBuildOptimize(pagesPaths, {
                durationInSeconds: analysisEnd[0],
                staticPageCount: staticPages1.size,
                staticPropsPageCount: ssgPages.size,
                serverPropsPageCount: serverPropsPages.size,
                ssrPageCount: pagesPaths.length - (staticPages1.size + ssgPages.size + serverPropsPages.size),
                hasStatic404: useStatic404,
                hasReportWebVitals: (namedExports == null ? void 0 : namedExports.includes("reportWebVitals")) ?? false,
                rewritesCount: combinedRewrites.length,
                headersCount: headers.length,
                redirectsCount: redirects.length - 1,
                headersWithHasCount: headers.filter((r)=>!!r.has).length,
                rewritesWithHasCount: combinedRewrites.filter((r)=>!!r.has).length,
                redirectsWithHasCount: redirects.filter((r)=>!!r.has).length,
                middlewareCount: Object.keys(rootPaths).length > 0 ? 1 : 0,
                totalAppPagesCount,
                staticAppPagesCount,
                serverAppPagesCount,
                edgeRuntimeAppCount,
                edgeRuntimePagesCount
            }));
            if (_buildContext.NextBuildContext.telemetryPlugin) {
                const events = (0, _events).eventBuildFeatureUsage(_buildContext.NextBuildContext.telemetryPlugin);
                telemetry.record(events);
                telemetry.record((0, _events).eventPackageUsedInGetServerSideProps(_buildContext.NextBuildContext.telemetryPlugin));
            }
            if (ssgPages.size > 0 || appDir) {
                var ref2;
                tbdPrerenderRoutes.forEach((tbdRoute)=>{
                    const normalizedRoute = (0, _normalizePagePath).normalizePagePath(tbdRoute);
                    const dataRoute = _path.default.posix.join("/_next/data", buildId, `${normalizedRoute}.json`);
                    finalDynamicRoutes[tbdRoute] = {
                        routeRegex: (0, _loadCustomRoutes).normalizeRouteRegex((0, _routeRegex).getNamedRouteRegex(tbdRoute, false).re.source),
                        dataRoute,
                        fallback: ssgBlockingFallbackPages.has(tbdRoute) ? null : ssgStaticFallbackPages.has(tbdRoute) ? `${normalizedRoute}.html` : false,
                        dataRouteRegex: (0, _loadCustomRoutes).normalizeRouteRegex((0, _routeRegex).getNamedRouteRegex(dataRoute.replace(/\.json$/, ""), false).re.source.replace(/\(\?:\\\/\)\?\$$/, "\\.json$"))
                    };
                });
                const prerenderManifest = {
                    version: 4,
                    routes: finalPrerenderRoutes,
                    dynamicRoutes: finalDynamicRoutes,
                    notFoundRoutes: ssgNotFoundPaths,
                    preview: previewProps
                };
                await _fs.promises.writeFile(_path.default.join(distDir, _constants1.PRERENDER_MANIFEST), JSON.stringify(prerenderManifest), "utf8");
                await generateClientSsgManifest(prerenderManifest, {
                    distDir,
                    buildId,
                    locales: ((ref2 = config.i18n) == null ? void 0 : ref2.locales) || []
                });
            } else {
                const prerenderManifest = {
                    version: 4,
                    routes: {},
                    dynamicRoutes: {},
                    preview: previewProps,
                    notFoundRoutes: []
                };
                await _fs.promises.writeFile(_path.default.join(distDir, _constants1.PRERENDER_MANIFEST), JSON.stringify(prerenderManifest), "utf8");
            }
            const images = {
                ...config.images
            };
            const { deviceSizes , imageSizes  } = images;
            images.sizes = [
                ...deviceSizes,
                ...imageSizes
            ];
            images.remotePatterns = ((config == null ? void 0 : (ref1 = config.images) == null ? void 0 : ref1.remotePatterns) || []).map((p)=>({
                    // Should be the same as matchRemotePattern()
                    protocol: p.protocol,
                    hostname: (0, _micromatch).makeRe(p.hostname).source,
                    port: p.port,
                    pathname: (0, _micromatch).makeRe(p.pathname ?? "**").source
                }));
            await _fs.promises.writeFile(_path.default.join(distDir, _constants1.IMAGES_MANIFEST), JSON.stringify({
                version: 1,
                images
            }), "utf8");
            await _fs.promises.writeFile(_path.default.join(distDir, _constants1.EXPORT_MARKER), JSON.stringify({
                version: 1,
                hasExportPathMap: typeof config.exportPathMap === "function",
                exportTrailingSlash: config.trailingSlash === true,
                isNextImageImported: isNextImageImported1 === true
            }), "utf8");
            await _fs.promises.unlink(_path.default.join(distDir, _constants1.EXPORT_DETAIL)).catch((err)=>{
                if (err.code === "ENOENT") {
                    return Promise.resolve();
                }
                return Promise.reject(err);
            });
            if (config.output === "standalone") {
                for (const file of [
                    ...requiredServerFiles.files,
                    _path.default.join(config.distDir, _constants1.SERVER_FILES_MANIFEST),
                    ...loadedEnvFiles.reduce((acc, envFile)=>{
                        if ([
                            ".env",
                            ".env.production"
                        ].includes(envFile.path)) {
                            acc.push(envFile.path);
                        }
                        return acc;
                    }, []), 
                ]){
                    const filePath = _path.default.join(dir, file);
                    const outputPath = _path.default.join(distDir, "standalone", _path.default.relative(outputFileTracingRoot, filePath));
                    await _fs.promises.mkdir(_path.default.dirname(outputPath), {
                        recursive: true
                    });
                    await _fs.promises.copyFile(filePath, outputPath);
                }
                await (0, _recursiveCopy).recursiveCopy(_path.default.join(distDir, _constants1.SERVER_DIRECTORY, "pages"), _path.default.join(distDir, "standalone", _path.default.relative(outputFileTracingRoot, distDir), _constants1.SERVER_DIRECTORY, "pages"), {
                    overwrite: true
                });
                if (appDir) {
                    await (0, _recursiveCopy).recursiveCopy(_path.default.join(distDir, _constants1.SERVER_DIRECTORY, "app"), _path.default.join(distDir, "standalone", _path.default.relative(outputFileTracingRoot, distDir), _constants1.SERVER_DIRECTORY, "app"), {
                        overwrite: true
                    });
                }
            }
            await nextBuildSpan.traceChild("print-tree-view").traceAsyncFn(()=>(0, _utils1).printTreeView(pageKeys, pageInfos, {
                    distPath: distDir,
                    buildId: buildId,
                    pagesDir,
                    useStatic404,
                    pageExtensions: config.pageExtensions,
                    appBuildManifest,
                    buildManifest,
                    middlewareManifest: middlewareManifest1,
                    gzipSize: config.experimental.gzipSize
                }));
            if (debugOutput) {
                nextBuildSpan.traceChild("print-custom-routes").traceFn(()=>(0, _utils1).printCustomRoutes({
                        redirects,
                        rewrites,
                        headers
                    }));
            }
            if (config.analyticsId) {
                console.log(_chalk.default.bold.green("Next.js Analytics") + " is enabled for this production build. " + "You'll receive a Real Experience Score computed by all of your visitors.");
                console.log("");
            }
            if (Boolean(config.experimental.nextScriptWorkers)) {
                await nextBuildSpan.traceChild("verify-partytown-setup").traceAsyncFn(async ()=>{
                    await (0, _verifyPartytownSetup).verifyPartytownSetup(dir, _path.default.join(distDir, _constants1.CLIENT_STATIC_FILES_PATH));
                });
            }
            if (config.output === "export") {
                const exportApp = require("../export").default;
                const options = {
                    isInvokedFromCli: false,
                    nextConfig: config,
                    hasAppDir,
                    silent: true,
                    threads: config.experimental.cpus,
                    outdir: _path.default.join(dir, configOutDir)
                };
                await exportApp(dir, options, nextBuildSpan);
            }
            await nextBuildSpan.traceChild("telemetry-flush").traceAsyncFn(()=>telemetry.flush());
        });
        return buildResult;
    } finally{
        // Ensure we wait for lockfile patching if present
        await _swc.lockfilePatchPromise.cur;
        // Ensure all traces are flushed before finishing the command
        await (0, _trace).flushAllTraces();
        (0, _swc).teardownTraceSubscriber();
        (0, _swc).teardownHeapProfiler();
        (0, _swc).teardownCrashReporter();
    }
}
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
async function generateClientSsgManifest(prerenderManifest, { buildId , distDir , locales  }) {
    const ssgPages = new Set([
        ...Object.entries(prerenderManifest.routes)// Filter out dynamic routes
        .filter(([, { srcRoute  }])=>srcRoute == null).map(([route])=>(0, _normalizeLocalePath).normalizeLocalePath(route, locales).pathname),
        ...Object.keys(prerenderManifest.dynamicRoutes), 
    ].sort());
    const clientSsgManifestContent = `self.__SSG_MANIFEST=${(0, _devalue).default(ssgPages)};self.__SSG_MANIFEST_CB&&self.__SSG_MANIFEST_CB()`;
    await _fs.promises.writeFile(_path.default.join(distDir, _constants1.CLIENT_STATIC_FILES_PATH, buildId, "_ssgManifest.js"), clientSsgManifestContent);
}
function pageToRoute(page) {
    const routeRegex = (0, _routeRegex).getNamedRouteRegex(page, true);
    return {
        page,
        regex: (0, _loadCustomRoutes).normalizeRouteRegex(routeRegex.re.source),
        routeKeys: routeRegex.routeKeys,
        namedRegex: routeRegex.namedRegex
    };
}

//# sourceMappingURL=index.js.map