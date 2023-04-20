declare const metadata: {
    filterCompletionsAtPosition(fileName: string, position: number, _options: any, prior: ts.WithMetadata<ts.CompletionInfo>): import("typescript/lib/tsserverlibrary").WithMetadata<import("typescript/lib/tsserverlibrary").CompletionInfo>;
    getSemanticDiagnosticsForExportVariableStatementInClientEntry(fileName: string, node: ts.VariableStatement | ts.FunctionDeclaration): {
        file: import("typescript/lib/tsserverlibrary").SourceFile | undefined;
        category: import("typescript/lib/tsserverlibrary").DiagnosticCategory;
        code: number;
        messageText: string;
        start: number;
        length: number;
    }[];
    getSemanticDiagnosticsForExportVariableStatement(fileName: string, node: ts.VariableStatement | ts.FunctionDeclaration): {
        file: import("typescript/lib/tsserverlibrary").SourceFile | undefined;
        category: import("typescript/lib/tsserverlibrary").DiagnosticCategory;
        code: number;
        messageText: string | import("typescript/lib/tsserverlibrary").DiagnosticMessageChain;
        start: number | undefined;
        length: number | undefined;
    }[];
    getSemanticDiagnosticsForExportDeclarationInClientEntry(fileName: string, node: ts.ExportDeclaration): import("typescript/lib/tsserverlibrary").Diagnostic[];
    getSemanticDiagnosticsForExportDeclaration(fileName: string, node: ts.ExportDeclaration): {
        file: import("typescript/lib/tsserverlibrary").SourceFile | undefined;
        category: import("typescript/lib/tsserverlibrary").DiagnosticCategory;
        code: number;
        messageText: string | import("typescript/lib/tsserverlibrary").DiagnosticMessageChain;
        start: number | undefined;
        length: number | undefined;
    }[];
    getCompletionEntryDetails(fileName: string, position: number, entryName: string, formatOptions: ts.FormatCodeOptions, source: string, preferences: ts.UserPreferences, data: ts.CompletionEntryData): import("typescript/lib/tsserverlibrary").CompletionEntryDetails | undefined;
    getQuickInfoAtPosition(fileName: string, position: number): import("typescript/lib/tsserverlibrary").QuickInfo | undefined;
    getDefinitionAndBoundSpan(fileName: string, position: number): import("typescript/lib/tsserverlibrary").DefinitionInfoAndBoundSpan | undefined;
};
export default metadata;
