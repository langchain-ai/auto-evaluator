"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.log = log;
exports.init = init;
exports.getTs = getTs;
exports.getInfo = getInfo;
exports.getTypeChecker = getTypeChecker;
exports.getSource = getSource;
exports.removeStringQuotes = removeStringQuotes;
exports.getIsClientEntry = getIsClientEntry;
exports.isPageFile = exports.isAppEntryFile = exports.isInsideApp = exports.isDefaultFunctionExport = exports.isPositionInsideNode = void 0;
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let ts;
let info;
let appDirRegExp;
function log(message) {
    info.project.projectService.logger.info(message);
}
function init(opts) {
    ts = opts.ts;
    info = opts.info;
    const projectDir = info.project.getCurrentDirectory();
    appDirRegExp = new RegExp("^" + (projectDir + "(/src)?/app").replace(/[\\/]/g, "[\\/]"));
    log("Starting Next.js TypeScript plugin: " + projectDir);
}
function getTs() {
    return ts;
}
function getInfo() {
    return info;
}
function getTypeChecker() {
    var ref;
    return (ref = info.languageService.getProgram()) == null ? void 0 : ref.getTypeChecker();
}
function getSource(fileName) {
    var ref;
    return (ref = info.languageService.getProgram()) == null ? void 0 : ref.getSourceFile(fileName);
}
function removeStringQuotes(str) {
    return str.replace(/^['"`]|['"`]$/g, "");
}
const isPositionInsideNode = (position, node)=>{
    const start = node.getFullStart();
    return start <= position && position <= node.getFullWidth() + start;
};
exports.isPositionInsideNode = isPositionInsideNode;
const isDefaultFunctionExport = (node)=>{
    if (ts.isFunctionDeclaration(node)) {
        let hasExportKeyword = false;
        let hasDefaultKeyword = false;
        if (node.modifiers) {
            for (const modifier of node.modifiers){
                if (modifier.kind === ts.SyntaxKind.ExportKeyword) {
                    hasExportKeyword = true;
                } else if (modifier.kind === ts.SyntaxKind.DefaultKeyword) {
                    hasDefaultKeyword = true;
                }
            }
        }
        // `export default function`
        if (hasExportKeyword && hasDefaultKeyword) {
            return true;
        }
    }
    return false;
};
exports.isDefaultFunctionExport = isDefaultFunctionExport;
const isInsideApp = (filePath)=>{
    return appDirRegExp.test(filePath);
};
exports.isInsideApp = isInsideApp;
const isAppEntryFile = (filePath)=>{
    return appDirRegExp.test(filePath) && /^(page|layout)\.(mjs|js|jsx|ts|tsx)$/.test(_path.default.basename(filePath));
};
exports.isAppEntryFile = isAppEntryFile;
const isPageFile = (filePath)=>{
    return appDirRegExp.test(filePath) && /^page\.(mjs|js|jsx|ts|tsx)$/.test(_path.default.basename(filePath));
};
exports.isPageFile = isPageFile;
function getIsClientEntry(fileName, throwOnInvalidDirective) {
    const source = getSource(fileName);
    if (source) {
        let isClientEntry = false;
        let isDirective = true;
        ts.forEachChild(source, (node)=>{
            if (ts.isExpressionStatement(node) && ts.isStringLiteral(node.expression)) {
                if (node.expression.text === "use client") {
                    if (isDirective) {
                        isClientEntry = true;
                    } else {
                        if (throwOnInvalidDirective) {
                            const e = {
                                messageText: 'The `"use client"` directive must be put at the top of the file.',
                                start: node.expression.getStart(),
                                length: node.expression.getWidth()
                            };
                            throw e;
                        }
                    }
                }
            } else {
                isDirective = false;
            }
        });
        return isClientEntry;
    }
    return false;
}

//# sourceMappingURL=utils.js.map