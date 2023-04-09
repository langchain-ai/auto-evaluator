"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cleanURL = cleanURL;
function cleanURL(urlString) {
    const url = new URL(urlString);
    url.host = "localhost:3000";
    url.search = "";
    url.protocol = "http";
    return url.toString();
}

//# sourceMappingURL=clean-url.js.map