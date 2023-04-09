import '../lib/setup-exception-listeners';
import { __ApiPreviewProps } from '../server/api-utils';
export declare type SsgRoute = {
    initialRevalidateSeconds: number | false;
    srcRoute: string | null;
    dataRoute: string | null;
    initialStatus?: number;
    initialHeaders?: Record<string, string>;
};
export declare type DynamicSsgRoute = {
    routeRegex: string;
    fallback: string | null | false;
    dataRoute: string | null;
    dataRouteRegex: string | null;
};
export declare type PrerenderManifest = {
    version: 4;
    routes: {
        [route: string]: SsgRoute;
    };
    dynamicRoutes: {
        [route: string]: DynamicSsgRoute;
    };
    notFoundRoutes: string[];
    preview: __ApiPreviewProps;
};
export default function build(dir: string, reactProductionProfiling?: boolean, debugOutput?: boolean, runLint?: boolean, noMangling?: boolean, appDirOnly?: boolean): Promise<void>;
