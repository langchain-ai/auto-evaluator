"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _pagesBundlePathNormalizer = require("./pages-bundle-path-normalizer");
var _pagesFilenameNormalizer = require("./pages-filename-normalizer");
var _pagesPageNormalizer = require("./pages-page-normalizer");
var _pagesPathnameNormalizer = require("./pages-pathname-normalizer");
class PagesNormalizers {
    constructor(distDir){
        this.filename = new _pagesFilenameNormalizer.PagesFilenameNormalizer(distDir);
        this.bundlePath = new _pagesBundlePathNormalizer.PagesBundlePathNormalizer();
    // You'd think that we'd require a `pathname` normalizer here, but for
    // `/pages` we have to handle i18n routes, which means that we need to
    // analyze the page path to determine the locale prefix and it's locale.
    }
}
exports.PagesNormalizers = PagesNormalizers;
class DevPagesNormalizers {
    constructor(pagesDir, extensions){
        this.page = new _pagesPageNormalizer.DevPagesPageNormalizer(pagesDir, extensions);
        this.pathname = new _pagesPathnameNormalizer.DevPagesPathnameNormalizer(pagesDir, extensions);
        this.bundlePath = new _pagesBundlePathNormalizer.DevPagesBundlePathNormalizer(this.page);
    }
}
exports.DevPagesNormalizers = DevPagesNormalizers;

//# sourceMappingURL=index.js.map