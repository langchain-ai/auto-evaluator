import { PagesAPIRouteMatch } from '../route-matches/pages-api-route-match';
import { RouteHandler } from './route-handler';
export declare class PagesAPIRouteHandler implements RouteHandler<PagesAPIRouteMatch> {
    handle(): Promise<void>;
}
