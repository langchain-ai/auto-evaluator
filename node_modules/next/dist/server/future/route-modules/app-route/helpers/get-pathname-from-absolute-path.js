"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPathnameFromAbsolutePath = getPathnameFromAbsolutePath;
function getPathnameFromAbsolutePath(absolutePath) {
    // Remove prefix including app dir
    let appDir = "/app/";
    if (!absolutePath.includes(appDir)) {
        appDir = "\\app\\";
    }
    const [, ...parts] = absolutePath.split(appDir);
    const relativePath = appDir[0] + parts.join(appDir);
    // remove extension
    const pathname = relativePath.split(".").slice(0, -1).join(".");
    return pathname;
}

//# sourceMappingURL=get-pathname-from-absolute-path.js.map