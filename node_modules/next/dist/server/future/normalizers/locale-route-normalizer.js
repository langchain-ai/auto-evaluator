"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
class LocaleRouteNormalizer {
    constructor(provider){
        this.provider = provider;
    }
    /**
   * Normalizes the pathname by removing the locale prefix if any.
   *
   * @param pathname The pathname to normalize.
   * @returns The pathname without the locale prefix (if any).
   */ normalize(pathname) {
        const match = this.provider.analyze(pathname);
        return match.pathname;
    }
}
exports.LocaleRouteNormalizer = LocaleRouteNormalizer;

//# sourceMappingURL=locale-route-normalizer.js.map