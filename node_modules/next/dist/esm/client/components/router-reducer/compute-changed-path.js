import { INTERCEPTION_ROUTE_MARKERS } from '../../../server/future/helpers/interception-routes';
import { matchSegment } from '../match-segments';
const segmentToPathname = (segment)=>{
    if (typeof segment === 'string') {
        return segment;
    }
    return segment[1];
};
export function extractPathFromFlightRouterState(flightRouterState) {
    const segment = Array.isArray(flightRouterState[0]) ? flightRouterState[0][1] : flightRouterState[0];
    if (segment === '__DEFAULT__' || INTERCEPTION_ROUTE_MARKERS.some((m)=>segment.startsWith(m))) return undefined;
    if (segment === '__PAGE__') return '';
    const path = [
        segment
    ];
    var ref;
    const parallelRoutes = (ref = flightRouterState[1]) != null ? ref : {};
    const childrenPath = parallelRoutes.children ? extractPathFromFlightRouterState(parallelRoutes.children) : undefined;
    if (childrenPath !== undefined) {
        path.push(childrenPath);
    } else {
        for (const [key, value] of Object.entries(parallelRoutes)){
            if (key === 'children') continue;
            const childPath = extractPathFromFlightRouterState(value);
            if (childPath !== undefined) {
                path.push(childPath);
            }
        }
    }
    const finalPath = path.join('/');
    // it'll end up including a trailing slash because of '__PAGE__'
    return finalPath.endsWith('/') ? finalPath.slice(0, -1) : finalPath;
}
export function computeChangedPath(treeA, treeB) {
    const [segmentA, parallelRoutesA] = treeA;
    const [segmentB, parallelRoutesB] = treeB;
    const normalizedSegmentA = segmentToPathname(segmentA);
    const normalizedSegmentB = segmentToPathname(segmentB);
    if (INTERCEPTION_ROUTE_MARKERS.some((m)=>normalizedSegmentA.startsWith(m) || normalizedSegmentB.startsWith(m))) {
        return '';
    }
    if (!matchSegment(segmentA, segmentB)) {
        var ref;
        // once we find where the tree changed, we compute the rest of the path by traversing the tree
        return (ref = extractPathFromFlightRouterState(treeB)) != null ? ref : '';
    }
    for(const parallelRouterKey in parallelRoutesA){
        if (parallelRoutesB[parallelRouterKey]) {
            const changedPath = computeChangedPath(parallelRoutesA[parallelRouterKey], parallelRoutesB[parallelRouterKey]);
            if (changedPath !== null) {
                if (changedPath === '') {
                    return segmentToPathname(segmentB);
                }
                return `${segmentToPathname(segmentB)}/${changedPath}`;
            }
        }
    }
    return null;
}

//# sourceMappingURL=compute-changed-path.js.map