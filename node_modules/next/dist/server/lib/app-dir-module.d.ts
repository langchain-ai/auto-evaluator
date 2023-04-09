import { ComponentsType } from '../../build/webpack/loaders/next-app-loader';
/**
 * LoaderTree is generated in next-app-loader.
 */
export declare type LoaderTree = [
    segment: string,
    parallelRoutes: {
        [parallelRouterKey: string]: LoaderTree;
    },
    components: ComponentsType
];
export declare function getLayoutOrPageModule(loaderTree: LoaderTree): Promise<any>;
