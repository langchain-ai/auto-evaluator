"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _appBundlePathNormalizer = require("./app-bundle-path-normalizer");
var _appFilenameNormalizer = require("./app-filename-normalizer");
var _appPageNormalizer = require("./app-page-normalizer");
var _appPathnameNormalizer = require("./app-pathname-normalizer");
class AppNormalizers {
    constructor(distDir){
        this.filename = new _appFilenameNormalizer.AppFilenameNormalizer(distDir);
        this.pathname = new _appPathnameNormalizer.AppPathnameNormalizer();
        this.bundlePath = new _appBundlePathNormalizer.AppBundlePathNormalizer();
    }
}
exports.AppNormalizers = AppNormalizers;
class DevAppNormalizers {
    constructor(appDir, extensions){
        this.page = new _appPageNormalizer.DevAppPageNormalizer(appDir, extensions);
        this.pathname = new _appPathnameNormalizer.DevAppPathnameNormalizer(this.page);
        this.bundlePath = new _appBundlePathNormalizer.DevAppBundlePathNormalizer(this.page);
    }
}
exports.DevAppNormalizers = DevAppNormalizers;

//# sourceMappingURL=index.js.map