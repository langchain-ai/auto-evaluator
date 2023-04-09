export declare type EdgeAppRouteLoaderQuery = {
    absolutePagePath: string;
    page: string;
    appDirLoader: string;
};
export default function edgeAppRouteLoader(this: any): Promise<string>;
