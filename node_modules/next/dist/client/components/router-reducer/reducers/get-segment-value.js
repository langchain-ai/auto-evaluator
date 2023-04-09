"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSegmentValue = getSegmentValue;
function getSegmentValue(segment) {
    return Array.isArray(segment) ? segment[1] : segment;
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=get-segment-value.js.map