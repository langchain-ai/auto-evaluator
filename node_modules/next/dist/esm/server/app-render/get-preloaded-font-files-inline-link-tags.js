/**
 * Get inline <link rel="preload" as="font"> tags based on server CSS manifest and next/font manifest. Only used when rendering to HTML.
 */ export function getPreloadedFontFilesInlineLinkTags(serverCSSManifest, nextFontManifest, serverCSSForEntries, filePath, injectedFontPreloadTags) {
    if (!nextFontManifest || !filePath) {
        return null;
    }
    const layoutOrPageCss = serverCSSManifest.cssImports[filePath];
    if (!layoutOrPageCss) {
        return null;
    }
    const fontFiles = new Set();
    let foundFontUsage = false;
    for (const css of layoutOrPageCss){
        // We only include the CSS if it is used by this entrypoint.
        if (serverCSSForEntries.includes(css)) {
            const preloadedFontFiles = nextFontManifest.app[css];
            if (preloadedFontFiles) {
                foundFontUsage = true;
                for (const fontFile of preloadedFontFiles){
                    if (!injectedFontPreloadTags.has(fontFile)) {
                        fontFiles.add(fontFile);
                        injectedFontPreloadTags.add(fontFile);
                    }
                }
            }
        }
    }
    // If we find an entry in the manifest but it's empty, add a preconnect tag by returning null.
    // Only render a preconnect tag if we previously didn't preload any fonts.
    if (!foundFontUsage || fontFiles.size === 0 && injectedFontPreloadTags.size > 0) {
        return null;
    }
    // Sorting to make order deterministic
    return [
        ...fontFiles
    ].sort();
}

//# sourceMappingURL=get-preloaded-font-files-inline-link-tags.js.map