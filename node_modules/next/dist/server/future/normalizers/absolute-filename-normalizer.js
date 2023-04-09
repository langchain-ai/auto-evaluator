"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _absolutePathToPage = require("../../../shared/lib/page-path/absolute-path-to-page");
class AbsoluteFilenameNormalizer {
    /**
   *
   * @param dir the directory for which the files should be made relative to
   * @param extensions the extensions the file could have
   * @param keepIndex when `true` the trailing `/index` is _not_ removed
   */ constructor(dir, extensions, pagesType){
        this.dir = dir;
        this.extensions = extensions;
        this.pagesType = pagesType;
    }
    normalize(filename) {
        return (0, _absolutePathToPage).absolutePathToPage(filename, {
            extensions: this.extensions,
            keepIndex: false,
            dir: this.dir,
            pagesType: this.pagesType
        });
    }
}
exports.AbsoluteFilenameNormalizer = AbsoluteFilenameNormalizer;

//# sourceMappingURL=absolute-filename-normalizer.js.map