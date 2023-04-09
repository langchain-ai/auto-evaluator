import path from "../../../shared/lib/isomorphic/path";
function isStringOrURL(icon) {
    return typeof icon === "string" || icon instanceof URL;
}
function resolveUrl(url, metadataBase) {
    if (!url) return null;
    if (url instanceof URL) return url;
    try {
        // If we can construct a URL instance from url, ignore metadataBase
        const parsedUrl = new URL(url);
        return parsedUrl;
    } catch (_) {}
    if (!metadataBase) throw new Error(`metadata.metadataBase needs to be provided for resolving absolute URLs: ${url}`);
    // Handle relative or absolute paths
    const basePath = metadataBase.pathname || "/";
    const joinedPath = path.join(basePath, url);
    return new URL(joinedPath, metadataBase);
}
export { isStringOrURL, resolveUrl };

//# sourceMappingURL=resolve-url.js.map