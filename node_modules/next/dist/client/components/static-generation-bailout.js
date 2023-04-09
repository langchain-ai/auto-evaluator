"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.staticGenerationBailout = void 0;
var _hooksServerContext = require("./hooks-server-context");
var _staticGenerationAsyncStorage = require("./static-generation-async-storage");
class StaticGenBailoutError extends Error {
    constructor(...args){
        super(...args);
        this.code = 'NEXT_STATIC_GEN_BAILOUT';
    }
}
const staticGenerationBailout = (reason, opts)=>{
    const staticGenerationStore = _staticGenerationAsyncStorage.staticGenerationAsyncStorage.getStore();
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.forceStatic) {
        return true;
    }
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.dynamicShouldError) {
        const { dynamic ='error' , link  } = opts || {};
        const suffix = link ? ` See more info here: ${link}` : '';
        throw new StaticGenBailoutError(`Page with \`dynamic = "${dynamic}"\` couldn't be rendered statically because it used \`${reason}\`.${suffix}`);
    }
    if (staticGenerationStore) {
        staticGenerationStore.revalidate = 0;
    }
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.isStaticGeneration) {
        const err = new _hooksServerContext.DynamicServerError(reason);
        staticGenerationStore.dynamicUsageDescription = reason;
        staticGenerationStore.dynamicUsageStack = err.stack;
        throw err;
    }
    return false;
};
exports.staticGenerationBailout = staticGenerationBailout;

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=static-generation-bailout.js.map