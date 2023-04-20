import { NextFontManifest } from '../../build/webpack/plugins/next-font-manifest-plugin';
import { ClientCSSReferenceManifest } from '../../build/webpack/plugins/flight-manifest-plugin';
/**
 * Get inline <link rel="preload" as="font"> tags based on server CSS manifest and next/font manifest. Only used when rendering to HTML.
 */
export declare function getPreloadedFontFilesInlineLinkTags(serverCSSManifest: ClientCSSReferenceManifest, nextFontManifest: NextFontManifest | undefined, serverCSSForEntries: string[], filePath: string | undefined, injectedFontPreloadTags: Set<string>): string[] | null;
