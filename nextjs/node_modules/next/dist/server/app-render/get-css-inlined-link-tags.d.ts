import { ClientCSSReferenceManifest, ClientReferenceManifest } from '../../build/webpack/plugins/flight-manifest-plugin';
/**
 * Get inline <link> tags based on server CSS manifest. Only used when rendering to HTML.
 */
export declare function getCssInlinedLinkTags(clientReferenceManifest: ClientReferenceManifest, serverCSSManifest: ClientCSSReferenceManifest, filePath: string, serverCSSForEntries: string[], injectedCSS: Set<string>, collectNewCSSImports?: boolean): string[];
