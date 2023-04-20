import { CacheNode } from '../../../shared/lib/app-router-context';
import { FlightDataPath } from '../../../server/app-render/types';
import { ReadonlyReducerState } from './router-reducer-types';
export declare function applyFlightData(state: ReadonlyReducerState, cache: CacheNode, flightDataPath: FlightDataPath, wasPrefetched?: boolean): boolean;
