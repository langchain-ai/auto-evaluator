import React from 'react';
import type { EmotionCache } from '@emotion/cache';
import type { MantineThemeOverride, MantineTheme } from './types';
export declare function useMantineTheme(): MantineTheme;
export declare function useMantineProviderStyles(component: string | string[]): {
    styles: Record<string, import("..").CSSObject> | ((theme: MantineTheme, params: any, context: import("./types").ContextStylesParams) => Record<string, import("..").CSSObject>);
    classNames: Record<string, string>;
    variants: Record<PropertyKey, (theme: MantineTheme, params: any, context: import("./types").ContextStylesParams) => Record<string, import("..").CSSObject>>;
    sizes: Record<PropertyKey, (theme: MantineTheme, params: any, context: import("./types").ContextStylesParams) => Record<string, import("..").CSSObject>>;
}[];
export declare function useMantineEmotionCache(): EmotionCache;
export declare function useComponentDefaultProps<T extends Record<string, any>, U extends Partial<T> = {}>(component: string, defaultProps: U, props: T): T & {
    [Key in Extract<keyof T, keyof U>]-?: U[Key] | NonNullable<T[Key]>;
};
export interface MantineProviderProps {
    theme?: MantineThemeOverride;
    emotionCache?: EmotionCache;
    withNormalizeCSS?: boolean;
    withGlobalStyles?: boolean;
    withCSSVariables?: boolean;
    children: React.ReactNode;
    inherit?: boolean;
}
export declare function MantineProvider({ theme, emotionCache, withNormalizeCSS, withGlobalStyles, withCSSVariables, inherit, children, }: MantineProviderProps): JSX.Element;
export declare namespace MantineProvider {
    var displayName: string;
}
//# sourceMappingURL=MantineProvider.d.ts.map