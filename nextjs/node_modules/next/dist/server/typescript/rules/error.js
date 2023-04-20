"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _constant = require("../constant");
var _utils = require("../utils");
const errorEntry = {
    getSemanticDiagnostics (source, isClientEntry) {
        const isErrorFile = /[\\/]error\.tsx?$/.test(source.fileName);
        const isGlobalErrorFile = /[\\/]global-error\.tsx?$/.test(source.fileName);
        if (!isErrorFile && !isGlobalErrorFile) return [];
        const ts = (0, _utils).getTs();
        if (!isClientEntry) {
            // Error components must be Client components
            return [
                {
                    file: source,
                    category: ts.DiagnosticCategory.Error,
                    code: _constant.NEXT_TS_ERRORS.INVALID_ERROR_COMPONENT,
                    messageText: `Error Components must be Client Components, please add the "use client" directive: https://beta.nextjs.org/docs/api-reference/file-conventions/error`,
                    start: 0,
                    length: source.text.length
                }, 
            ];
        }
        return [];
    }
};
var _default = errorEntry;
exports.default = _default;

//# sourceMappingURL=error.js.map