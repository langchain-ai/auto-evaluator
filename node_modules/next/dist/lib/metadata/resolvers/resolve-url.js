"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveUrl = exports.isStringOrURL = void 0;
var _path = _interopRequireDefault(require("../../../shared/lib/isomorphic/path"));
var Log = _interopRequireWildcard(require("../../../build/output/log"));
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
function isStringOrURL(icon) {
    return typeof icon === "string" || icon instanceof URL;
}
function resolveUrl(url, metadataBase) {
    if (url instanceof URL) return url;
    if (!url) return null;
    try {
        // If we can construct a URL instance from url, ignore metadataBase
        const parsedUrl = new URL(url);
        return parsedUrl;
    } catch (_) {}
    if (!metadataBase) {
        metadataBase = new URL(`http://localhost:${process.env.PORT || 3000}`);
        // Development mode warning, add new line prefix for worker output
        console.log();
        Log.warn(`metadata.metadataBase is not set for resolving url "${url}", fallbacks to "${metadataBase.origin}". See https://beta.nextjs.org/docs/api-reference/metadata#metadatabase`);
    }
    // Handle relative or absolute paths
    const basePath = metadataBase.pathname || "";
    const joinedPath = _path.default.join(basePath, url);
    return new URL(joinedPath, metadataBase);
}
exports.isStringOrURL = isStringOrURL;
exports.resolveUrl = resolveUrl;

//# sourceMappingURL=resolve-url.js.map