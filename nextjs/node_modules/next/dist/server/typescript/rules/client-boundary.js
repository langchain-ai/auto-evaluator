"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _constant = require("../constant");
var _utils = require("../utils");
const clientBoundary = {
    getSemanticDiagnosticsForExportVariableStatement (source, node) {
        const ts = (0, _utils).getTs();
        const diagnostics = [];
        if (ts.isVariableDeclarationList(node.declarationList)) {
            for (const declaration of node.declarationList.declarations){
                const initializer = declaration.initializer;
                if (initializer && ts.isArrowFunction(initializer)) {
                    diagnostics.push(...clientBoundary.getSemanticDiagnosticsForFunctionExport(source, initializer));
                }
            }
        }
        return diagnostics;
    },
    getSemanticDiagnosticsForFunctionExport (source, node) {
        var ref, ref1;
        const ts = (0, _utils).getTs();
        const typeChecker = (0, _utils).getTypeChecker();
        if (!typeChecker) return [];
        const diagnostics = [];
        const isErrorFile = /[\\/]error\.tsx?$/.test(source.fileName);
        const props = (ref = node.parameters) == null ? void 0 : (ref1 = ref[0]) == null ? void 0 : ref1.name;
        if (props && ts.isObjectBindingPattern(props)) {
            for (const prop of props.elements){
                var ref2, ref3;
                const type = typeChecker.getTypeAtLocation(prop);
                const typeDeclarationNode = (ref3 = (ref2 = type.symbol) == null ? void 0 : ref2.getDeclarations()) == null ? void 0 : ref3[0];
                const propName = (prop.propertyName || prop.name).getText();
                if (typeDeclarationNode) {
                    if (// Show warning for not serializable props.
                    ts.isFunctionOrConstructorTypeNode(typeDeclarationNode) || ts.isClassDeclaration(typeDeclarationNode)) {
                        // There's a special case for the error file that the `reset` prop is allowed
                        // to be a function:
                        // https://github.com/vercel/next.js/issues/46573
                        if (!isErrorFile || propName !== "reset") {
                            diagnostics.push({
                                file: source,
                                category: ts.DiagnosticCategory.Warning,
                                code: _constant.NEXT_TS_ERRORS.INVALID_CLIENT_ENTRY_PROP,
                                messageText: `Props must be serializable for components in the "use client" entry file, "${propName}" is invalid.`,
                                start: prop.getStart(),
                                length: prop.getWidth()
                            });
                        }
                    }
                }
            }
        }
        return diagnostics;
    }
};
var _default = clientBoundary;
exports.default = _default;

//# sourceMappingURL=client-boundary.js.map