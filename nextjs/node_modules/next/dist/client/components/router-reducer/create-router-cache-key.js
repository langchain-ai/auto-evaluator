"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createRouterCacheKey = createRouterCacheKey;
function createRouterCacheKey(segment) {
    return Array.isArray(segment) ? `${segment[0]}|${segment[1]}|${segment[2]}` : segment;
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=create-router-cache-key.js.map