"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
/**
 * This module is for next.js server internal usage of path module.
 * It will use native path module for nodejs runtime.
 * It will use path-browserify polyfill for edge runtime.
 */ const path = process.env.NEXT_RUNTIME === 'edge' ? require('next/dist/compiled/path-browserify') : require('path');
var _default = path;
exports.default = _default;

//# sourceMappingURL=path.js.map