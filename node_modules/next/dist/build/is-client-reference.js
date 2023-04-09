"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isClientReference = isClientReference;
function isClientReference(reference) {
    return (reference == null ? void 0 : reference.$$typeof) === Symbol.for("react.client.reference");
}

//# sourceMappingURL=is-client-reference.js.map