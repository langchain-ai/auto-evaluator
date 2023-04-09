import { COMPILER_INDEXES } from '../shared/lib/constants';
import { NextBuildContext } from './build-context';
import { TurbotraceContext } from './webpack/plugins/next-trace-entrypoints-plugin';
import * as pagesPluginModule from './webpack/plugins/pages-manifest-plugin';
export declare function workerMain(workerData: {
    compilerName: keyof typeof COMPILER_INDEXES;
    buildContext: typeof NextBuildContext;
}): Promise<{
    duration: number;
    pluginState: any;
    turbotraceContext?: TurbotraceContext | undefined;
    serializedPagesManifestEntries?: {
        edgeServerPages?: pagesPluginModule.PagesManifest | undefined;
        nodeServerPages?: pagesPluginModule.PagesManifest | undefined;
        edgeServerAppPaths?: pagesPluginModule.PagesManifest | undefined;
        nodeServerAppPaths?: pagesPluginModule.PagesManifest | undefined;
    } | undefined;
}>;
export declare function webpackBuild(): Promise<{
    duration: number;
    pluginState: any;
    turbotraceContext?: TurbotraceContext | undefined;
    serializedPagesManifestEntries?: {
        edgeServerPages?: pagesPluginModule.PagesManifest | undefined;
        nodeServerPages?: pagesPluginModule.PagesManifest | undefined;
        edgeServerAppPaths?: pagesPluginModule.PagesManifest | undefined;
        nodeServerAppPaths?: pagesPluginModule.PagesManifest | undefined;
    } | undefined;
} | {
    duration: number;
    turbotraceContext: any;
}>;
