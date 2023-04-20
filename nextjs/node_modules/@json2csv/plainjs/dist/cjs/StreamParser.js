var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var StreamParser_exports = {};
__export(StreamParser_exports, {
  default: () => JSON2CSVStreamParser
});
module.exports = __toCommonJS(StreamParser_exports);
var import_json = require("@streamparser/json");
var import_BaseParser = __toESM(require("./BaseParser.js"));
class JSON2CSVStreamParser extends import_BaseParser.default {
  constructor(opts, asyncOpts) {
    super(opts);
    this.opts = this.preprocessOpts(opts);
    this.initTokenizer(opts, asyncOpts);
    if (this.opts.fields)
      this.preprocessFieldsInfo(this.opts.fields);
  }
  initTokenizer(opts = {}, asyncOpts = {}) {
    if (asyncOpts.objectMode) {
      this.tokenizer = this.getObjectModeTokenizer();
      return;
    }
    if (opts.ndjson) {
      this.tokenizer = this.getNdJsonTokenizer(asyncOpts);
      return;
    }
    this.tokenizer = this.getBinaryModeTokenizer(asyncOpts);
    return;
  }
  getObjectModeTokenizer() {
    return {
      write: (data) => this.pushLine(data),
      end: () => {
        this.pushHeaderIfNotWritten();
        this.onEnd();
      }
    };
  }
  configureCallbacks(tokenizer, tokenParser) {
    tokenizer.onToken = tokenParser.write.bind(this.tokenParser);
    tokenizer.onError = (err) => this.onError(err);
    tokenizer.onEnd = () => {
      if (!this.tokenParser.isEnded)
        this.tokenParser.end();
    };
    tokenParser.onValue = ({ value }) => this.pushLine(value);
    tokenParser.onError = (err) => this.onError(err);
    tokenParser.onEnd = () => {
      this.pushHeaderIfNotWritten();
      this.onEnd();
    };
  }
  getNdJsonTokenizer(asyncOpts) {
    const tokenizer = new import_json.Tokenizer({ ...asyncOpts, separator: this.opts.eol });
    this.tokenParser = new import_json.TokenParser({
      paths: ["$"],
      keepStack: false,
      separator: this.opts.eol
    });
    this.configureCallbacks(tokenizer, this.tokenParser);
    return tokenizer;
  }
  getBinaryModeTokenizer(asyncOpts) {
    const tokenizer = new import_json.Tokenizer(asyncOpts);
    tokenizer.onToken = ({ token, value, offset }) => {
      if (token === import_json.TokenType.LEFT_BRACKET) {
        this.tokenParser = new import_json.TokenParser({
          paths: ["$.*"],
          keepStack: false
        });
      } else if (token === import_json.TokenType.LEFT_BRACE) {
        this.tokenParser = new import_json.TokenParser({ paths: ["$"], keepStack: false });
      } else {
        this.onError(new Error("Data should be a JSON object or array"));
        return;
      }
      this.configureCallbacks(tokenizer, this.tokenParser);
      this.tokenParser.write({ token, value, offset });
    };
    tokenizer.onError = () => this.onError(new Error("Data should be a JSON object or array"));
    tokenizer.onEnd = () => {
      this.onError(
        new Error(
          'Data should not be empty or the "fields" option should be included'
        )
      );
      this.onEnd();
    };
    return tokenizer;
  }
  write(data) {
    this.tokenizer.write(data);
  }
  end() {
    if (this.tokenizer && !this.tokenizer.isEnded)
      this.tokenizer.end();
  }
  pushHeaderIfNotWritten() {
    if (this._hasWritten)
      return;
    if (!this.opts.fields) {
      this.onError(
        new Error(
          'Data should not be empty or the "fields" option should be included'
        )
      );
      return;
    }
    this.pushHeader();
  }
  /**
   * Generate the csv header and pushes it downstream.
   */
  pushHeader() {
    if (this.opts.withBOM) {
      this.onData("\uFEFF");
    }
    if (this.opts.header) {
      const header = this.getHeader();
      this.onHeader(header);
      this.onData(header);
      this._hasWritten = true;
    }
  }
  /**
   * Transforms an incoming json data to csv and pushes it downstream.
   *
   * @param {Object} data JSON object to be converted in a CSV row
   */
  pushLine(data) {
    const processedData = this.preprocessRow(data);
    if (!this._hasWritten) {
      this.opts.fields = this.preprocessFieldsInfo(
        this.opts.fields || Object.keys(processedData[0])
      );
      this.pushHeader(this.opts.fields);
    }
    processedData.forEach((row) => {
      const line = this.processRow(row);
      if (line === void 0)
        return;
      this.onLine(line);
      this.onData(this._hasWritten ? this.opts.eol + line : line);
      this._hasWritten = true;
    });
  }
  // No idea why eslint doesn't detect the usage of these
  /* eslint-disable no-unused-vars */
  onHeader(header) {
  }
  onLine(line) {
  }
  onData(data) {
  }
  onError() {
  }
  onEnd() {
  }
  /* eslint-enable no-unused-vars */
}
