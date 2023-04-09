/// <reference types="node" />
/// <reference types="node" />
import type { NextConfig } from './config';
import type { ParsedUrlQuery } from 'querystring';
import type { BaseNextRequest, BaseNextResponse } from './base-http';
import type { RouteMatchFn, Params } from '../shared/lib/router/utils/route-matcher';
import type { RouteHas } from '../lib/load-custom-routes';
import { NextUrlWithParsedQuery } from './request-meta';
import { RouteMatcherManager } from './future/route-matcher-managers/route-matcher-manager';
import { LocaleRouteNormalizer } from './future/normalizers/locale-route-normalizer';
declare type RouteResult = {
    finished: boolean;
    pathname?: string;
    query?: ParsedUrlQuery;
};
export declare type Route = {
    match: RouteMatchFn;
    has?: RouteHas[];
    missing?: RouteHas[];
    type: string;
    check?: boolean;
    statusCode?: number;
    name: string;
    matchesBasePath?: true;
    matchesLocale?: true;
    matchesLocaleAPIRoutes?: true;
    matchesTrailingSlash?: true;
    internal?: true;
    fn: (req: BaseNextRequest, res: BaseNextResponse, params: Params, parsedUrl: NextUrlWithParsedQuery, upgradeHead?: Buffer) => Promise<RouteResult> | RouteResult;
};
export declare type RouterOptions = {
    headers: ReadonlyArray<Route>;
    fsRoutes: ReadonlyArray<Route>;
    rewrites: {
        beforeFiles: ReadonlyArray<Route>;
        afterFiles: ReadonlyArray<Route>;
        fallback: ReadonlyArray<Route>;
    };
    redirects: ReadonlyArray<Route>;
    catchAllRoute: Route;
    catchAllMiddleware: ReadonlyArray<Route>;
    matchers: RouteMatcherManager;
    useFileSystemPublicRoutes: boolean;
    nextConfig: NextConfig;
    localeNormalizer?: LocaleRouteNormalizer;
};
export declare type PageChecker = (pathname: string) => Promise<boolean>;
export default class Router {
    catchAllMiddleware: ReadonlyArray<Route>;
    private readonly headers;
    private readonly fsRoutes;
    private readonly redirects;
    private readonly rewrites;
    private readonly catchAllRoute;
    private readonly matchers;
    private readonly useFileSystemPublicRoutes;
    private readonly nextConfig;
    private readonly localeNormalizer?;
    private compiledRoutes;
    private needsRecompilation;
    constructor({ headers, fsRoutes, rewrites, redirects, catchAllRoute, catchAllMiddleware, matchers, useFileSystemPublicRoutes, nextConfig, localeNormalizer, }: RouterOptions);
    get basePath(): string;
    setCatchallMiddleware(catchAllMiddleware: ReadonlyArray<Route>): void;
    addFsRoute(fsRoute: Route): void;
    private compileRoutes;
    private checkFsRoutes;
    execute(req: BaseNextRequest, res: BaseNextResponse, parsedUrl: NextUrlWithParsedQuery, upgradeHead?: Buffer): Promise<boolean>;
}
export declare const makeResolver: any;
export {};
