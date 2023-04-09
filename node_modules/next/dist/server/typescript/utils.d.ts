declare type TypeScript = typeof import('typescript/lib/tsserverlibrary');
declare let ts: TypeScript;
export declare function log(message: string): void;
export declare function init(opts: {
    ts: TypeScript;
    info: ts.server.PluginCreateInfo;
}): void;
export declare function getTs(): typeof import("typescript/lib/tsserverlibrary");
export declare function getInfo(): import("typescript/lib/tsserverlibrary").server.PluginCreateInfo;
export declare function getTypeChecker(): import("typescript/lib/tsserverlibrary").TypeChecker | undefined;
export declare function getSource(fileName: string): import("typescript/lib/tsserverlibrary").SourceFile | undefined;
export declare function removeStringQuotes(str: string): string;
export declare const isPositionInsideNode: (position: number, node: ts.Node) => boolean;
export declare const isDefaultFunctionExport: (node: ts.Node) => node is import("typescript/lib/tsserverlibrary").FunctionDeclaration;
export declare const isInsideApp: (filePath: string) => boolean;
export declare const isAppEntryFile: (filePath: string) => boolean;
export declare const isPageFile: (filePath: string) => boolean;
export declare function getIsClientEntry(fileName: string, throwOnInvalidDirective?: boolean): boolean;
export {};
