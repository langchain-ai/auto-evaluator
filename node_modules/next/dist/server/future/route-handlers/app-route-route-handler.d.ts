import type { RequestAsyncStorage, RequestStore } from '../../../client/components/request-async-storage';
import type { Params } from '../../../shared/lib/router/utils/route-matcher';
import type { AsyncStorageWrapper } from '../../async-storage/async-storage-wrapper';
import { type RequestContext } from '../../async-storage/request-async-storage-wrapper';
import type { BaseNextRequest, BaseNextResponse } from '../../base-http';
import { AppRouteRouteMatch } from '../route-matches/app-route-route-match';
import { HTTP_METHOD } from '../../web/http';
import type { ModuleLoader } from '../helpers/module-loader/module-loader';
import { RouteHandler } from './route-handler';
import { StaticGenerationAsyncStorage } from '../../../client/components/static-generation-async-storage';
import { StaticGenerationAsyncStorageWrapper } from '../../async-storage/static-generation-async-storage-wrapper';
import { IncrementalCache } from '../../lib/incremental-cache';
import { AppConfig } from '../../../build/utils';
/**
 * Handler function for app routes.
 */
export declare type AppRouteHandlerFn = (
/**
 * Incoming request object.
 */
req: Request, 
/**
 * Context properties on the request (including the parameters if this was a
 * dynamic route).
 */
ctx: {
    params?: Params;
}) => Response;
/**
 * AppRouteModule is the specific userland module that is exported. This will
 * contain the HTTP methods that this route can respond to.
 */
export declare type AppRouteModule = {
    /**
     * Contains all the exported userland code.
     */
    handlers: Record<HTTP_METHOD, AppRouteHandlerFn> & Record<'dynamic', AppConfig['dynamic']> & Record<'revalidate', AppConfig['revalidate']>;
    /**
     * The exported async storage object for this worker/module.
     */
    requestAsyncStorage: RequestAsyncStorage;
    /**
     * The absolute path to the module file
     */
    resolvedPagePath: string;
    staticGenerationAsyncStorage: StaticGenerationAsyncStorage;
    serverHooks: typeof import('../../../client/components/hooks-server-context');
    headerHooks: typeof import('../../../client/components/headers');
    staticGenerationBailout: typeof import('../../../client/components/static-generation-bailout').staticGenerationBailout;
};
export declare type StaticGenerationContext = {
    incrementalCache?: IncrementalCache;
    supportsDynamicHTML: boolean;
    nextExport?: boolean;
};
export declare function sendResponse(req: BaseNextRequest, res: BaseNextResponse, response: Response): Promise<void>;
export declare class AppRouteRouteHandler implements RouteHandler<AppRouteRouteMatch> {
    private readonly requestAsyncLocalStorageWrapper;
    protected readonly staticAsyncLocalStorageWrapper: StaticGenerationAsyncStorageWrapper;
    protected readonly moduleLoader: ModuleLoader;
    constructor(requestAsyncLocalStorageWrapper?: AsyncStorageWrapper<RequestStore, RequestContext>, staticAsyncLocalStorageWrapper?: StaticGenerationAsyncStorageWrapper, moduleLoader?: ModuleLoader);
    private resolve;
    execute({ params, definition }: AppRouteRouteMatch, module: AppRouteModule, req: BaseNextRequest, res: BaseNextResponse, context?: StaticGenerationContext, request?: Request): Promise<Response>;
    handle(match: AppRouteRouteMatch, req: BaseNextRequest, res: BaseNextResponse, context?: StaticGenerationContext, bubbleResult?: boolean): Promise<any>;
}
