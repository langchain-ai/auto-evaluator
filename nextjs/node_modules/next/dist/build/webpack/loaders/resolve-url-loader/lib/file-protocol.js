"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.prepend = prepend;
exports.remove = remove;
function prepend(candidate) {
    if (typeof candidate === "string") {
        return "file://" + candidate;
    } else if (candidate && typeof candidate === "object" && Array.isArray(candidate.sources)) {
        return Object.assign({}, candidate, {
            sources: candidate.sources.map(prepend)
        });
    } else {
        throw new Error("expected string|object");
    }
}
function remove(candidate) {
    if (typeof candidate === "string") {
        return candidate.replace(/^file:\/{2}/, "");
    } else if (candidate && typeof candidate === "object" && Array.isArray(candidate.sources)) {
        return Object.assign({}, candidate, {
            sources: candidate.sources.map(remove)
        });
    } else {
        throw new Error("expected string|object");
    }
}

//# sourceMappingURL=file-protocol.js.map