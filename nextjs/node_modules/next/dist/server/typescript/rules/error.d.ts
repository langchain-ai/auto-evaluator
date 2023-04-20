declare const errorEntry: {
    getSemanticDiagnostics(source: ts.SourceFile, isClientEntry: boolean): import("typescript/lib/tsserverlibrary").Diagnostic[];
};
export default errorEntry;
