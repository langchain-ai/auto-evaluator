"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _path = _interopRequireDefault(require("../../../shared/lib/isomorphic/path"));
var _ensureLeadingSlash = require("../../../shared/lib/page-path/ensure-leading-slash");
var _normalizePathSep = require("../../../shared/lib/page-path/normalize-path-sep");
var _removePagePathTail = require("../../../shared/lib/page-path/remove-page-path-tail");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class AbsoluteFilenameNormalizer {
    /**
   *
   * @param dir the directory for which the files should be made relative to
   * @param extensions the extensions the file could have
   * @param keepIndex when `true` the trailing `/index` is _not_ removed
   */ constructor(dir, extensions){
        this.dir = dir;
        this.extensions = extensions;
    }
    normalize(pathname) {
        return (0, _removePagePathTail).removePagePathTail((0, _normalizePathSep).normalizePathSep((0, _ensureLeadingSlash).ensureLeadingSlash(_path.default.relative(this.dir, pathname))), {
            extensions: this.extensions,
            keepIndex: false
        });
    }
}
exports.AbsoluteFilenameNormalizer = AbsoluteFilenameNormalizer;

//# sourceMappingURL=absolute-filename-normalizer.js.map