declare const serverLayer: {
    filterCompletionsAtPosition(entries: ts.CompletionEntry[]): import("typescript/lib/tsserverlibrary").CompletionEntry[];
    hasDisallowedReactAPIDefinition(definitions: readonly ts.DefinitionInfo[]): boolean;
    getSemanticDiagnosticsForImportDeclaration(source: ts.SourceFile, node: ts.ImportDeclaration): import("typescript/lib/tsserverlibrary").Diagnostic[];
};
export default serverLayer;
