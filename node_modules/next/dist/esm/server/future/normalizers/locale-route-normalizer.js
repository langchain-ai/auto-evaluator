export class LocaleRouteNormalizer {
    constructor(locales, defaultLocale){
        this.locales = locales;
        this.defaultLocale = defaultLocale;
        this.lowerCase = locales.map((locale)=>locale.toLowerCase());
    }
    match(pathname, options) {
        let detectedLocale = (options == null ? void 0 : options.inferDefaultLocale) ? this.defaultLocale : undefined;
        if (this.locales.length === 0) return {
            detectedLocale,
            pathname
        };
        // The first segment will be empty, because it has a leading `/`. If
        // there is no further segment, there is no locale.
        const segments = pathname.split("/");
        if (!segments[1]) return {
            detectedLocale,
            pathname
        };
        // The second segment will contain the locale part if any.
        const segment = segments[1].toLowerCase();
        // See if the segment matches one of the locales.
        const index = this.lowerCase.indexOf(segment);
        if (index < 0) return {
            detectedLocale,
            pathname
        };
        // Return the case-sensitive locale.
        detectedLocale = this.locales[index];
        // Remove the `/${locale}` part of the pathname.
        pathname = pathname.slice(detectedLocale.length + 1) || "/";
        return {
            detectedLocale,
            pathname
        };
    }
    normalize(pathname) {
        const match = this.match(pathname);
        return match.pathname;
    }
}

//# sourceMappingURL=locale-route-normalizer.js.map