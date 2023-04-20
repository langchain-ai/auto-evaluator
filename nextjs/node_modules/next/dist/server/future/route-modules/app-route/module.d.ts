import type { Params } from '../../../../shared/lib/router/utils/route-matcher';
import type { NextConfig } from '../../../config-shared';
import type { AppRouteRouteDefinition } from '../../route-definitions/app-route-route-definition';
import type { AppConfig } from '../../../../build/utils';
import type { NextRequest } from '../../../web/spec-extension/request';
import { RouteModule, type RouteModuleHandleContext, type RouteModuleOptions } from '../route-module';
import { type StaticGenerationContext } from '../../../async-storage/static-generation-async-storage-wrapper';
import { type HTTP_METHOD } from '../../../web/http';
/**
 * AppRouteRouteHandlerContext is the context that is passed to the route
 * handler for app routes.
 */
export interface AppRouteRouteHandlerContext extends RouteModuleHandleContext {
    staticGenerationContext: StaticGenerationContext['renderOpts'];
}
/**
 * AppRouteHandlerFnContext is the context that is passed to the handler as the
 * second argument.
 */
interface AppRouteHandlerFnContext {
    params?: Params;
}
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
ctx: AppRouteHandlerFnContext) => Response;
/**
 * AppRouteHandlers describes the handlers for app routes that is provided by
 * the userland module.
 */
export declare type AppRouteHandlers = {
    [method in HTTP_METHOD]?: AppRouteHandlerFn;
};
/**
 * AppRouteUserlandModule is the userland module that is provided for app
 * routes. This contains all the user generated code.
 */
export declare type AppRouteUserlandModule = AppRouteHandlers & Pick<AppConfig, 'dynamic' | 'revalidate' | 'dynamicParams' | 'fetchCache'> & {
    generateStaticParams?: any;
};
/**
 * AppRouteRouteModuleOptions is the options that are passed to the app route
 * module from the bundled code.
 */
export interface AppRouteRouteModuleOptions extends RouteModuleOptions<AppRouteUserlandModule> {
    readonly pathname: string;
    readonly resolvedPagePath: string;
    readonly nextConfigOutput: NextConfig['output'];
}
/**
 * AppRouteRouteHandler is the handler for app routes.
 */
export declare class AppRouteRouteModule extends RouteModule<AppRouteRouteDefinition, AppRouteUserlandModule> {
    readonly definition: AppRouteRouteDefinition;
    readonly pathname: string;
    readonly resolvedPagePath: string;
    readonly nextConfigOutput: NextConfig['output'] | undefined;
    private readonly methods;
    private readonly nonStaticMethods;
    private readonly dynamic;
    constructor({ userland, pathname, resolvedPagePath, nextConfigOutput, }: AppRouteRouteModuleOptions);
    /**
     * When true, indicates that the global interfaces have been patched via the
     * `patch()` method.
     */
    private hasSetup;
    /**
     * Validates the userland module to ensure the exported methods and properties
     * are valid.
     */
    setup(): Promise<void>;
    /**
     * Resolves the handler function for the given method.
     *
     * @param method the requested method
     * @returns the handler function for the given method
     */
    private resolve;
    /**
     * Executes the route handler.
     */
    private execute;
    handle(request: NextRequest, context: AppRouteRouteHandlerContext): Promise<Response>;
}
export default AppRouteRouteModule;
