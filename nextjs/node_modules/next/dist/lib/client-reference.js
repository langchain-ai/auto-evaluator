"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getClientReferenceModuleKey = getClientReferenceModuleKey;
exports.isClientReference = isClientReference;
function getClientReferenceModuleKey(filepath, exportName) {
    return exportName === "*" ? filepath : filepath + "#" + exportName;
}
function isClientReference(reference) {
    return (reference == null ? void 0 : reference.$$typeof) === Symbol.for("react.client.reference");
}

//# sourceMappingURL=client-reference.js.map