"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = edgeAppRouteLoader;
var _getModuleBuildInfo = require("../get-module-build-info");
var _stringifyRequest = require("../../stringify-request");
async function edgeAppRouteLoader() {
    const { page , absolutePagePath , appDirLoader: appDirLoaderBase64 ,  } = this.getOptions();
    const appDirLoader = Buffer.from(appDirLoaderBase64 || "", "base64").toString();
    const buildInfo = (0, _getModuleBuildInfo).getModuleBuildInfo(this._module);
    buildInfo.nextEdgeSSR = {
        isServerComponent: false,
        page: page,
        isAppDir: true
    };
    buildInfo.route = {
        page,
        absolutePagePath
    };
    const stringifiedPagePath = (0, _stringifyRequest).stringifyRequest(this, absolutePagePath);
    const pageModPath = `${appDirLoader}${stringifiedPagePath.substring(1, stringifiedPagePath.length - 1)}?__edge_ssr_entry__`;
    const transformed = `
    import { adapter, enhanceGlobals } from 'next/dist/esm/server/web/adapter'
    import { getHandle } from 'next/dist/esm/build/webpack/loaders/next-edge-app-route-loader/handle'

    enhanceGlobals()

    import * as mod from ${JSON.stringify(pageModPath)}

    const render = getHandle({
      mod,
      page: ${JSON.stringify(page)},
    })

    export const ComponentMod = mod

    export default function(opts) {
      return adapter({
        ...opts,
        handler: render
      })
    }`;
    return transformed;
}

//# sourceMappingURL=index.js.map