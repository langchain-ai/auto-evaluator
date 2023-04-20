"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokenizer_js_1 = __importDefault(require("./tokenizer.js"));
const tokenparser_js_1 = __importDefault(require("./tokenparser.js"));
class JSONParser {
    constructor(opts = {}) {
        this.tokenizer = new tokenizer_js_1.default(opts);
        this.tokenParser = new tokenparser_js_1.default(opts);
        this.tokenizer.onToken = this.tokenParser.write.bind(this.tokenParser);
        this.tokenizer.onEnd = () => {
            if (!this.tokenParser.isEnded)
                this.tokenParser.end();
        };
        this.tokenParser.onError = this.tokenizer.error.bind(this.tokenizer);
        this.tokenParser.onEnd = () => {
            if (!this.tokenizer.isEnded)
                this.tokenizer.end();
        };
    }
    get isEnded() {
        return this.tokenizer.isEnded && this.tokenParser.isEnded;
    }
    write(input) {
        this.tokenizer.write(input);
    }
    end() {
        this.tokenizer.end();
    }
    set onToken(cb) {
        this.tokenizer.onToken = cb;
    }
    set onValue(cb) {
        this.tokenParser.onValue = cb;
    }
    set onError(cb) {
        this.tokenizer.onError = cb;
    }
    set onEnd(cb) {
        this.tokenParser.onEnd = () => {
            if (!this.tokenizer.isEnded)
                this.tokenizer.end();
            cb.call(this.tokenParser);
        };
    }
}
exports.default = JSONParser;
//# sourceMappingURL=jsonparser.js.map