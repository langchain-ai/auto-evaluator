"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addLocale = addLocale;
var _addPathPrefix = require("./add-path-prefix");
var _pathHasPrefix = require("./path-has-prefix");
function addLocale(path, locale, defaultLocale, ignorePrefix) {
    // If no locale was given or the locale is the default locale, we don't need
    // to prefix the path.
    if (!locale || locale === defaultLocale) return path;
    const lower = path.toLowerCase();
    // If the path is an API path or the path already has the locale prefix, we
    // don't need to prefix the path.
    if (!ignorePrefix) {
        if ((0, _pathHasPrefix).pathHasPrefix(lower, '/api')) return path;
        if ((0, _pathHasPrefix).pathHasPrefix(lower, `/${locale.toLowerCase()}`)) return path;
    }
    // Add the locale prefix to the path.
    return (0, _addPathPrefix).addPathPrefix(path, `/${locale}`);
}

//# sourceMappingURL=add-locale.js.map