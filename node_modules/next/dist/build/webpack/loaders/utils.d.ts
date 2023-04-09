export declare function isClientComponentModule(mod: {
    resource: string;
    buildInfo: any;
}): boolean;
export declare const regexCSS: RegExp;
export declare function getActions(mod: {
    resource: string;
    buildInfo: any;
}): undefined | string[];
export declare function generateActionId(filePath: string, exportName: string): string;
