import { PagesAPIRouteMatcher } from '../route-matchers/pages-api-route-matcher';
import { Manifest, ManifestLoader } from './helpers/manifest-loaders/manifest-loader';
import { ManifestRouteMatcherProvider } from './manifest-route-matcher-provider';
import { LocaleRouteNormalizer } from '../normalizers/locale-route-normalizer';
export declare class PagesAPIRouteMatcherProvider extends ManifestRouteMatcherProvider<PagesAPIRouteMatcher> {
    private readonly distDir;
    private readonly localeNormalizer?;
    constructor(distDir: string, manifestLoader: ManifestLoader, localeNormalizer?: LocaleRouteNormalizer | undefined);
    protected transform(manifest: Manifest): Promise<ReadonlyArray<PagesAPIRouteMatcher>>;
}
