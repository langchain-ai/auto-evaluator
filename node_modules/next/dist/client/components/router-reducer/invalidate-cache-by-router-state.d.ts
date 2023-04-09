import { CacheNode } from '../../../shared/lib/app-router-context';
import { FlightRouterState } from '../../../server/app-render';
/**
 * Invalidate cache one level down from the router state.
 */
export declare function invalidateCacheByRouterState(newCache: CacheNode, existingCache: CacheNode, routerState: FlightRouterState): void;
