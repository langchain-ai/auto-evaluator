import { NextConfig } from '../../../../server/config-shared';
import { webpack } from 'next/dist/compiled/webpack/webpack';
export declare type EdgeAppRouteLoaderQuery = {
    absolutePagePath: string;
    page: string;
    appDirLoader: string;
    nextConfigOutput: NextConfig['output'];
};
declare const EdgeAppRouteLoader: webpack.LoaderDefinitionFunction<EdgeAppRouteLoaderQuery>;
export default EdgeAppRouteLoader;
