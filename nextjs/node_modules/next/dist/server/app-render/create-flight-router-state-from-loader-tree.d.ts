import { LoaderTree } from '../lib/app-dir-module';
import { FlightRouterState, Segment } from './types';
import { GetDynamicParamFromSegment } from './app-render';
export declare function addSearchParamsIfPageSegment(segment: Segment, searchParams: any): string | [string, string, "c" | "oc" | "d"];
export declare function createFlightRouterStateFromLoaderTree([segment, parallelRoutes, { layout }]: LoaderTree, getDynamicParamFromSegment: GetDynamicParamFromSegment, searchParams: any, rootLayoutIncluded?: boolean): FlightRouterState;
