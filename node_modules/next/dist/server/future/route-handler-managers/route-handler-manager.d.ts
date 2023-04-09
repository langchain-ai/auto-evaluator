import { BaseNextRequest, BaseNextResponse } from '../../base-http';
import { RouteKind } from '../route-kind';
import { RouteMatch } from '../route-matches/route-match';
import { RouteDefinition } from '../route-definitions/route-definition';
import { RouteHandler } from '../route-handlers/route-handler';
export declare class RouteHandlerManager {
    private readonly handlers;
    set<K extends RouteKind, D extends RouteDefinition<K>, M extends RouteMatch<D>, H extends RouteHandler<M>>(kind: K, handler: H): void;
    handle(match: RouteMatch, req: BaseNextRequest, res: BaseNextResponse, context?: any, bubbleResult?: boolean): Promise<boolean>;
}
