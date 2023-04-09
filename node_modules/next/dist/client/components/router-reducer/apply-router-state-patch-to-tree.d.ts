import { FlightRouterState, FlightSegmentPath } from '../../../server/app-render';
/**
 * Apply the router state from the Flight response. Creates a new router state tree.
 */
export declare function applyRouterStatePatchToTree(flightSegmentPath: FlightSegmentPath, flightRouterState: FlightRouterState, treePatch: FlightRouterState): FlightRouterState | null;
