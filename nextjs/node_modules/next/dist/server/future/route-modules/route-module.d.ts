import type { RouteDefinition } from '../route-definitions/route-definition';
import type { NextRequest } from '../../web/spec-extension/request';
import type { Params } from '../../../shared/lib/router/utils/route-matcher';
/**
 * RouteModuleOptions is the options that are passed to the route module, other
 * route modules should extend this class to add specific options for their
 * route.
 */
export interface RouteModuleOptions<U = unknown> {
    readonly userland: Readonly<U>;
}
/**
 * RouteHandlerContext is the base context for a route handler.
 */
export interface RouteModuleHandleContext {
    /**
     * Any matched parameters for the request. This is only defined for dynamic
     * routes.
     */
    params: Params | undefined;
}
/**
 * RouteModule is the base class for all route modules. This class should be
 * extended by all route modules.
 */
export declare abstract class RouteModule<D extends RouteDefinition = RouteDefinition, U = unknown> {
    /**
     * A reference to the request async storage.
     */
    readonly requestAsyncStorage: import("../../../client/components/request-async-storage").RequestAsyncStorage;
    /**
     * A reference to the static generation async storage.
     */
    readonly staticGenerationAsyncStorage: import("../../../client/components/static-generation-async-storage").StaticGenerationAsyncStorage;
    /**
     * An interface to call server hooks which interact with the underlying
     * storage.
     */
    readonly serverHooks: typeof import("../../../client/components/hooks-server-context");
    /**
     * An interface to call header hooks which interact with the underlying
     * request storage.
     */
    readonly headerHooks: typeof import("../../../client/components/headers");
    /**
     * An interface to call static generation bailout hooks which interact with
     * the underlying static generation storage.
     */
    readonly staticGenerationBailout: import("../../../client/components/static-generation-bailout").StaticGenerationBailout;
    /**
     * The userland module. This is the module that is exported from the user's
     * code. This is marked as readonly to ensure that the module is not mutated
     * because the module (when compiled) only provides getters.
     */
    readonly userland: Readonly<U>;
    /**
     * The definition of the route.
     */
    abstract readonly definition: D;
    /**
     * Setup will setup the route handler. This could patch any globals or perform
     * validation of the userland module. It is the responsibility of the module
     * to ensure that this is only called once.
     */
    abstract setup(): Promise<void>;
    /**
     * Handle will handle the request and return a response.
     */
    abstract handle(req: NextRequest, context: RouteModuleHandleContext): Promise<Response>;
    constructor({ userland }: RouteModuleOptions<U>);
}
