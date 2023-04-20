"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getServerCSSForEntries = getServerCSSForEntries;
function getServerCSSForEntries(serverCSSManifest, entries) {
    const css = [];
    for (const entry of entries){
        const entryName = entry.replace(/\.[^.]+$/, "");
        if (serverCSSManifest.cssModules && serverCSSManifest.cssModules[entryName]) {
            css.push(...serverCSSManifest.cssModules[entryName]);
        }
    }
    return css;
}

//# sourceMappingURL=get-server-css-for-entries.js.map