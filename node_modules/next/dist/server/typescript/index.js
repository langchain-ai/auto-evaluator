"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createTSPlugin = createTSPlugin;
var _utils = require("./utils");
var _constant = require("./constant");
var _config = _interopRequireDefault(require("./rules/config"));
var _server = _interopRequireDefault(require("./rules/server"));
var _entry = _interopRequireDefault(require("./rules/entry"));
var _clientBoundary = _interopRequireDefault(require("./rules/client-boundary"));
var _metadata = _interopRequireDefault(require("./rules/metadata"));
var _error = _interopRequireDefault(require("./rules/error"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function createTSPlugin(modules) {
    const ts = modules.typescript;
    function create(info) {
        (0, _utils).init({
            ts,
            info
        });
        // Set up decorator object
        const proxy = Object.create(null);
        for (let k of Object.keys(info.languageService)){
            const x = info.languageService[k];
            proxy[k] = (...args)=>x.apply(info.languageService, args);
        }
        // Auto completion
        proxy.getCompletionsAtPosition = (fileName, position, options)=>{
            let prior = info.languageService.getCompletionsAtPosition(fileName, position, options) || {
                isGlobalCompletion: false,
                isMemberCompletion: false,
                isNewIdentifierLocation: false,
                entries: []
            };
            if (!(0, _utils).isAppEntryFile(fileName)) return prior;
            // If it's a server entry.
            if (!(0, _utils).getIsClientEntry(fileName)) {
                // Remove specified entries from completion list
                prior.entries = _server.default.filterCompletionsAtPosition(prior.entries);
                // Provide autocompletion for metadata fields
                prior = _metadata.default.filterCompletionsAtPosition(fileName, position, options, prior);
            }
            // Add auto completions for export configs.
            _config.default.addCompletionsAtPosition(fileName, position, prior);
            const source = (0, _utils).getSource(fileName);
            if (!source) return prior;
            ts.forEachChild(source, (node)=>{
                // Auto completion for default export function's props.
                if ((0, _utils).isPositionInsideNode(position, node) && (0, _utils).isDefaultFunctionExport(node)) {
                    prior.entries.push(..._entry.default.getCompletionsAtPosition(fileName, node, position));
                }
            });
            return prior;
        };
        // Show auto completion details
        proxy.getCompletionEntryDetails = (fileName, position, entryName, formatOptions, source, preferences, data)=>{
            const entryCompletionEntryDetails = _config.default.getCompletionEntryDetails(entryName, data);
            if (entryCompletionEntryDetails) return entryCompletionEntryDetails;
            const metadataCompletionEntryDetails = _metadata.default.getCompletionEntryDetails(fileName, position, entryName, formatOptions, source, preferences, data);
            if (metadataCompletionEntryDetails) return metadataCompletionEntryDetails;
            return info.languageService.getCompletionEntryDetails(fileName, position, entryName, formatOptions, source, preferences, data);
        };
        // Quick info
        proxy.getQuickInfoAtPosition = (fileName, position)=>{
            const prior = info.languageService.getQuickInfoAtPosition(fileName, position);
            if (!(0, _utils).isAppEntryFile(fileName)) return prior;
            // Remove type suggestions for disallowed APIs in server components.
            if (!(0, _utils).getIsClientEntry(fileName)) {
                const definitions = info.languageService.getDefinitionAtPosition(fileName, position);
                if (definitions && _server.default.hasDisallowedReactAPIDefinition(definitions)) {
                    return;
                }
                const metadataInfo = _metadata.default.getQuickInfoAtPosition(fileName, position);
                if (metadataInfo) return metadataInfo;
            }
            const overriden = _config.default.getQuickInfoAtPosition(fileName, position);
            if (overriden) return overriden;
            return prior;
        };
        // Show errors for disallowed imports
        proxy.getSemanticDiagnostics = (fileName)=>{
            const prior = info.languageService.getSemanticDiagnostics(fileName);
            const source = (0, _utils).getSource(fileName);
            if (!source) return prior;
            let isClientEntry = false;
            const isAppEntry = (0, _utils).isAppEntryFile(fileName);
            try {
                isClientEntry = (0, _utils).getIsClientEntry(fileName, true);
            } catch (e) {
                prior.push({
                    file: source,
                    category: ts.DiagnosticCategory.Error,
                    code: _constant.NEXT_TS_ERRORS.MISPLACED_CLIENT_ENTRY,
                    ...e
                });
                isClientEntry = false;
            }
            if ((0, _utils).isInsideApp(fileName)) {
                const errorDiagnostic = _error.default.getSemanticDiagnostics(source, isClientEntry);
                prior.push(...errorDiagnostic);
            }
            ts.forEachChild(source, (node)=>{
                var ref, ref1;
                if (ts.isImportDeclaration(node)) {
                    // import ...
                    if (isAppEntry) {
                        if (!isClientEntry) {
                            // Check if it has valid imports in the server layer
                            const diagnostics = _server.default.getSemanticDiagnosticsForImportDeclaration(source, node);
                            prior.push(...diagnostics);
                        }
                    }
                } else if (ts.isVariableStatement(node) && ((ref = node.modifiers) == null ? void 0 : ref.some((m)=>m.kind === ts.SyntaxKind.ExportKeyword))) {
                    // export const ...
                    if (isAppEntry) {
                        // Check if it has correct option exports
                        const diagnostics = _config.default.getSemanticDiagnosticsForExportVariableStatement(source, node);
                        const metadataDiagnostics = isClientEntry ? _metadata.default.getSemanticDiagnosticsForExportVariableStatementInClientEntry(fileName, node) : _metadata.default.getSemanticDiagnosticsForExportVariableStatement(fileName, node);
                        prior.push(...diagnostics, ...metadataDiagnostics);
                    }
                    if (isClientEntry) {
                        prior.push(..._clientBoundary.default.getSemanticDiagnosticsForExportVariableStatement(source, node));
                    }
                } else if ((0, _utils).isDefaultFunctionExport(node)) {
                    // export default function ...
                    if (isAppEntry) {
                        const diagnostics = _entry.default.getSemanticDiagnostics(fileName, source, node);
                        prior.push(...diagnostics);
                    }
                    if (isClientEntry) {
                        prior.push(..._clientBoundary.default.getSemanticDiagnosticsForFunctionExport(source, node));
                    }
                } else if (ts.isFunctionDeclaration(node) && ((ref1 = node.modifiers) == null ? void 0 : ref1.some((m)=>m.kind === ts.SyntaxKind.ExportKeyword))) {
                    // export function ...
                    if (isAppEntry) {
                        const metadataDiagnostics = isClientEntry ? _metadata.default.getSemanticDiagnosticsForExportVariableStatementInClientEntry(fileName, node) : _metadata.default.getSemanticDiagnosticsForExportVariableStatement(fileName, node);
                        prior.push(...metadataDiagnostics);
                    }
                    if (isClientEntry) {
                        prior.push(..._clientBoundary.default.getSemanticDiagnosticsForFunctionExport(source, node));
                    }
                } else if (ts.isExportDeclaration(node)) {
                    // export { ... }
                    if (isAppEntry) {
                        const metadataDiagnostics = isClientEntry ? _metadata.default.getSemanticDiagnosticsForExportDeclarationInClientEntry(fileName, node) : _metadata.default.getSemanticDiagnosticsForExportDeclaration(fileName, node);
                        prior.push(...metadataDiagnostics);
                    }
                }
            });
            return prior;
        };
        // Get definition and link for specific node
        proxy.getDefinitionAndBoundSpan = (fileName, position)=>{
            if ((0, _utils).isAppEntryFile(fileName) && !(0, _utils).getIsClientEntry(fileName)) {
                const metadataDefinition = _metadata.default.getDefinitionAndBoundSpan(fileName, position);
                if (metadataDefinition) return metadataDefinition;
            }
            return info.languageService.getDefinitionAndBoundSpan(fileName, position);
        };
        return proxy;
    }
    return {
        create
    };
}

//# sourceMappingURL=index.js.map