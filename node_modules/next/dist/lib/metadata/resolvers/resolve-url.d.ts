declare function isStringOrURL(icon: any): icon is string | URL;
declare function resolveUrl(url: string | URL | null | undefined, metadataBase: URL | null): URL | null;
export { isStringOrURL, resolveUrl };
