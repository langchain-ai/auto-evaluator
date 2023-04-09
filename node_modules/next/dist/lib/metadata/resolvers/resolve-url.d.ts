declare function isStringOrURL(icon: any): icon is string | URL;
declare function resolveUrl(url: null | undefined, metadataBase: URL | null): null;
declare function resolveUrl(url: string | URL, metadataBase: URL | null): URL;
declare function resolveUrl(url: string | URL | null | undefined, metadataBase: URL | null): URL | null;
export { isStringOrURL, resolveUrl };
