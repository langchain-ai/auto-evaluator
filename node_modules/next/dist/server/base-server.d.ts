/// <reference types="node" />
/// <reference types="node" />
import type { __ApiPreviewProps } from './api-utils';
import type { CustomRoutes } from '../lib/load-custom-routes';
import type { DomainLocale } from './config';
import type { RouterOptions } from './router';
import type { FontManifest, FontConfig } from './font-utils';
import type { LoadComponentsReturnType } from './load-components';
import type { RouteMatchFn } from '../shared/lib/router/utils/route-matcher';
import type { MiddlewareRouteMatch } from '../shared/lib/router/utils/middleware-route-matcher';
import type { Params } from '../shared/lib/router/utils/route-matcher';
import type { NextConfig, NextConfigComplete } from './config-shared';
import type { NextParsedUrlQuery, NextUrlWithParsedQuery } from './request-meta';
import type { ParsedUrlQuery } from 'querystring';
import type { RenderOpts, RenderOptsPartial } from './render';
import type { ResponseCacheBase } from './response-cache';
import type { UrlWithParsedQuery } from 'url';
import type { ServerRuntime } from 'next/types';
import type { PagesManifest } from '../build/webpack/plugins/pages-manifest-plugin';
import type { BaseNextRequest, BaseNextResponse } from './base-http';
import type { PayloadOptions } from './send-payload';
import type { PrerenderManifest } from '../build';
import type { NextFontManifest } from '../build/webpack/plugins/next-font-manifest-plugin';
import Router from './router';
import RenderResult from './render-result';
import { ImageConfigComplete } from '../shared/lib/image-config';
import { MiddlewareMatcher } from '../build/analysis/get-page-static-info';
import { RouteMatcherManager } from './future/route-matcher-managers/route-matcher-manager';
import { RouteHandlerManager } from './future/route-handler-managers/route-handler-manager';
import { LocaleRouteNormalizer } from './future/normalizers/locale-route-normalizer';
export declare type FindComponentsResult = {
    components: LoadComponentsReturnType;
    query: NextParsedUrlQuery;
};
export interface RoutingItem {
    page: string;
    match: RouteMatchFn;
    re?: RegExp;
}
export interface MiddlewareRoutingItem {
    page: string;
    match: MiddlewareRouteMatch;
    matchers?: MiddlewareMatcher[];
}
export interface Options {
    /**
     * Object containing the configuration next.config.js
     */
    conf: NextConfig;
    /**
     * Set to false when the server was created by Next.js
     */
    customServer?: boolean;
    /**
     * Tells if Next.js is running in dev mode
     */
    dev?: boolean;
    /**
     * Where the Next project is located
     */
    dir?: string;
    /**
     * Tells if Next.js is running in a Serverless platform
     */
    minimalMode?: boolean;
    /**
     * Hide error messages containing server information
     */
    quiet?: boolean;
    /**
     * The hostname the server is running behind
     */
    hostname?: string;
    /**
     * The port the server is running behind
     */
    port?: number;
    /**
     * The HTTP Server that Next.js is running behind
     */
    httpServer?: import('http').Server;
}
export interface BaseRequestHandler {
    (req: BaseNextRequest, res: BaseNextResponse, parsedUrl?: NextUrlWithParsedQuery | undefined): Promise<void>;
}
export declare type RequestContext = {
    req: BaseNextRequest;
    res: BaseNextResponse;
    pathname: string;
    query: NextParsedUrlQuery;
    renderOpts: RenderOptsPartial;
};
export declare class NoFallbackError extends Error {
}
export declare class WrappedBuildError extends Error {
    innerError: Error;
    constructor(innerError: Error);
}
declare type ResponsePayload = {
    type: 'html' | 'json' | 'rsc';
    body: RenderResult;
    revalidateOptions?: any;
};
export default abstract class Server<ServerOptions extends Options = Options> {
    protected readonly dir: string;
    protected readonly quiet: boolean;
    protected readonly nextConfig: NextConfigComplete;
    protected readonly distDir: string;
    protected readonly publicDir: string;
    protected readonly hasStaticDir: boolean;
    protected readonly hasAppDir: boolean;
    protected readonly pagesManifest?: PagesManifest;
    protected readonly appPathsManifest?: PagesManifest;
    protected readonly buildId: string;
    protected readonly minimalMode: boolean;
    protected readonly renderOpts: {
        poweredByHeader: boolean;
        buildId: string;
        generateEtags: boolean;
        runtimeConfig?: {
            [key: string]: any;
        };
        assetPrefix?: string;
        canonicalBase: string;
        dev?: boolean;
        previewProps: __ApiPreviewProps;
        customServer?: boolean;
        ampOptimizerConfig?: {
            [key: string]: any;
        };
        basePath: string;
        optimizeFonts: FontConfig;
        images: ImageConfigComplete;
        fontManifest?: FontManifest;
        disableOptimizedLoading?: boolean;
        optimizeCss: any;
        nextConfigOutput: 'standalone' | 'export';
        nextScriptWorkers: any;
        locale?: string;
        locales?: string[];
        defaultLocale?: string;
        domainLocales?: DomainLocale[];
        distDir: string;
        runtime?: ServerRuntime;
        serverComponents?: boolean;
        crossOrigin?: string;
        supportsDynamicHTML?: boolean;
        isBot?: boolean;
        serverComponentManifest?: any;
        serverCSSManifest?: any;
        serverActionsManifest?: any;
        nextFontManifest?: NextFontManifest;
        renderServerComponentData?: boolean;
        serverComponentProps?: any;
        largePageDataBytes?: number;
        appDirDevErrorLogger?: (err: any) => Promise<void>;
    };
    protected serverOptions: ServerOptions;
    private responseCache;
    protected router: Router;
    protected appPathRoutes?: Record<string, string[]>;
    protected customRoutes: CustomRoutes;
    protected serverComponentManifest?: any;
    protected serverCSSManifest?: any;
    protected nextFontManifest?: NextFontManifest;
    readonly hostname?: string;
    readonly port?: number;
    protected abstract getPublicDir(): string;
    protected abstract getHasStaticDir(): boolean;
    protected abstract getHasAppDir(dev: boolean): boolean;
    protected abstract getPagesManifest(): PagesManifest | undefined;
    protected abstract getAppPathsManifest(): PagesManifest | undefined;
    protected abstract getBuildId(): string;
    protected abstract getFilesystemPaths(): Set<string>;
    protected abstract findPageComponents(params: {
        pathname: string;
        query: NextParsedUrlQuery;
        params: Params;
        isAppPath: boolean;
        sriEnabled?: boolean;
        appPaths?: string[] | null;
        shouldEnsure: boolean;
    }): Promise<FindComponentsResult | null>;
    protected abstract getFontManifest(): FontManifest | undefined;
    protected abstract getPrerenderManifest(): PrerenderManifest;
    protected abstract getServerComponentManifest(): any;
    protected abstract getServerCSSManifest(): any;
    protected abstract getNextFontManifest(): NextFontManifest | undefined;
    protected abstract attachRequestMeta(req: BaseNextRequest, parsedUrl: NextUrlWithParsedQuery): void;
    protected abstract getFallback(page: string): Promise<string>;
    protected abstract getCustomRoutes(): CustomRoutes;
    protected abstract hasPage(pathname: string): Promise<boolean>;
    protected abstract generateRoutes(): RouterOptions;
    protected abstract sendRenderResult(req: BaseNextRequest, res: BaseNextResponse, options: {
        result: RenderResult;
        type: 'html' | 'json' | 'rsc';
        generateEtags: boolean;
        poweredByHeader: boolean;
        options?: PayloadOptions;
    }): Promise<void>;
    protected abstract runApi(req: BaseNextRequest, res: BaseNextResponse, query: ParsedUrlQuery, params: Params | undefined, page: string, builtPagePath: string): Promise<boolean>;
    protected abstract renderHTML(req: BaseNextRequest, res: BaseNextResponse, pathname: string, query: NextParsedUrlQuery, renderOpts: RenderOpts): Promise<RenderResult | null>;
    protected abstract handleCompression(req: BaseNextRequest, res: BaseNextResponse): void;
    protected abstract getIncrementalCache(options: {
        requestHeaders: Record<string, undefined | string | string[]>;
    }): import('./lib/incremental-cache').IncrementalCache;
    protected abstract getResponseCache(options: {
        dev: boolean;
    }): ResponseCacheBase;
    protected abstract loadEnvConfig(params: {
        dev: boolean;
        forceReload?: boolean;
    }): void;
    readonly matchers: RouteMatcherManager;
    protected readonly handlers: RouteHandlerManager;
    protected readonly localeNormalizer?: LocaleRouteNormalizer;
    constructor(options: ServerOptions);
    protected getRoutes(): {
        matchers: RouteMatcherManager;
        handlers: RouteHandlerManager;
    };
    logError(err: Error): void;
    handleRequest(req: BaseNextRequest, res: BaseNextResponse, parsedUrl?: NextUrlWithParsedQuery): Promise<void>;
    private handleRequestImpl;
    getRequestHandler(): BaseRequestHandler;
    protected handleUpgrade(_req: BaseNextRequest, _socket: any, _head?: any): Promise<void>;
    setAssetPrefix(prefix?: string): void;
    prepare(): Promise<void>;
    protected close(): Promise<void>;
    protected getPreviewProps(): __ApiPreviewProps;
    protected _beforeCatchAllRender(_req: BaseNextRequest, _res: BaseNextResponse, _params: Params, _parsedUrl: UrlWithParsedQuery): Promise<boolean>;
    protected getAppPathRoutes(): Record<string, string[]>;
    protected run(req: BaseNextRequest, res: BaseNextResponse, parsedUrl: UrlWithParsedQuery): Promise<void>;
    private runImpl;
    private pipe;
    private pipeImpl;
    private getStaticHTML;
    render(req: BaseNextRequest, res: BaseNextResponse, pathname: string, query?: NextParsedUrlQuery, parsedUrl?: NextUrlWithParsedQuery, internalRender?: boolean): Promise<void>;
    private renderImpl;
    protected getStaticPaths({ pathname, }: {
        pathname: string;
        requestHeaders: import('./lib/incremental-cache').IncrementalCache['requestHeaders'];
        originalAppPath?: string;
    }): Promise<{
        staticPaths?: string[];
        fallbackMode?: 'static' | 'blocking' | false;
    }>;
    private renderToResponseWithComponents;
    private renderToResponseWithComponentsImpl;
    private stripNextDataPath;
    protected getOriginalAppPaths(route: string): string[] | null;
    protected renderPageComponent(ctx: RequestContext, bubbleNoFallback: boolean): Promise<false | ResponsePayload | null>;
    private renderToResponse;
    private renderToResponseImpl;
    renderToHTML(req: BaseNextRequest, res: BaseNextResponse, pathname: string, query?: ParsedUrlQuery): Promise<string | null>;
    private renderToHTMLImpl;
    renderError(err: Error | null, req: BaseNextRequest, res: BaseNextResponse, pathname: string, query?: NextParsedUrlQuery, setHeaders?: boolean): Promise<void>;
    private renderErrorImpl;
    private customErrorNo404Warn;
    private renderErrorToResponse;
    private renderErrorToResponseImpl;
    renderErrorToHTML(err: Error | null, req: BaseNextRequest, res: BaseNextResponse, pathname: string, query?: ParsedUrlQuery): Promise<string | null>;
    protected getFallbackErrorComponents(): Promise<LoadComponentsReturnType | null>;
    render404(req: BaseNextRequest, res: BaseNextResponse, parsedUrl?: NextUrlWithParsedQuery, setHeaders?: boolean): Promise<void>;
}
export {};
