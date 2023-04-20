import type { FieldResolver, FieldResolverWithMetadataBase } from '../types/resolvers';
export declare const resolveThemeColor: FieldResolver<'themeColor'>;
export declare const resolveViewport: FieldResolver<'viewport'>;
export declare const resolveAlternates: FieldResolverWithMetadataBase<'alternates', {
    pathname: string;
}>;
export declare const resolveRobots: FieldResolver<'robots'>;
export declare const resolveVerification: FieldResolver<'verification'>;
export declare const resolveAppleWebApp: FieldResolver<'appleWebApp'>;
export declare const resolveAppLinks: FieldResolver<'appLinks'>;
