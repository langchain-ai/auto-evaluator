/**
 *
 * Metadata types
 *
 */
export interface DeprecatedMetadataFields {
    /**
     * Deprecated options that have a preferred method
     * @deprecated Use appWebApp to configure apple-mobile-web-app-capable which provides
     * @see https://www.appsloveworld.com/coding/iphone/11/difference-between-apple-mobile-web-app-capable-and-apple-touch-fullscreen-ipho
     */
    'apple-touch-fullscreen'?: never;
    /**
     * Obsolete since iOS 7.
     * @see https://web.dev/apple-touch-icon/
     * @deprecated use icons.apple or instead
     */
    'apple-touch-icon-precomposed'?: never;
}
export declare type TemplateString = DefaultTemplateString | AbsoluteTemplateString | AbsoluteString;
export declare type DefaultTemplateString = {
    default: string;
    template: string;
};
export declare type AbsoluteTemplateString = {
    absolute: string;
    template: string | null;
};
export declare type AbsoluteString = {
    absolute: string;
};
export declare type Author = {
    url?: string | URL;
    name?: string;
};
export declare type ReferrerEnum = 'no-referrer' | 'origin' | 'no-referrer-when-downgrade' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin';
export declare type ColorSchemeEnum = 'normal' | 'light' | 'dark' | 'light dark' | 'dark light' | 'only light';
declare type RobotsInfo = {
    index?: boolean;
    follow?: boolean;
    /** @deprecated set index to false instead */
    noindex?: never;
    /** @deprecated set follow to false instead */
    nofollow?: never;
    noarchive?: boolean;
    nosnippet?: boolean;
    noimageindex?: boolean;
    nocache?: boolean;
    notranslate?: boolean;
    indexifembedded?: boolean;
    nositelinkssearchbox?: boolean;
    unavailable_after?: string;
    'max-video-preview'?: number | string;
    'max-image-preview'?: 'none' | 'standard' | 'large';
    'max-snippet'?: number;
};
export declare type Robots = RobotsInfo & {
    googleBot?: string | RobotsInfo;
};
export declare type ResolvedRobots = {
    basic: string | null;
    googleBot: string | null;
};
export declare type IconURL = string | URL;
export declare type Icon = IconURL | IconDescriptor;
export declare type IconDescriptor = {
    url: string | URL;
    type?: string;
    sizes?: string;
    /** defaults to rel="icon" unless superseded by Icons map */
    rel?: string;
    media?: string;
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/fetchPriority
     */
    fetchPriority?: 'high' | 'low' | 'auto';
};
export declare type Icons = {
    /** rel="icon" */
    icon?: Icon | Icon[];
    /** rel="shortcut icon" */
    shortcut?: Icon | Icon[];
    /**
     * @see https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
     * rel="apple-touch-icon"
     */
    apple?: Icon | Icon[];
    /** rel inferred from descriptor, defaults to "icon" */
    other?: IconDescriptor | IconDescriptor[];
};
export declare type Verification = {
    google?: null | string | number | (string | number)[];
    yahoo?: null | string | number | (string | number)[];
    yandex?: null | string | number | (string | number)[];
    me?: null | string | number | (string | number)[];
    other?: {
        [name: string]: string | number | (string | number)[];
    };
};
export declare type ResolvedVerification = {
    google?: null | (string | number)[];
    yahoo?: null | (string | number)[];
    yandex?: null | (string | number)[];
    me?: null | (string | number)[];
    other?: {
        [name: string]: (string | number)[];
    };
};
export declare type ResolvedIcons = {
    icon: IconDescriptor[];
    apple: IconDescriptor[];
    shortcut?: IconDescriptor[];
    other?: IconDescriptor[];
};
export declare type ThemeColorDescriptor = {
    color: string;
    media?: string;
};
export {};
