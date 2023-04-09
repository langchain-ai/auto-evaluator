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
interface ManifestNode {
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
export declare type FlightManifest = {
    __ssr_module_mapping__: {
        [modulePath: string]: ManifestNode;
    };
    __edge_ssr_module_mapping__: {
        [modulePath: string]: ManifestNode;
    };
    __entry_css_files__: {
        [entryPathWithoutExtension: string]: string[];
    };
} & ManifestNode;
export declare type FlightCSSManifest = {
    [modulePath: string]: string[];
} & {
    __entry_css_mods__?: {
        [entry: string]: string[];
    };
};
export declare class FlightManifestPlugin {
    dev: Options['dev'];
    appDir: Options['appDir'];
    ASYNC_CLIENT_MODULES: Set<string>;
    constructor(options: Options);
    apply(compiler: webpack.Compiler): void;
    createAsset(assets: webpack.Compilation['assets'], compilation: webpack.Compilation, context: string): void;
}
export {};
