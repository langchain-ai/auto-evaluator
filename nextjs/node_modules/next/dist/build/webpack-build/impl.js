"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.webpackBuildImpl = webpackBuildImpl;
exports.workerMain = workerMain;
var _chalk = _interopRequireDefault(require("next/dist/compiled/chalk"));
var _formatWebpackMessages = _interopRequireDefault(require("../../client/dev/error-overlay/format-webpack-messages"));
var _nonNullable = require("../../lib/non-nullable");
var _constants = require("../../shared/lib/constants");
var _compiler = require("../compiler");
var Log = _interopRequireWildcard(require("../output/log"));
var _webpackConfig = _interopRequireWildcard(require("../webpack-config"));
var _telemetryPlugin = require("../webpack/plugins/telemetry-plugin");
var _buildContext = require("../build-context");
var _entries = require("../entries");
var _config = _interopRequireDefault(require("../../server/config"));
var _trace = require("../../trace");
var _constants1 = require("../../lib/constants");
var _nextTraceEntrypointsPlugin = require("../webpack/plugins/next-trace-entrypoints-plugin");
var pagesPluginModule = _interopRequireWildcard(require("../webpack/plugins/pages-manifest-plugin"));
var _debug = _interopRequireDefault(require("next/dist/compiled/debug"));
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
const debug = (0, _debug).default("next:build:webpack-build");
function isTelemetryPlugin(plugin) {
    return plugin instanceof _telemetryPlugin.TelemetryPlugin;
}
function isTraceEntryPointsPlugin(plugin) {
    return plugin instanceof _nextTraceEntrypointsPlugin.TraceEntryPointsPlugin;
}
async function webpackBuildImpl(compilerName) {
    var ref, ref1;
    let result = {
        warnings: [],
        errors: [],
        stats: []
    };
    let webpackBuildStart;
    const nextBuildSpan = _buildContext.NextBuildContext.nextBuildSpan;
    const dir = _buildContext.NextBuildContext.dir;
    const config = _buildContext.NextBuildContext.config;
    const runWebpackSpan = nextBuildSpan.traceChild("run-webpack-compiler");
    const entrypoints = await nextBuildSpan.traceChild("create-entrypoints").traceAsyncFn(()=>(0, _entries).createEntrypoints({
            buildId: _buildContext.NextBuildContext.buildId,
            config: config,
            envFiles: _buildContext.NextBuildContext.loadedEnvFiles,
            isDev: false,
            rootDir: dir,
            pageExtensions: config.pageExtensions,
            pagesDir: _buildContext.NextBuildContext.pagesDir,
            appDir: _buildContext.NextBuildContext.appDir,
            pages: _buildContext.NextBuildContext.mappedPages,
            appPaths: _buildContext.NextBuildContext.mappedAppPages,
            previewMode: _buildContext.NextBuildContext.previewProps,
            rootPaths: _buildContext.NextBuildContext.mappedRootPaths,
            hasInstrumentationHook: _buildContext.NextBuildContext.hasInstrumentationHook
        }));
    const commonWebpackOptions = {
        isServer: false,
        buildId: _buildContext.NextBuildContext.buildId,
        config: config,
        appDir: _buildContext.NextBuildContext.appDir,
        pagesDir: _buildContext.NextBuildContext.pagesDir,
        rewrites: _buildContext.NextBuildContext.rewrites,
        originalRewrites: _buildContext.NextBuildContext.originalRewrites,
        originalRedirects: _buildContext.NextBuildContext.originalRedirects,
        reactProductionProfiling: _buildContext.NextBuildContext.reactProductionProfiling,
        noMangling: _buildContext.NextBuildContext.noMangling,
        clientRouterFilters: _buildContext.NextBuildContext.clientRouterFilters
    };
    const configs = await runWebpackSpan.traceChild("generate-webpack-config").traceAsyncFn(async ()=>{
        const info = await (0, _webpackConfig).loadProjectInfo({
            dir,
            config: commonWebpackOptions.config,
            dev: false
        });
        return Promise.all([
            (0, _webpackConfig).default(dir, {
                ...commonWebpackOptions,
                middlewareMatchers: entrypoints.middlewareMatchers,
                runWebpackSpan,
                compilerType: _constants.COMPILER_NAMES.client,
                entrypoints: entrypoints.client,
                ...info
            }),
            (0, _webpackConfig).default(dir, {
                ...commonWebpackOptions,
                runWebpackSpan,
                middlewareMatchers: entrypoints.middlewareMatchers,
                compilerType: _constants.COMPILER_NAMES.server,
                entrypoints: entrypoints.server,
                ...info
            }),
            (0, _webpackConfig).default(dir, {
                ...commonWebpackOptions,
                runWebpackSpan,
                middlewareMatchers: entrypoints.middlewareMatchers,
                compilerType: _constants.COMPILER_NAMES.edgeServer,
                entrypoints: entrypoints.edgeServer,
                ...info
            }), 
        ]);
    });
    const clientConfig = configs[0];
    const serverConfig = configs[1];
    if (clientConfig.optimization && (clientConfig.optimization.minimize !== true || clientConfig.optimization.minimizer && clientConfig.optimization.minimizer.length === 0)) {
        Log.warn(`Production code optimization has been disabled in your project. Read more: https://nextjs.org/docs/messages/minification-disabled`);
    }
    webpackBuildStart = process.hrtime();
    debug(`starting compiler`, compilerName);
    // We run client and server compilation separately to optimize for memory usage
    await runWebpackSpan.traceAsyncFn(async ()=>{
        // Run the server compilers first and then the client
        // compiler to track the boundary of server/client components.
        let clientResult = null;
        // During the server compilations, entries of client components will be
        // injected to this set and then will be consumed by the client compiler.
        let serverResult = null;
        let edgeServerResult = null;
        if (!compilerName || compilerName === "server") {
            serverResult = await (0, _compiler).runCompiler(serverConfig, {
                runWebpackSpan
            });
            debug("server result", serverResult);
        }
        if (!compilerName || compilerName === "edge-server") {
            edgeServerResult = configs[2] ? await (0, _compiler).runCompiler(configs[2], {
                runWebpackSpan
            }) : null;
            debug("edge server result", edgeServerResult);
        }
        // Only continue if there were no errors
        if (!(serverResult == null ? void 0 : serverResult.errors.length) && !(edgeServerResult == null ? void 0 : edgeServerResult.errors.length)) {
            const pluginState = (0, _buildContext).getPluginState();
            for(const key in pluginState.injectedClientEntries){
                const value = pluginState.injectedClientEntries[key];
                const clientEntry = clientConfig.entry;
                if (key === _constants.APP_CLIENT_INTERNALS) {
                    clientEntry[_constants.CLIENT_STATIC_FILES_RUNTIME_MAIN_APP] = {
                        import: [
                            // TODO-APP: cast clientEntry[CLIENT_STATIC_FILES_RUNTIME_MAIN_APP] to type EntryDescription once it's available from webpack
                            // @ts-expect-error clientEntry['main-app'] is type EntryDescription { import: ... }
                            ...clientEntry[_constants.CLIENT_STATIC_FILES_RUNTIME_MAIN_APP].import,
                            value, 
                        ],
                        layer: _constants1.WEBPACK_LAYERS.appClient
                    };
                } else {
                    clientEntry[key] = {
                        dependOn: [
                            _constants.CLIENT_STATIC_FILES_RUNTIME_MAIN_APP
                        ],
                        import: value,
                        layer: _constants1.WEBPACK_LAYERS.appClient
                    };
                }
            }
            if (!compilerName || compilerName === "client") {
                clientResult = await (0, _compiler).runCompiler(clientConfig, {
                    runWebpackSpan
                });
                debug("client result", clientResult);
            }
        }
        result = {
            warnings: [].concat(clientResult == null ? void 0 : clientResult.warnings, serverResult == null ? void 0 : serverResult.warnings, edgeServerResult == null ? void 0 : edgeServerResult.warnings).filter(_nonNullable.nonNullable),
            errors: [].concat(clientResult == null ? void 0 : clientResult.errors, serverResult == null ? void 0 : serverResult.errors, edgeServerResult == null ? void 0 : edgeServerResult.errors).filter(_nonNullable.nonNullable),
            stats: [
                clientResult == null ? void 0 : clientResult.stats,
                serverResult == null ? void 0 : serverResult.stats,
                edgeServerResult == null ? void 0 : edgeServerResult.stats, 
            ]
        };
    });
    result = nextBuildSpan.traceChild("format-webpack-messages").traceFn(()=>(0, _formatWebpackMessages).default(result, true));
    _buildContext.NextBuildContext.telemetryPlugin = (ref = clientConfig.plugins) == null ? void 0 : ref.find(isTelemetryPlugin);
    const traceEntryPointsPlugin = (ref1 = serverConfig.plugins) == null ? void 0 : ref1.find(isTraceEntryPointsPlugin);
    const webpackBuildEnd = process.hrtime(webpackBuildStart);
    if (result.errors.length > 0) {
        // Only keep the first few errors. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (result.errors.length > 5) {
            result.errors.length = 5;
        }
        let error = result.errors.filter(Boolean).join("\n\n");
        console.error(_chalk.default.red("Failed to compile.\n"));
        if (error.indexOf("private-next-pages") > -1 && error.indexOf("does not contain a default export") > -1) {
            const page_name_regex = /'private-next-pages\/(?<page_name>[^']*)'/;
            const parsed = page_name_regex.exec(error);
            const page_name = parsed && parsed.groups && parsed.groups.page_name;
            throw new Error(`webpack build failed: found page without a React Component as default export in pages/${page_name}\n\nSee https://nextjs.org/docs/messages/page-without-valid-component for more info.`);
        }
        console.error(error);
        console.error();
        if (error.indexOf("private-next-pages") > -1 || error.indexOf("__next_polyfill__") > -1) {
            const err = new Error("webpack config.resolve.alias was incorrectly overridden. https://nextjs.org/docs/messages/invalid-resolve-alias");
            err.code = "INVALID_RESOLVE_ALIAS";
            throw err;
        }
        const err = new Error("Build failed because of webpack errors");
        err.code = "WEBPACK_ERRORS";
        throw err;
    } else {
        if (result.warnings.length > 0) {
            Log.warn("Compiled with warnings\n");
            console.warn(result.warnings.filter(Boolean).join("\n\n"));
            console.warn();
        } else if (!compilerName) {
            var ref2;
            (ref2 = _buildContext.NextBuildContext.buildSpinner) == null ? void 0 : ref2.stopAndPersist();
            Log.info("Compiled successfully");
        }
        return {
            duration: webpackBuildEnd[0],
            turbotraceContext: traceEntryPointsPlugin == null ? void 0 : traceEntryPointsPlugin.turbotraceContext,
            pluginState: (0, _buildContext).getPluginState(),
            serializedPagesManifestEntries: {
                edgeServerPages: pagesPluginModule.edgeServerPages,
                edgeServerAppPaths: pagesPluginModule.edgeServerAppPaths,
                nodeServerPages: pagesPluginModule.nodeServerPages,
                nodeServerAppPaths: pagesPluginModule.nodeServerAppPaths
            }
        };
    }
}
async function workerMain(workerData) {
    // setup new build context from the serialized data passed from the parent
    Object.assign(_buildContext.NextBuildContext, workerData.buildContext);
    // Resume plugin state
    (0, _buildContext).resumePluginState(_buildContext.NextBuildContext.pluginState);
    // restore module scope maps for flight plugins
    const { serializedPagesManifestEntries  } = _buildContext.NextBuildContext;
    for (const key of Object.keys(serializedPagesManifestEntries || {})){
        var ref;
        Object.assign(pagesPluginModule[key], (ref = serializedPagesManifestEntries) == null ? void 0 : ref[key]);
    }
    /// load the config because it's not serializable
    _buildContext.NextBuildContext.config = await (0, _config).default(_constants.PHASE_PRODUCTION_BUILD, _buildContext.NextBuildContext.dir, undefined, undefined, true);
    _buildContext.NextBuildContext.nextBuildSpan = (0, _trace).trace("next-build");
    const result = await webpackBuildImpl(workerData.compilerName);
    const { entriesTrace  } = result.turbotraceContext ?? {};
    if (entriesTrace) {
        const { entryNameMap , depModArray  } = entriesTrace;
        if (depModArray) {
            result.turbotraceContext.entriesTrace.depModArray = depModArray;
        }
        if (entryNameMap) {
            const entryEntries = Array.from((entryNameMap == null ? void 0 : entryNameMap.entries()) ?? []);
            // @ts-expect-error
            result.turbotraceContext.entriesTrace.entryNameMap = entryEntries;
        }
    }
    return result;
}

//# sourceMappingURL=impl.js.map