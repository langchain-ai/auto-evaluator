"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.genRenderExecArgv = void 0;
var Log = _interopRequireWildcard(require("../../build/output/log"));
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
const genRenderExecArgv = ()=>{
    var ref4, ref1;
    const isDebugging = process.execArgv.some((localArg)=>localArg.startsWith("--inspect")) || ((ref4 = process.env.NODE_OPTIONS) == null ? void 0 : ref4.match == null ? void 0 : ref4.match(/--inspect(=\S+)?( |$)/));
    const isDebuggingWithBrk = process.execArgv.some((localArg)=>localArg.startsWith("--inspect-brk")) || ((ref1 = process.env.NODE_OPTIONS) == null ? void 0 : ref1.match == null ? void 0 : ref1.match(/--inspect-brk(=\S+)?( |$)/));
    const debugPort = (()=>{
        var ref, ref2, ref3;
        const debugPortStr = ((ref = process.execArgv.find((localArg)=>localArg.startsWith("--inspect") || localArg.startsWith("--inspect-brk"))) == null ? void 0 : ref.split("=")[1]) ?? ((ref2 = process.env.NODE_OPTIONS) == null ? void 0 : ref2.match == null ? void 0 : (ref3 = ref2.match(/--inspect(-brk)?(=(\S+))?( |$)/)) == null ? void 0 : ref3[3]);
        return debugPortStr ? parseInt(debugPortStr, 10) : 9229;
    })();
    if (isDebugging || isDebuggingWithBrk) {
        Log.warn(`the --inspect${isDebuggingWithBrk ? "-brk" : ""} option was detected, the Next.js server should be inspected at port ${debugPort + 1}.`);
    }
    const execArgv = process.execArgv.filter((localArg)=>{
        return !localArg.startsWith("--inspect") && !localArg.startsWith("--inspect-brk");
    });
    if (isDebugging || isDebuggingWithBrk) {
        execArgv.push(`--inspect${isDebuggingWithBrk ? "-brk" : ""}=${debugPort + 1}`);
    }
    return execArgv;
};
exports.genRenderExecArgv = genRenderExecArgv;

//# sourceMappingURL=worker-utils.js.map