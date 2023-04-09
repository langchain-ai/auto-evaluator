declare const clientBoundary: {
    getSemanticDiagnosticsForExportVariableStatement(source: ts.SourceFile, node: ts.VariableStatement): import("typescript/lib/tsserverlibrary").Diagnostic[];
    getSemanticDiagnosticsForFunctionExport(source: ts.SourceFile, node: ts.FunctionDeclaration | ts.ArrowFunction): import("typescript/lib/tsserverlibrary").Diagnostic[];
};
export default clientBoundary;
