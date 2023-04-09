import type { FlightRouterState, FlightData } from '../../../server/app-render/types';
/**
 * Fetch the flight data for the provided url. Takes in the current router state to decide what to render server-side.
 */
export declare function fetchServerResponse(url: URL, flightRouterState: FlightRouterState, nextUrl: string | null, prefetch?: true): Promise<[FlightData: FlightData, canonicalUrlOverride: URL | undefined]>;
