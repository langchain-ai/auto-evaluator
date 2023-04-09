"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _getModuleBuildInfo = require("../get-module-build-info");
var _stringifyRequest = require("../../stringify-request");
const EdgeAppRouteLoader = async function() {
    const { page , absolutePagePath , appDirLoader: appDirLoaderBase64 = "" ,  } = this.getOptions();
    const appDirLoader = Buffer.from(appDirLoaderBase64, "base64").toString();
    // Ensure we only run this loader for as a module.
    if (!this._module) throw new Error("This loader is only usable as a module");
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
    const modulePath = `${appDirLoader}${stringifiedPagePath.substring(1, stringifiedPagePath.length - 1)}?__edge_ssr_entry__`;
    return `
    import { EdgeRouteModuleWrapper } from 'next/dist/esm/server/web/edge-route-module-wrapper'
    import * as module from ${JSON.stringify(modulePath)}

    export const ComponentMod = module

    export default EdgeRouteModuleWrapper.wrap(module.routeModule)`;
};
var _default = EdgeAppRouteLoader;
exports.default = _default;

//# sourceMappingURL=index.js.map