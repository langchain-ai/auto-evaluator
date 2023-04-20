import type { BaseNextRequest } from '../../base-http';
import type { ModuleLoader } from '../helpers/module-loader/module-loader';
import type { RouteMatch } from '../route-matches/route-match';
import type { AppRouteRouteHandlerContext } from '../route-modules/app-route/module';
/**
 * RouteHandlerManager is a manager for route handlers.
 */
export declare type RouteHandlerManagerContext = AppRouteRouteHandlerContext;
export declare class RouteHandlerManager {
    private readonly moduleLoader;
    constructor(moduleLoader?: ModuleLoader);
    handle(match: RouteMatch, req: BaseNextRequest, context: RouteHandlerManagerContext): Promise<Response | undefined>;
}
