"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _normalizers = require("../../normalizers");
var _prefixingNormalizer = require("../../prefixing-normalizer");
class AppBundlePathNormalizer extends _prefixingNormalizer.PrefixingNormalizer {
    constructor(){
        super("app");
    }
    normalize(page) {
        return super.normalize(page);
    }
}
exports.AppBundlePathNormalizer = AppBundlePathNormalizer;
class DevAppBundlePathNormalizer extends _normalizers.Normalizers {
    constructor(pageNormalizer){
        super([
            // This should normalize the filename to a page.
            pageNormalizer,
            // Normalize the app page to a pathname.
            new AppBundlePathNormalizer(), 
        ]);
    }
    normalize(filename) {
        return super.normalize(filename);
    }
}
exports.DevAppBundlePathNormalizer = DevAppBundlePathNormalizer;

//# sourceMappingURL=app-bundle-path-normalizer.js.map