export declare function getParserOptions({ filename, jsConfig, ...rest }: any): any;
export declare function getJestSWCOptions({ isServer, filename, esm, nextConfig, jsConfig, resolvedBaseUrl, pagesDir, hasServerComponents, }: any): {
    env: {
        targets: {
            node: string;
        };
    };
    module: {
        type: string;
    };
    disableNextSsg: boolean;
    disablePageConfig: boolean;
    pagesDir: any;
    serverComponents: {
        isServer: boolean;
    } | undefined;
    serverActions: {
        isServer: boolean;
    } | undefined;
    emotion?: {
        enabled: boolean;
        autoLabel: boolean;
        importMap: any;
        labelFormat: any;
        sourcemap: any;
    } | null | undefined;
    styledComponents?: any;
    jsc: {
        externalHelpers: boolean;
        parser: any;
        experimental: {
            keepImportAssertions: boolean;
            plugins: any;
            cacheRoot: any;
        };
        transform: {
            legacyDecorator: boolean;
            decoratorMetadata: boolean;
            useDefineForClassFields: boolean;
            react: {
                importSource: any;
                runtime: string;
                pragma: string;
                pragmaFrag: string;
                throwIfNamespace: boolean;
                development: boolean;
                useBuiltins: boolean;
                refresh: boolean;
            };
            optimizer: {
                simplify: boolean;
                globals: {
                    typeofs: {
                        window: string;
                    };
                    envs: {
                        NODE_ENV: string;
                    };
                } | null;
            };
            regenerator: {
                importPath: string;
            };
            hidden?: {
                jest: boolean;
            } | undefined;
        };
        baseUrl?: any;
        paths?: any;
    };
    sourceMaps: string | undefined;
    removeConsole: any;
    reactRemoveProperties: any;
    modularizeImports: any;
    relay: any;
    styledJsx: boolean;
};
export declare function getLoaderSWCOptions({ filename, development, isServer, pagesDir, appDir, isPageFile, hasReactRefresh, nextConfig, jsConfig, supportedBrowsers, swcCacheDir, relativeFilePathFromRoot, hasServerComponents, isServerLayer, }: any): any;
