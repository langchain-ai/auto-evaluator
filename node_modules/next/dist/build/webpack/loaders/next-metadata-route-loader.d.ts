import type webpack from 'webpack';
declare type MetadataRouteLoaderOptions = {
    pageExtensions: string[];
};
declare const nextMetadataRouterLoader: webpack.LoaderDefinitionFunction<MetadataRouteLoaderOptions>;
export default nextMetadataRouterLoader;
