import "../node-polyfill-fetch";
import { buildAppStaticPaths, buildStaticPaths, collectGenerateParams } from "../../build/utils";
import { loadComponents } from "../load-components";
import { setHttpClientAndAgentOptions } from "../config";
import { loadRequireHook, overrideBuiltInReactPackages } from "../../build/webpack/require-hook";
import * as serverHooks from "../../client/components/hooks-server-context";
import { staticGenerationAsyncStorage } from "../../client/components/static-generation-async-storage";
loadRequireHook();
if (process.env.NEXT_PREBUNDLED_REACT) {
    overrideBuiltInReactPackages();
}
// expose AsyncLocalStorage on globalThis for react usage
const { AsyncLocalStorage  } = require("async_hooks");
globalThis.AsyncLocalStorage = AsyncLocalStorage;
// we call getStaticPaths in a separate process to ensure
// side-effects aren't relied on in dev that will break
// during a production build
export async function loadStaticPaths({ distDir , pathname , config , httpAgentOptions , enableUndici , locales , defaultLocale , isAppPath , originalAppPath , isrFlushToDisk , fetchCacheKeyPrefix , maxMemoryCacheSize , requestHeaders , incrementalCacheHandlerPath  }) {
    // update work memory runtime-config
    require("../../shared/lib/runtime-config").setConfig(config);
    setHttpClientAndAgentOptions({
        httpAgentOptions,
        experimental: {
            enableUndici
        }
    });
    const components = await loadComponents({
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
    try {
        if (isAppPath) {
            var ref;
            const userland = (ref = components.ComponentMod.routeModule) == null ? void 0 : ref.userland;
            const generateParams = userland ? [
                {
                    config: {
                        revalidate: userland.revalidate,
                        dynamic: userland.dynamic,
                        dynamicParams: userland.dynamicParams
                    },
                    generateStaticParams: userland.generateStaticParams,
                    segmentPath: pathname
                }, 
            ] : await collectGenerateParams(components.ComponentMod.tree);
            return await buildAppStaticPaths({
                page: pathname,
                generateParams,
                configFileName: config.configFileName,
                distDir,
                requestHeaders,
                incrementalCacheHandlerPath,
                serverHooks,
                staticGenerationAsyncStorage,
                isrFlushToDisk,
                fetchCacheKeyPrefix,
                maxMemoryCacheSize
            });
        }
        return await buildStaticPaths({
            page: pathname,
            getStaticPaths: components.getStaticPaths,
            configFileName: config.configFileName,
            locales,
            defaultLocale
        });
    } finally{
        setTimeout(()=>{
            // we only want to use each worker once to prevent any invalid
            // caches
            process.exit(1);
        });
    }
}

//# sourceMappingURL=static-paths-worker.js.map