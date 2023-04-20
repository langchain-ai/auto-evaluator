"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveAsArrayOrUndefined = exports.resolveArray = void 0;
function resolveArray(value) {
    if (Array.isArray(value)) {
        return value;
    }
    return [
        value
    ];
}
function resolveAsArrayOrUndefined(value) {
    if (typeof value === "undefined" || value === null) {
        return undefined;
    }
    if (Array.isArray(value)) {
        return value;
    }
    return [
        value
    ];
}
exports.resolveArray = resolveArray;
exports.resolveAsArrayOrUndefined = resolveAsArrayOrUndefined;

//# sourceMappingURL=utils.js.map