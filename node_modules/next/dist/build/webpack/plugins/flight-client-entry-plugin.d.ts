import type { CssImports, ClientComponentImports } from '../loaders/next-flight-client-entry-loader';
import { webpack } from 'next/dist/compiled/webpack/webpack';
interface Options {
    dev: boolean;
    appDir: string;
    isEdgeServer: boolean;
}
export declare type ActionManifest = {
    [actionId: string]: {
        workers: {
            [name: string]: string | number;
        };
    };
};
export declare class FlightClientEntryPlugin {
    dev: boolean;
    appDir: string;
    isEdgeServer: boolean;
    constructor(options: Options);
    apply(compiler: webpack.Compiler): void;
    createClientEntries(compiler: webpack.Compiler, compilation: any): Promise<void>;
    collectComponentInfoFromDependencies({ entryRequest, compilation, dependency, clientEntryDependencyMap, }: {
        entryRequest: string;
        compilation: any;
        dependency: any;
        clientEntryDependencyMap?: Record<string, any>;
    }): {
        clientImports: ClientComponentImports;
        cssImports: CssImports;
        actionImports: [string, string[]][];
    };
    injectClientEntryAndSSRModules({ compiler, compilation, entryName, clientImports, bundlePath, absolutePagePath, }: {
        compiler: webpack.Compiler;
        compilation: webpack.Compilation;
        entryName: string;
        clientImports: ClientComponentImports;
        bundlePath: string;
        absolutePagePath?: string;
    }): [shouldInvalidate: boolean, addEntryPromise: Promise<void>];
    injectActionEntry({ compiler, compilation, actions, entryName, bundlePath, }: {
        compiler: webpack.Compiler;
        compilation: webpack.Compilation;
        actions: Map<string, string[]>;
        entryName: string;
        bundlePath: string;
    }): Promise<any>;
    addEntry(compilation: any, context: string, dependency: webpack.Dependency, options: webpack.EntryOptions): Promise<any>;
    createAsset(compilation: webpack.Compilation, assets: webpack.Compilation['assets']): void;
}
export {};
