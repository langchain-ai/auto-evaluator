"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _path = _interopRequireDefault(require("../../../shared/lib/isomorphic/path"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class PrefixingNormalizer {
    constructor(...prefixes){
        this.prefix = _path.default.posix.join(...prefixes);
    }
    normalize(pathname) {
        return _path.default.posix.join(this.prefix, pathname);
    }
}
exports.PrefixingNormalizer = PrefixingNormalizer;

//# sourceMappingURL=prefixing-normalizer.js.map