"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.optimalFilterSize = optimalFilterSize;
exports.optimalHashes = optimalHashes;
function optimalFilterSize(length, errorRate) {
    return Math.ceil(-(length * Math.log(errorRate) / Math.pow(Math.log(2), 2)));
}
function optimalHashes(size, length) {
    return Math.ceil(size / length * Math.log(2));
}

//# sourceMappingURL=formulas.js.map