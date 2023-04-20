"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _absoluteFilenameNormalizer = require("../../absolute-filename-normalizer");
class DevPagesPathnameNormalizer extends _absoluteFilenameNormalizer.AbsoluteFilenameNormalizer {
    constructor(pagesDir, extensions){
        super(pagesDir, extensions, "pages");
    }
}
exports.DevPagesPathnameNormalizer = DevPagesPathnameNormalizer;

//# sourceMappingURL=pages-pathname-normalizer.js.map