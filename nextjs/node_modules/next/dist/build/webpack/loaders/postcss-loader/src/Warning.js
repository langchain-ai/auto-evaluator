"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
class Warning extends Error {
    constructor(warning){
        super(warning);
        const { text , line , column , plugin  } = warning;
        this.name = "Warning";
        this.message = `${this.name}\n\n`;
        if (typeof line !== "undefined") {
            this.message += `(${line}:${column}) `;
        }
        this.message += plugin ? `${plugin}: ` : "";
        this.message += `${text}`;
        this.stack = false;
    }
}
exports.default = Warning;

//# sourceMappingURL=Warning.js.map