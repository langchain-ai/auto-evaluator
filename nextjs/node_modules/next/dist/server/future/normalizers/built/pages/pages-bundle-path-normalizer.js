"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _normalizePagePath = require("../../../../../shared/lib/page-path/normalize-page-path");
var _normalizers = require("../../normalizers");
var _prefixingNormalizer = require("../../prefixing-normalizer");
var _wrapNormalizerFn = require("../../wrap-normalizer-fn");
class PagesBundlePathNormalizer extends _normalizers.Normalizers {
    constructor(){
        super([
            // The bundle path should have the trailing `/index` stripped from
            // it.
            (0, _wrapNormalizerFn).wrapNormalizerFn(_normalizePagePath.normalizePagePath),
            // The page should prefixed with `pages/`.
            new _prefixingNormalizer.PrefixingNormalizer("pages"), 
        ]);
    }
    normalize(page) {
        return super.normalize(page);
    }
}
exports.PagesBundlePathNormalizer = PagesBundlePathNormalizer;
class DevPagesBundlePathNormalizer extends _normalizers.Normalizers {
    constructor(pagesNormalizer){
        super([
            // This should normalize the filename to a page.
            pagesNormalizer,
            // Normalize the app page to a pathname.
            new PagesBundlePathNormalizer(), 
        ]);
    }
    normalize(filename) {
        return super.normalize(filename);
    }
}
exports.DevPagesBundlePathNormalizer = DevPagesBundlePathNormalizer;

//# sourceMappingURL=pages-bundle-path-normalizer.js.map