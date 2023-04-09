import type webpack from 'webpack';
import type { CollectingMetadata } from './types';
export declare const METADATA_RESOURCE_QUERY = "?__next_metadata";
export declare function createStaticMetadataFromRoute(resolvedDir: string, { segment, resolvePath, isRootLayer, loaderContext, pageExtensions, }: {
    segment: string;
    resolvePath: (pathname: string) => Promise<string>;
    isRootLayer: boolean;
    loaderContext: webpack.LoaderContext<any>;
    pageExtensions: string[];
}): Promise<CollectingMetadata | null>;
export declare function createMetadataExportsCode(metadata: Awaited<ReturnType<typeof createStaticMetadataFromRoute>>): string;
