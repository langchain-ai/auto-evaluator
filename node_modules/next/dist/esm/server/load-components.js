import { BUILD_MANIFEST, REACT_LOADABLE_MANIFEST, CLIENT_REFERENCE_MANIFEST, SERVER_REFERENCE_MANIFEST } from "../shared/lib/constants";
import { join } from "path";
import { requirePage } from "./require";
import { interopDefault } from "../lib/interop-default";
import { getTracer } from "./lib/trace/tracer";
import { LoadComponentsSpan } from "./lib/trace/constants";
async function loadDefaultErrorComponentsImpl(distDir) {
    const Document = interopDefault(require("next/dist/pages/_document"));
    const AppMod = require("next/dist/pages/_app");
    const App = interopDefault(AppMod);
    const ComponentMod = require("next/dist/pages/_error");
    const Component = interopDefault(ComponentMod);
    return {
        App,
        Document,
        Component,
        pageConfig: {},
        buildManifest: require(join(distDir, `fallback-${BUILD_MANIFEST}`)),
        reactLoadableManifest: {},
        ComponentMod,
        pathname: "/_error"
    };
}
/**
 * Load manifest file with retries, defaults to 3 attempts.
 */ async function loadManifest(manifestPath, attempts = 3) {
    while(true){
        try {
            return require(manifestPath);
        } catch (err) {
            attempts--;
            if (attempts <= 0) throw err;
            await new Promise((resolve)=>setTimeout(resolve, 100));
        }
    }
}
async function loadComponentsImpl({ distDir , pathname , hasServerComponents , isAppPath  }) {
    let DocumentMod = {};
    let AppMod = {};
    if (!isAppPath) {
        [DocumentMod, AppMod] = await Promise.all([
            Promise.resolve().then(()=>requirePage("/_document", distDir, false)),
            Promise.resolve().then(()=>requirePage("/_app", distDir, false)), 
        ]);
    }
    const ComponentMod = await Promise.resolve().then(()=>requirePage(pathname, distDir, isAppPath));
    const [buildManifest, reactLoadableManifest, clientReferenceManifest, serverActionsManifest, ] = await Promise.all([
        loadManifest(join(distDir, BUILD_MANIFEST)),
        loadManifest(join(distDir, REACT_LOADABLE_MANIFEST)),
        hasServerComponents ? loadManifest(join(distDir, "server", CLIENT_REFERENCE_MANIFEST + ".json")) : undefined,
        hasServerComponents ? loadManifest(join(distDir, "server", SERVER_REFERENCE_MANIFEST + ".json")).catch(()=>null) : null, 
    ]);
    const Component = interopDefault(ComponentMod);
    const Document = interopDefault(DocumentMod);
    const App = interopDefault(AppMod);
    const { getServerSideProps , getStaticProps , getStaticPaths  } = ComponentMod;
    return {
        App,
        Document,
        Component,
        buildManifest,
        reactLoadableManifest,
        pageConfig: ComponentMod.config || {},
        ComponentMod,
        getServerSideProps,
        getStaticProps,
        getStaticPaths,
        clientReferenceManifest,
        serverActionsManifest,
        isAppPath,
        pathname
    };
}
export const loadComponents = getTracer().wrap(LoadComponentsSpan.loadComponents, loadComponentsImpl);
export const loadDefaultErrorComponents = getTracer().wrap(LoadComponentsSpan.loadDefaultErrorComponents, loadDefaultErrorComponentsImpl);

//# sourceMappingURL=load-components.js.map