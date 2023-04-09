"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadStaticPaths = loadStaticPaths;
require("../node-polyfill-fetch");
var _utils = require("../../build/utils");
var _loadComponents = require("../load-components");
var _config = require("../config");
var _requireHook = require("../../build/webpack/require-hook");
var serverHooks = _interopRequireWildcard(require("../../client/components/hooks-server-context"));
var _staticGenerationAsyncStorage = require("../../client/components/static-generation-async-storage");
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
(0, _requireHook).loadRequireHook();
if (process.env.NEXT_PREBUNDLED_REACT) {
    (0, _requireHook).overrideBuiltInReactPackages();
}
let workerWasUsed = false;
// expose AsyncLocalStorage on globalThis for react usage
const { AsyncLocalStorage  } = require("async_hooks");
globalThis.AsyncLocalStorage = AsyncLocalStorage;
async function loadStaticPaths({ distDir , pathname , config , httpAgentOptions , enableUndici , locales , defaultLocale , isAppPath , originalAppPath , isrFlushToDisk , fetchCacheKeyPrefix , maxMemoryCacheSize , requestHeaders , incrementalCacheHandlerPath  }) {
    // we only want to use each worker once to prevent any invalid
    // caches
    if (workerWasUsed) {
        process.exit(1);
    }
    // update work memory runtime-config
    require("../../shared/lib/runtime-config").setConfig(config);
    (0, _config).setHttpClientAndAgentOptions({
        httpAgentOptions,
        experimental: {
            enableUndici
        }
    });
    const components = await (0, _loadComponents).loadComponents({
        distDir,
        pathname: originalAppPath || pathname,
        hasServerComponents: false,
        isAppPath: !!isAppPath
    });
    if (!components.getStaticPaths && !isAppPath) {
        // we shouldn't get to this point since the worker should
        // only be called for SSG pages with getStaticPaths
        throw new Error(`Invariant: failed to load page with getStaticPaths for ${pathname}`);
    }
    workerWasUsed = true;
    if (isAppPath) {
        const handlers = components.ComponentMod.handlers;
        const generateParams = handlers ? [
            {
                config: {
                    revalidate: handlers.revalidate,
                    dynamic: handlers.dynamic,
                    dynamicParams: handlers.dynamicParams
                },
                generateStaticParams: handlers.generateStaticParams,
                segmentPath: pathname
            }, 
        ] : await (0, _utils).collectGenerateParams(components.ComponentMod.tree);
        return (0, _utils).buildAppStaticPaths({
            page: pathname,
            generateParams,
            configFileName: config.configFileName,
            distDir,
            requestHeaders,
            incrementalCacheHandlerPath,
            serverHooks: serverHooks,
            staticGenerationAsyncStorage: _staticGenerationAsyncStorage.staticGenerationAsyncStorage,
            isrFlushToDisk,
            fetchCacheKeyPrefix,
            maxMemoryCacheSize
        });
    }
    return (0, _utils).buildStaticPaths({
        page: pathname,
        getStaticPaths: components.getStaticPaths,
        configFileName: config.configFileName,
        locales,
        defaultLocale
    });
}

//# sourceMappingURL=static-paths-worker.js.map