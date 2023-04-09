import type webpack from 'webpack';
import type { ValueOf } from '../../../shared/lib/constants';
import type { ModuleReference, CollectedMetadata } from './metadata/types';
export declare type AppLoaderOptions = {
    name: string;
    pagePath: string;
    appDir: string;
    appPaths: string[] | null;
    pageExtensions: string[];
    basePath: string;
    assetPrefix: string;
    rootDir?: string;
    tsconfigPath?: string;
    isDev?: boolean;
};
declare type AppLoader = webpack.LoaderDefinitionFunction<AppLoaderOptions>;
declare const FILE_TYPES: {
    readonly layout: "layout";
    readonly template: "template";
    readonly error: "error";
    readonly loading: "loading";
    readonly head: "head";
    readonly 'not-found': "not-found";
};
export declare type ComponentsType = {
    readonly [componentKey in ValueOf<typeof FILE_TYPES>]?: ModuleReference;
} & {
    readonly page?: ModuleReference;
} & {
    readonly metadata?: CollectedMetadata;
};
declare const nextAppLoader: AppLoader;
export default nextAppLoader;
