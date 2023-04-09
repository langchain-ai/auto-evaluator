import { LocaleRouteNormalizer } from '../normalizers/locale-route-normalizer';
import { PagesRouteMatcher } from '../route-matchers/pages-route-matcher';
import { Manifest, ManifestLoader } from './helpers/manifest-loaders/manifest-loader';
import { ManifestRouteMatcherProvider } from './manifest-route-matcher-provider';
export declare class PagesRouteMatcherProvider extends ManifestRouteMatcherProvider<PagesRouteMatcher> {
    private readonly distDir;
    private readonly localeNormalizer?;
    constructor(distDir: string, manifestLoader: ManifestLoader, localeNormalizer?: LocaleRouteNormalizer | undefined);
    protected transform(manifest: Manifest): Promise<ReadonlyArray<PagesRouteMatcher>>;
}
