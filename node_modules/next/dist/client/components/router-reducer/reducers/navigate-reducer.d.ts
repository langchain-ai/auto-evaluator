import { CacheNode } from '../../../../shared/lib/app-router-context';
import type { FlightDataPath } from '../../../../server/app-render';
import { Mutable, NavigateAction, ReadonlyReducerState, ReducerState } from '../router-reducer-types';
export declare function handleMutable(state: ReadonlyReducerState, mutable: Mutable): ReducerState;
export declare function applyFlightData(state: ReadonlyReducerState, cache: CacheNode, flightDataPath: FlightDataPath): boolean;
export declare function handleExternalUrl(state: ReadonlyReducerState, mutable: Mutable, url: string, pendingPush: boolean): import("../router-reducer-types").AppRouterState;
export declare function navigateReducer(state: ReadonlyReducerState, action: NavigateAction): ReducerState;
