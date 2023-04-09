"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isHTTPMethod = isHTTPMethod;
exports.HTTP_METHODS = void 0;
const HTTP_METHODS = [
    "GET",
    "HEAD",
    "OPTIONS",
    "POST",
    "PUT",
    "DELETE",
    "PATCH", 
];
exports.HTTP_METHODS = HTTP_METHODS;
function isHTTPMethod(maybeMethod) {
    return HTTP_METHODS.includes(maybeMethod);
}

//# sourceMappingURL=http.js.map