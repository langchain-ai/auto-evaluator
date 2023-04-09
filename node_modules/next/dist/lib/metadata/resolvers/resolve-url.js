"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveUrl = exports.isStringOrURL = void 0;
var _path = _interopRequireDefault(require("../../../shared/lib/isomorphic/path"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function isStringOrURL(icon) {
    return typeof icon === "string" || icon instanceof URL;
}
function resolveUrl(url, metadataBase) {
    if (!url) return null;
    if (url instanceof URL) return url;
    try {
        // If we can construct a URL instance from url, ignore metadataBase
        const parsedUrl = new URL(url);
        return parsedUrl;
    } catch (_) {}
    if (!metadataBase) throw new Error(`metadata.metadataBase needs to be provided for resolving absolute URLs: ${url}`);
    // Handle relative or absolute paths
    const basePath = metadataBase.pathname || "/";
    const joinedPath = _path.default.join(basePath, url);
    return new URL(joinedPath, metadataBase);
}
exports.isStringOrURL = isStringOrURL;
exports.resolveUrl = resolveUrl;

//# sourceMappingURL=resolve-url.js.map