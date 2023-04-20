/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { webpack } from 'next/dist/compiled/webpack/webpack';
interface Options {
    dev: boolean;
    appDir: string;
}
/**
 * Webpack module id
 */
declare type ModuleId = string | number;
export declare type ManifestChunks = Array<`${string}:${string}` | string>;
export interface ManifestNode {
    [moduleExport: string]: {
        /**
         * Webpack module id
         */
        id: ModuleId;
        /**
         * Export name
         */
        name: string;
        /**
         * Chunks for the module. JS and CSS.
         */
        chunks: ManifestChunks;
        /**
         * If chunk contains async module
         */
        async?: boolean;
    };
}
export declare type ClientReferenceManifest = {
    clientModules: ManifestNode;
    ssrModuleMapping: {
        [moduleId: string]: ManifestNode;
    };
    edgeSSRModuleMapping: {
        [moduleId: string]: ManifestNode;
    };
    cssFiles: {
        [entryPathWithoutExtension: string]: string[];
    };
};
export declare type ClientCSSReferenceManifest = {
    cssImports: {
        [modulePath: string]: string[];
    };
    cssModules?: {
        [entry: string]: string[];
    };
};
export declare class ClientReferenceManifestPlugin {
    dev: Options['dev'];
    appDir: Options['appDir'];
    ASYNC_CLIENT_MODULES: Set<string>;
    constructor(options: Options);
    apply(compiler: webpack.Compiler): void;
    createAsset(assets: webpack.Compilation['assets'], compilation: webpack.Compilation, context: string): void;
}
export {};
