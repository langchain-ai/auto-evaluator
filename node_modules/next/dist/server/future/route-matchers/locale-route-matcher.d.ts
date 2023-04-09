import { LocaleRouteDefinition } from '../route-definitions/locale-route-definition';
import { LocaleRouteMatch } from '../route-matches/locale-route-match';
import { RouteMatcher } from './route-matcher';
export declare type LocaleMatcherMatchOptions = {
    /**
     * If defined, this indicates to the matcher that the request should be
     * treated as locale-aware. If this is undefined, it means that this
     * application was not configured for additional locales.
     */
    i18n?: {
        /**
         * The locale that was detected on the incoming route. If undefined it means
         * that the locale should be considered to be the default one.
         */
        detectedLocale?: string;
        /**
         * The pathname that has had it's locale information stripped from.
         */
        pathname: string;
    };
};
export declare class LocaleRouteMatcher<D extends LocaleRouteDefinition = LocaleRouteDefinition> extends RouteMatcher<D> {
    /**
     * Identity returns the identity part of the matcher. This is used to compare
     * a unique matcher to another. This is also used when sorting dynamic routes,
     * so it must contain the pathname part as well.
     */
    get identity(): string;
    match(pathname: string, options?: LocaleMatcherMatchOptions): LocaleRouteMatch<D> | null;
    test(pathname: string, options?: LocaleMatcherMatchOptions): {
        params?: import("../../../shared/lib/router/utils/route-matcher").Params | undefined;
    } | null;
}
