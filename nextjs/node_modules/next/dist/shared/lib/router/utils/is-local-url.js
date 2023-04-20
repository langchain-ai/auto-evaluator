"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isLocalURL = isLocalURL;
var _utils = require("../../utils");
var _hasBasePath = require("../../../../client/has-base-path");
function isLocalURL(url) {
    // prevent a hydration mismatch on href for url with anchor refs
    if (!(0, _utils).isAbsoluteUrl(url)) return true;
    try {
        // absolute urls can be local if they are on the same origin
        const locationOrigin = (0, _utils).getLocationOrigin();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasBasePath).hasBasePath(resolved.pathname);
    } catch (_) {
        return false;
    }
}

//# sourceMappingURL=is-local-url.js.map