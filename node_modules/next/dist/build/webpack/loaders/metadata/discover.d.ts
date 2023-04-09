import type webpack from 'webpack';
import type { AppLoaderOptions } from '../next-app-loader';
import type { CollectingMetadata } from './types';
export declare const METADATA_IMAGE_RESOURCE_QUERY = "?__next_metadata";
export declare function discoverStaticMetadataFiles(resolvedDir: string, { resolvePath, isRootLayer, loaderContext, loaderOptions, }: {
    resolvePath: (pathname: string) => Promise<string>;
    isRootLayer: boolean;
    loaderContext: webpack.LoaderContext<any>;
    loaderOptions: AppLoaderOptions;
}): Promise<CollectingMetadata | null>;
export declare function buildMetadata(metadata: Awaited<ReturnType<typeof discoverStaticMetadataFiles>>): string;
