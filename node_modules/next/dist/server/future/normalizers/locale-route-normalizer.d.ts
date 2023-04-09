import { Normalizer } from './normalizer';
export interface LocaleRouteNormalizer extends Normalizer {
    readonly locales: ReadonlyArray<string>;
    readonly defaultLocale: string;
    match(pathname: string, options?: {
        inferDefaultLocale: boolean;
    }): {
        detectedLocale?: string;
        pathname: string;
    };
}
export declare class LocaleRouteNormalizer implements Normalizer {
    readonly locales: ReadonlyArray<string>;
    readonly defaultLocale: string;
    private readonly lowerCase;
    constructor(locales: ReadonlyArray<string>, defaultLocale: string);
    normalize(pathname: string): string;
}
