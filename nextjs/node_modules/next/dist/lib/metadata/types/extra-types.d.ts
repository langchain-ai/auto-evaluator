export declare type AppLinks = {
    ios?: AppLinksApple | Array<AppLinksApple>;
    iphone?: AppLinksApple | Array<AppLinksApple>;
    ipad?: AppLinksApple | Array<AppLinksApple>;
    android?: AppLinksAndroid | Array<AppLinksAndroid>;
    windows_phone?: AppLinksWindows | Array<AppLinksWindows>;
    windows?: AppLinksWindows | Array<AppLinksWindows>;
    windows_universal?: AppLinksWindows | Array<AppLinksWindows>;
    web?: AppLinksWeb | Array<AppLinksWeb>;
};
export declare type ResolvedAppLinks = {
    ios?: Array<AppLinksApple>;
    iphone?: Array<AppLinksApple>;
    ipad?: Array<AppLinksApple>;
    android?: Array<AppLinksAndroid>;
    windows_phone?: Array<AppLinksWindows>;
    windows?: Array<AppLinksWindows>;
    windows_universal?: Array<AppLinksWindows>;
    web?: Array<AppLinksWeb>;
};
export declare type AppLinksApple = {
    url: string | URL;
    app_store_id?: string | number;
    app_name?: string;
};
export declare type AppLinksAndroid = {
    package: string;
    url?: string | URL;
    class?: string;
    app_name?: string;
};
export declare type AppLinksWindows = {
    url: string | URL;
    app_id?: string;
    app_name?: string;
};
export declare type AppLinksWeb = {
    url: string | URL;
    should_fallback?: boolean;
};
export declare type ItunesApp = {
    appId: string;
    appArgument?: string;
};
export declare type Viewport = {
    width?: string | number;
    height?: string | number;
    initialScale?: number;
    minimumScale?: number;
    maximumScale?: number;
    userScalable?: boolean;
    viewportFit?: 'auto' | 'cover' | 'contain';
    interactiveWidget?: 'resizes-visual' | 'resizes-content' | 'overlays-content';
};
export declare type AppleWebApp = {
    capable?: boolean;
    title?: string;
    startupImage?: AppleImage | Array<AppleImage>;
    statusBarStyle?: 'default' | 'black' | 'black-translucent';
};
export declare type AppleImage = string | AppleImageDescriptor;
export declare type AppleImageDescriptor = {
    url: string;
    media?: string;
};
export declare type ResolvedAppleWebApp = {
    capable: boolean;
    title?: string | null;
    startupImage?: AppleImageDescriptor[] | null;
    statusBarStyle?: 'default' | 'black' | 'black-translucent';
};
export declare type FormatDetection = {
    telephone?: boolean;
    date?: boolean;
    address?: boolean;
    email?: boolean;
    url?: boolean;
};
