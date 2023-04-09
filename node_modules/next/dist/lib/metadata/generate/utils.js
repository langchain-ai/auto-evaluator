"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolveAsArrayOrUndefined = void 0;
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
exports.resolveAsArrayOrUndefined = resolveAsArrayOrUndefined;

//# sourceMappingURL=utils.js.map