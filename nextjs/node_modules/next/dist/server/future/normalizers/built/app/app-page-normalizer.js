"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _absoluteFilenameNormalizer = require("../../absolute-filename-normalizer");
class DevAppPageNormalizer extends _absoluteFilenameNormalizer.AbsoluteFilenameNormalizer {
    constructor(appDir, extensions){
        super(appDir, extensions, "app");
    }
}
exports.DevAppPageNormalizer = DevAppPageNormalizer;

//# sourceMappingURL=app-page-normalizer.js.map