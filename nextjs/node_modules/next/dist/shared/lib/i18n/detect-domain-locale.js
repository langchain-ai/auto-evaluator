"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.detectDomainLocale = detectDomainLocale;
function detectDomainLocale(domainItems, hostname, detectedLocale) {
    if (!domainItems) return;
    if (detectedLocale) {
        detectedLocale = detectedLocale.toLowerCase();
    }
    for (const item of domainItems){
        var ref, ref1;
        // remove port if present
        const domainHostname = (ref = item.domain) == null ? void 0 : ref.split(':')[0].toLowerCase();
        if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || ((ref1 = item.locales) == null ? void 0 : ref1.some((locale)=>locale.toLowerCase() === detectedLocale))) {
            return item;
        }
    }
}

//# sourceMappingURL=detect-domain-locale.js.map