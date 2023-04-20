declare const config: {
    addCompletionsAtPosition(fileName: string, position: number, prior: ts.WithMetadata<ts.CompletionInfo>): void;
    getQuickInfoAtPosition(fileName: string, position: number): import("typescript/lib/tsserverlibrary").QuickInfo | undefined;
    getCompletionEntryDetails(entryName: string, data: ts.CompletionEntryData): {
        name: string;
        kind: import("typescript/lib/tsserverlibrary").ScriptElementKind;
        kindModifiers: import("typescript/lib/tsserverlibrary").ScriptElementKindModifier;
        displayParts: never[];
        documentation: {
            kind: string;
            text: string;
        }[];
    } | undefined;
    getSemanticDiagnosticsForExportVariableStatement(source: ts.SourceFile, node: ts.VariableStatement): import("typescript/lib/tsserverlibrary").Diagnostic[];
};
export default config;
