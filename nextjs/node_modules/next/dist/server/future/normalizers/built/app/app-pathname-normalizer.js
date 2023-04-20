"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _appPaths = require("../../../../../shared/lib/router/utils/app-paths");
var _normalizers = require("../../normalizers");
var _wrapNormalizerFn = require("../../wrap-normalizer-fn");
var _underscoreNormalizer = require("../../underscore-normalizer");
class AppPathnameNormalizer extends _normalizers.Normalizers {
    constructor(){
        super([
            // The pathname to match should have the trailing `/page` and other route
            // group information stripped from it.
            (0, _wrapNormalizerFn).wrapNormalizerFn(_appPaths.normalizeAppPath),
            // The page should have the `%5F` characters replaced with `_` characters.
            new _underscoreNormalizer.UnderscoreNormalizer(), 
        ]);
    }
    normalize(page) {
        return super.normalize(page);
    }
}
exports.AppPathnameNormalizer = AppPathnameNormalizer;
class DevAppPathnameNormalizer extends _normalizers.Normalizers {
    constructor(pageNormalizer){
        super([
            // This should normalize the filename to a page.
            pageNormalizer,
            // Normalize the app page to a pathname.
            new AppPathnameNormalizer(), 
        ]);
    }
    normalize(filename) {
        return super.normalize(filename);
    }
}
exports.DevAppPathnameNormalizer = DevAppPathnameNormalizer;

//# sourceMappingURL=app-pathname-normalizer.js.map