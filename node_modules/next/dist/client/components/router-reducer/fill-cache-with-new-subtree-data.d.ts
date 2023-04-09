import { CacheNode } from '../../../shared/lib/app-router-context';
import { FlightDataPath } from '../../../server/app-render';
/**
 * Fill cache with subTreeData based on flightDataPath
 */
export declare function fillCacheWithNewSubTreeData(newCache: CacheNode, existingCache: CacheNode, flightDataPath: FlightDataPath): void;
