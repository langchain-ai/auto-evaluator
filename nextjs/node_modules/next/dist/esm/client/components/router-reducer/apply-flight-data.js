import { CacheStates } from '../../../shared/lib/app-router-context';
import { fillLazyItemsTillLeafWithHead } from './fill-lazy-items-till-leaf-with-head';
import { fillCacheWithNewSubTreeData } from './fill-cache-with-new-subtree-data';
export function applyFlightData(state, cache, flightDataPath, wasPrefetched) {
    // The one before last item is the router state tree patch
    const [treePatch, subTreeData, head] = flightDataPath.slice(-3);
    // Handles case where prefetch only returns the router tree patch without rendered components.
    if (subTreeData === null) {
        return false;
    }
    if (flightDataPath.length === 3) {
        cache.status = CacheStates.READY;
        cache.subTreeData = subTreeData;
        fillLazyItemsTillLeafWithHead(cache, state.cache, treePatch, head, wasPrefetched);
    } else {
        // Copy subTreeData for the root node of the cache.
        cache.status = CacheStates.READY;
        cache.subTreeData = state.cache.subTreeData;
        // Create a copy of the existing cache with the subTreeData applied.
        fillCacheWithNewSubTreeData(cache, state.cache, flightDataPath);
    }
    return true;
}

//# sourceMappingURL=apply-flight-data.js.map