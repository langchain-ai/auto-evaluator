"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateURL = validateURL;
function validateURL(url) {
    if (!url) {
        throw new Error("Invalid request URL");
    }
    try {
        new URL(url, "http://n");
        return url;
    } catch  {
        throw new Error("Invalid request URL");
    }
}

//# sourceMappingURL=validate-url.js.map