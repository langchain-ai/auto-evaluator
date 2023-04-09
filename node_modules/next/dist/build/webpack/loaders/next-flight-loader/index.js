"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = transformSource;
var _constants = require("../../../../shared/lib/constants");
var _warnOnce = require("../../../../shared/lib/utils/warn-once");
var _getPageStaticInfo = require("../../../analysis/get-page-static-info");
var _getModuleBuildInfo = require("../get-module-build-info");
async function transformSource(source, sourceMap) {
    var ref, ref1, ref2, ref3;
    // Avoid buffer to be consumed
    if (typeof source !== "string") {
        throw new Error("Expected source to have been transformed to a string.");
    }
    const callback = this.async();
    // Assign the RSC meta information to buildInfo.
    // Exclude next internal files which are not marked as client files
    const buildInfo = (0, _getModuleBuildInfo).getModuleBuildInfo(this._module);
    buildInfo.rsc = (0, _getPageStaticInfo).getRSCModuleInformation(source);
    const isESM = ((ref = this._module) == null ? void 0 : (ref1 = ref.parser) == null ? void 0 : ref1.sourceType) === "module";
    // A client boundary.
    if (isESM && ((ref2 = buildInfo.rsc) == null ? void 0 : ref2.type) === _constants.RSC_MODULE_TYPES.client) {
        var ref4;
        const clientRefs = buildInfo.rsc.clientRefs;
        if (clientRefs.includes("*")) {
            return callback(new Error(`It's currently unsupport to use "export *" in a client boundary. Please use named exports instead.`));
        }
        // For ESM, we can't simply export it as a proxy via `module.exports`.
        // Use multiple named exports instead.
        const proxyFilepath = (ref4 = source.match(/createProxy\((.+)\)/)) == null ? void 0 : ref4[1];
        if (!proxyFilepath) {
            return callback(new Error(`Failed to find the proxy file path in the client boundary. This is a bug in Next.js.`));
        }
        let esmSource = `
    import { createProxy } from "private-next-rsc-mod-ref-proxy"
    const proxy = createProxy(${proxyFilepath})
    `;
        let cnt = 0;
        for (const ref of clientRefs){
            if (ref === "default") {
                esmSource += `\nexport default proxy.default`;
            } else {
                esmSource += `\nconst e${cnt} = proxy["${ref}"]\nexport { e${cnt++} as ${ref} }`;
            }
        }
        return callback(null, esmSource, sourceMap);
    }
    if (((ref3 = buildInfo.rsc) == null ? void 0 : ref3.type) !== _constants.RSC_MODULE_TYPES.client) {
        if (noopHeadPath === this.resourcePath) {
            (0, _warnOnce).warnOnce(`Warning: You're using \`next/head\` inside the \`app\` directory, please migrate to the Metadata API. See https://beta.nextjs.org/docs/api-reference/metadata for more details.`);
        }
    }
    return callback(null, source, sourceMap);
}
const noopHeadPath = require.resolve("next/dist/client/components/noop-head");

//# sourceMappingURL=index.js.map