/// <reference types="react" />
import type { LoadComponentsReturnType } from '../load-components';
import type { ServerRuntime } from '../../../types';
import type { ClientCSSReferenceManifest, ClientReferenceManifest } from '../../build/webpack/plugins/flight-manifest-plugin';
import type { NextFontManifest } from '../../build/webpack/plugins/next-font-manifest-plugin';
import zod from 'next/dist/compiled/zod';
export declare type DynamicParamTypes = 'catchall' | 'optional-catchall' | 'dynamic';
declare const dynamicParamTypesSchema: zod.ZodEnum<["c", "oc", "d"]>;
/**
 * c = catchall
 * oc = optional catchall
 * d = dynamic
 */
export declare type DynamicParamTypesShort = zod.infer<typeof dynamicParamTypesSchema>;
declare const segmentSchema: zod.ZodUnion<[zod.ZodString, zod.ZodTuple<[zod.ZodString, zod.ZodString, zod.ZodEnum<["c", "oc", "d"]>], null>]>;
/**
 * Segment in the router state.
 */
export declare type Segment = zod.infer<typeof segmentSchema>;
export declare const flightRouterStateSchema: zod.ZodType<FlightRouterState>;
/**
 * Router state
 */
export declare type FlightRouterState = [
    segment: Segment,
    parallelRoutes: {
        [parallelRouterKey: string]: FlightRouterState;
    },
    url?: string | null,
    refresh?: 'refetch' | null,
    isRootLayout?: boolean
];
/**
 * Individual Flight response path
 */
export declare type FlightSegmentPath = any[] | [
    segment: Segment,
    parallelRouterKey: string,
    segment: Segment,
    parallelRouterKey: string,
    segment: Segment,
    parallelRouterKey: string
];
export declare type FlightDataPath = any[] | [
    ...FlightSegmentPath[],
    Segment,
    FlightRouterState,
    React.ReactNode | null,
    // Can be null during prefetch if there's no loading component
    React.ReactNode | null
];
/**
 * The Flight response data
 */
export declare type FlightData = Array<FlightDataPath> | string;
/**
 * Property holding the current subTreeData.
 */
export declare type ChildProp = {
    /**
     * Null indicates that the tree is partial
     */
    current: React.ReactNode | null;
    segment: Segment;
};
export declare type RenderOptsPartial = {
    err?: Error | null;
    dev?: boolean;
    clientReferenceManifest?: ClientReferenceManifest;
    serverCSSManifest?: ClientCSSReferenceManifest;
    supportsDynamicHTML: boolean;
    runtime?: ServerRuntime;
    serverComponents?: boolean;
    assetPrefix?: string;
    nextFontManifest?: NextFontManifest;
    isBot?: boolean;
    incrementalCache?: import('../lib/incremental-cache').IncrementalCache;
    isRevalidate?: boolean;
    nextExport?: boolean;
    nextConfigOutput?: 'standalone' | 'export';
    appDirDevErrorLogger?: (err: any) => Promise<void>;
};
export declare type RenderOpts = LoadComponentsReturnType & RenderOptsPartial;
export {};
