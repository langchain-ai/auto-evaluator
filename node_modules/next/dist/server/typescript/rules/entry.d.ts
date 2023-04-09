declare const entry: {
    getCompletionsAtPosition(fileName: string, node: ts.FunctionDeclaration, position: number): import("typescript/lib/tsserverlibrary").CompletionEntry[];
    getSemanticDiagnostics(fileName: string, source: ts.SourceFile, node: ts.FunctionDeclaration): import("typescript/lib/tsserverlibrary").Diagnostic[];
};
export default entry;
