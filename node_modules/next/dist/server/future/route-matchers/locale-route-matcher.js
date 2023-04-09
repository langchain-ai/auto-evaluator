"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _routeMatcher = require("./route-matcher");
class LocaleRouteMatcher extends _routeMatcher.RouteMatcher {
    /**
   * Identity returns the identity part of the matcher. This is used to compare
   * a unique matcher to another. This is also used when sorting dynamic routes,
   * so it must contain the pathname part as well.
   */ get identity() {
        var ref;
        return `${this.definition.pathname}?__nextLocale=${(ref = this.definition.i18n) == null ? void 0 : ref.locale}`;
    }
    match(pathname, options) {
        var ref, ref1;
        // This is like the parent `match` method but instead this injects the
        // additional `options` into the
        const result = this.test(pathname, options);
        if (!result) return null;
        return {
            definition: this.definition,
            params: result.params,
            detectedLocale: (options == null ? void 0 : (ref = options.i18n) == null ? void 0 : ref.detectedLocale) ?? ((ref1 = this.definition.i18n) == null ? void 0 : ref1.locale)
        };
    }
    test(pathname, options) {
        // If this route has locale information...
        if (this.definition.i18n && (options == null ? void 0 : options.i18n)) {
            // If we have detected a locale and it does not match this route's locale,
            // then this isn't a match!
            if (this.definition.i18n.locale && options.i18n.detectedLocale && this.definition.i18n.locale !== options.i18n.detectedLocale) {
                return null;
            }
            // Perform regular matching against the locale stripped pathname now, the
            // locale information matches!
            return super.test(options.i18n.pathname);
        }
        return super.test(pathname);
    }
}
exports.LocaleRouteMatcher = LocaleRouteMatcher;

//# sourceMappingURL=locale-route-matcher.js.map