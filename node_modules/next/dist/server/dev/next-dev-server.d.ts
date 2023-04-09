/// <reference types="node" />
/// <reference types="node" />
import type { __ApiPreviewProps } from '../api-utils';
import type { CustomRoutes } from '../../lib/load-custom-routes';
import type { FindComponentsResult } from '../next-server';
import type { LoadComponentsReturnType } from '../load-components';
import type { Options as ServerOptions } from '../next-server';
import type { Params } from '../../shared/lib/router/utils/route-matcher';
import type { ParsedUrl } from '../../shared/lib/router/utils/parse-url';
import type { ParsedUrlQuery } from 'querystring';
import type { UrlWithParsedQuery } from 'url';
import type { BaseNextRequest, BaseNextResponse } from '../base-http';
import type { MiddlewareRoutingItem } from '../base-server';
import Server from '../next-server';
import { NodeNextResponse, NodeNextRequest } from '../base-http/node';
import { DevRouteMatcherManager } from '../future/route-matcher-managers/dev-route-matcher-manager';
import { PagesManifest } from '../../build/webpack/plugins/pages-manifest-plugin';
import { IncrementalCache } from '../lib/incremental-cache';
export interface Options extends ServerOptions {
    /**
     * Tells of Next.js is running from the `next dev` command
     */
    isNextDevCommand?: boolean;
}
export default class DevServer extends Server {
    private devReady;
    private setDevReady?;
    private webpackWatcher?;
    private hotReloader?;
    private isCustomServer;
    protected sortedRoutes?: string[];
    private addedUpgradeListener;
    private pagesDir?;
    private appDir?;
    private actualMiddlewareFile?;
    private actualInstrumentationHookFile?;
    private middleware?;
    private edgeFunctions?;
    private verifyingTypeScript?;
    private usingTypeScript?;
    private originalFetch?;
    private staticPathsCache;
    protected staticPathsWorker?: {
        [key: string]: any;
    } & {
        loadStaticPaths: typeof import('./static-paths-worker').loadStaticPaths;
    };
    private getStaticPathsWorker;
    constructor(options: Options);
    protected getRoutes(): {
        matchers: DevRouteMatcherManager;
        handlers: import("../future/route-handler-managers/route-handler-manager").RouteHandlerManager;
    };
    protected getBuildId(): string;
    addExportPathMapRoutes(): Promise<void>;
    startWatcher(): Promise<void>;
    stopWatcher(): Promise<void>;
    private verifyTypeScript;
    prepare(): Promise<void>;
    protected close(): Promise<void>;
    protected hasPage(pathname: string): Promise<boolean>;
    protected _beforeCatchAllRender(req: BaseNextRequest, res: BaseNextResponse, params: Params, parsedUrl: UrlWithParsedQuery): Promise<boolean>;
    private setupWebSocketHandler;
    runMiddleware(params: {
        request: BaseNextRequest;
        response: BaseNextResponse;
        parsedUrl: ParsedUrl;
        parsed: UrlWithParsedQuery;
        middlewareList: MiddlewareRoutingItem[];
    }): Promise<import("../web/types").FetchEventResult | {
        finished: boolean;
    }>;
    runEdgeFunction(params: {
        req: BaseNextRequest;
        res: BaseNextResponse;
        query: ParsedUrlQuery;
        params: Params | undefined;
        page: string;
        appPaths: string[] | null;
        isAppPath: boolean;
    }): Promise<import("../web/types").FetchEventResult | null>;
    run(req: NodeNextRequest, res: NodeNextResponse, parsedUrl: UrlWithParsedQuery): Promise<void>;
    private logErrorWithOriginalStack;
    protected getCustomRoutes(): CustomRoutes;
    private _devCachedPreviewProps;
    protected getPreviewProps(): __ApiPreviewProps;
    protected getPagesManifest(): PagesManifest | undefined;
    protected getAppPathsManifest(): PagesManifest | undefined;
    protected getMiddleware(): MiddlewareRoutingItem | undefined;
    protected getEdgeFunctionsPages(): string[];
    protected getServerComponentManifest(): undefined;
    protected getServerCSSManifest(): undefined;
    protected getNextFontManifest(): undefined;
    protected hasMiddleware(): Promise<boolean>;
    protected ensureMiddleware(): Promise<void | undefined>;
    private runInstrumentationHookIfAvailable;
    protected ensureEdgeFunction({ page, appPaths, }: {
        page: string;
        appPaths: string[] | null;
    }): Promise<void | undefined>;
    generateRoutes(): {
        headers: readonly import("../router").Route[];
        rewrites: {
            beforeFiles: readonly import("../router").Route[];
            afterFiles: readonly import("../router").Route[];
            fallback: readonly import("../router").Route[];
        };
        redirects: readonly import("../router").Route[];
        catchAllRoute: import("../router").Route;
        catchAllMiddleware: readonly import("../router").Route[];
        matchers: import("../future/route-matcher-managers/route-matcher-manager").RouteMatcherManager;
        useFileSystemPublicRoutes: boolean;
        nextConfig: import("../config-shared").NextConfig;
        localeNormalizer?: import("../future/normalizers/locale-route-normalizer").LocaleRouteNormalizer | undefined;
        fsRoutes: import("../router").Route[];
    };
    protected generatePublicRoutes(): never[];
    _filterAmpDevelopmentScript(html: string, event: {
        line: number;
        col: number;
        code: string;
    }): boolean;
    protected getStaticPaths({ pathname, originalAppPath, requestHeaders, }: {
        pathname: string;
        originalAppPath?: string;
        requestHeaders: IncrementalCache['requestHeaders'];
    }): Promise<{
        staticPaths?: string[];
        fallbackMode?: false | 'static' | 'blocking';
    }>;
    private persistPatchedGlobals;
    private restorePatchedGlobals;
    protected findPageComponents({ pathname, query, params, isAppPath, appPaths, shouldEnsure, }: {
        pathname: string;
        query: ParsedUrlQuery;
        params: Params;
        isAppPath: boolean;
        appPaths?: string[] | null;
        shouldEnsure: boolean;
    }): Promise<FindComponentsResult | null>;
    protected getFallbackErrorComponents(): Promise<LoadComponentsReturnType | null>;
    protected setImmutableAssetCacheControl(res: BaseNextResponse): void;
    private servePublic;
    hasPublicFile(path: string): Promise<boolean>;
    getCompilationError(page: string): Promise<any>;
    protected isServableUrl(untrustedFileUrl: string): boolean;
}
