import { CacheNode } from '../../../shared/lib/app-router-context';
import { FlightSegmentPath } from '../../../server/app-render';
/**
 * Fill cache up to the end of the flightSegmentPath, invalidating anything below it.
 */
export declare function invalidateCacheBelowFlightSegmentPath(newCache: CacheNode, existingCache: CacheNode, flightSegmentPath: FlightSegmentPath): void;
