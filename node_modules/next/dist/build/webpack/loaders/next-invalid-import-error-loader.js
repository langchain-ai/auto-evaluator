"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = nextInvalidImportErrorLoader;
function nextInvalidImportErrorLoader() {
    const { message  } = this.getOptions();
    throw new Error(message);
}

//# sourceMappingURL=next-invalid-import-error-loader.js.map