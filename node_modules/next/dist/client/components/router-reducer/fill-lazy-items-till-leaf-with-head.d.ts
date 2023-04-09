/// <reference types="react" />
import { CacheNode } from '../../../shared/lib/app-router-context';
import { FlightRouterState } from '../../../server/app-render';
export declare function fillLazyItemsTillLeafWithHead(newCache: CacheNode, existingCache: CacheNode | undefined, routerState: FlightRouterState, head: React.ReactNode): void;
