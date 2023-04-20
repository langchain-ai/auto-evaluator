"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
class UnderscoreNormalizer {
    normalize(pathname) {
        return pathname.replace(/%5F/g, "_");
    }
}
exports.UnderscoreNormalizer = UnderscoreNormalizer;

//# sourceMappingURL=underscore-normalizer.js.map