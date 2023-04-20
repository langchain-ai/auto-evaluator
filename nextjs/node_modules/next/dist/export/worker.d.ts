/// <reference types="node" />
import type { FontManifest, FontConfig } from '../server/font-utils';
import type { DomainLocale, ExportPathMap, NextConfigComplete } from '../server/config-shared';
import type { OutgoingHttpHeaders } from 'http';
import '../server/node-polyfill-fetch';
import AmpHtmlValidator from 'next/dist/compiled/amphtml-validator';
import { IncrementalCache } from '../server/lib/incremental-cache';
interface AmpValidation {
    page: string;
    result: {
        errors: AmpHtmlValidator.ValidationError[];
        warnings: AmpHtmlValidator.ValidationError[];
    };
}
declare type PathMap = ExportPathMap[keyof ExportPathMap];
interface ExportPageInput {
    path: string;
    pathMap: PathMap;
    distDir: string;
    outDir: string;
    pagesDataDir: string;
    renderOpts: RenderOpts;
    buildExport?: boolean;
    serverRuntimeConfig: {
        [key: string]: any;
    };
    subFolders?: boolean;
    optimizeFonts: FontConfig;
    optimizeCss: any;
    disableOptimizedLoading: any;
    parentSpanId: any;
    httpAgentOptions: NextConfigComplete['httpAgentOptions'];
    serverComponents?: boolean;
    enableUndici: NextConfigComplete['experimental']['enableUndici'];
    debugOutput?: boolean;
    isrMemoryCacheSize?: NextConfigComplete['experimental']['isrMemoryCacheSize'];
    fetchCache?: boolean;
    incrementalCacheHandlerPath?: string;
    nextConfigOutput?: NextConfigComplete['output'];
}
interface ExportPageResults {
    ampValidations: AmpValidation[];
    fromBuildExportRevalidate?: number | false;
    fromBuildExportMeta?: {
        status?: number;
        headers?: OutgoingHttpHeaders;
    };
    error?: boolean;
    ssgNotFound?: boolean;
    duration: number;
}
interface RenderOpts {
    runtimeConfig?: {
        [key: string]: any;
    };
    params?: {
        [key: string]: string | string[];
    };
    ampPath?: string;
    ampValidatorPath?: string;
    ampSkipValidation?: boolean;
    optimizeFonts?: FontConfig;
    disableOptimizedLoading?: boolean;
    optimizeCss?: any;
    fontManifest?: FontManifest;
    locales?: string[];
    locale?: string;
    defaultLocale?: string;
    domainLocales?: DomainLocale[];
    trailingSlash?: boolean;
    supportsDynamicHTML?: boolean;
    incrementalCache?: IncrementalCache;
    strictNextHead?: boolean;
}
export default function exportPage({ parentSpanId, path, pathMap, distDir, outDir, pagesDataDir, renderOpts, buildExport, serverRuntimeConfig, subFolders, optimizeFonts, optimizeCss, disableOptimizedLoading, httpAgentOptions, serverComponents, enableUndici, debugOutput, isrMemoryCacheSize, fetchCache, incrementalCacheHandlerPath, }: ExportPageInput): Promise<ExportPageResults>;
export {};
