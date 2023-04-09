"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _constants = require("../../../../../shared/lib/constants");
var _prefixingNormalizer = require("../../prefixing-normalizer");
class PagesFilenameNormalizer extends _prefixingNormalizer.PrefixingNormalizer {
    constructor(distDir){
        super(distDir, _constants.SERVER_DIRECTORY);
    }
    normalize(manifestFilename) {
        return super.normalize(manifestFilename);
    }
}
exports.PagesFilenameNormalizer = PagesFilenameNormalizer;

//# sourceMappingURL=pages-filename-normalizer.js.map