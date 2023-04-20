"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logAppDirError = logAppDirError;
var _isError = _interopRequireDefault(require("../../lib/is-error"));
var Log = _interopRequireWildcard(require("../../build/output/log"));
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
function logAppDirError(err) {
    if ((0, _isError).default(err) && (err == null ? void 0 : err.stack)) {
        const filteredStack = err.stack.split("\n").map((line)=>// Remove 'webpack-internal:' noise from the path
            line.replace(/(webpack-internal:\/\/\/|file:\/\/)(\(.*\)\/)?/, ""))// Only display stack frames from the user's code
        .filter((line)=>!/next[\\/]dist[\\/]compiled/.test(line) && !/node_modules[\\/]/.test(line) && !/node:internal[\\/]/.test(line)).join("\n");
        Log.error(filteredStack);
        if (typeof err.digest !== "undefined") {
            console.error(`digest: ${JSON.stringify(err.digest)}`);
        }
    } else {
        Log.error(err);
    }
}

//# sourceMappingURL=log-app-dir-error.js.map