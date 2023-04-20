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
var BaseParser_exports = {};
__export(BaseParser_exports, {
  default: () => JSON2CSVBase
});
module.exports = __toCommonJS(BaseParser_exports);
var import_lodash = __toESM(require("lodash.get"));
var import_default = __toESM(require("@json2csv/formatters/default.js"));
var import_number = __toESM(require("@json2csv/formatters/number.js"));
var import_string = __toESM(require("@json2csv/formatters/string.js"));
var import_symbol = __toESM(require("@json2csv/formatters/symbol.js"));
var import_object = __toESM(require("@json2csv/formatters/object.js"));
var import_utils = require("./utils.js");
class JSON2CSVBase {
  constructor(opts) {
    this.opts = this.preprocessOpts(opts);
  }
  /**
   * Check passing opts and set defaults.
   *
   * @param {Json2CsvOptions} opts Options object containing fields,
   * delimiter, default value, quote mark, header, etc.
   */
  preprocessOpts(opts) {
    const processedOpts = Object.assign({}, opts);
    if (processedOpts.fields) {
      processedOpts.fields = this.preprocessFieldsInfo(
        processedOpts.fields,
        processedOpts.defaultValue
      );
    }
    processedOpts.transforms = processedOpts.transforms || [];
    const stringFormatter = processedOpts.formatters && processedOpts.formatters["string"] || (0, import_string.default)();
    const objectFormatter = (0, import_object.default)({ stringFormatter });
    const defaultFormatters = {
      header: stringFormatter,
      undefined: import_default.default,
      boolean: import_default.default,
      number: (0, import_number.default)(),
      bigint: import_default.default,
      string: stringFormatter,
      symbol: (0, import_symbol.default)({ stringFormatter }),
      function: objectFormatter,
      object: objectFormatter
    };
    processedOpts.formatters = {
      ...defaultFormatters,
      ...processedOpts.formatters
    };
    processedOpts.delimiter = processedOpts.delimiter || ",";
    processedOpts.eol = processedOpts.eol || "\n";
    processedOpts.header = processedOpts.header !== false;
    processedOpts.includeEmptyRows = processedOpts.includeEmptyRows || false;
    processedOpts.withBOM = processedOpts.withBOM || false;
    return processedOpts;
  }
  /**
   * Check and normalize the fields configuration.
   *
   * @param {(string|object)[]} fields Fields configuration provided by the user
   * or inferred from the data
   * @returns {object[]} preprocessed FieldsInfo array
   */
  preprocessFieldsInfo(fields, globalDefaultValue) {
    return fields.map((fieldInfo) => {
      if (typeof fieldInfo === "string") {
        return {
          label: fieldInfo,
          value: fieldInfo.includes(".") || fieldInfo.includes("[") ? (row) => (0, import_lodash.default)(row, fieldInfo, globalDefaultValue) : (row) => (0, import_utils.getProp)(row, fieldInfo, globalDefaultValue)
        };
      }
      if (typeof fieldInfo === "object") {
        const defaultValue = "default" in fieldInfo ? fieldInfo.default : globalDefaultValue;
        if (typeof fieldInfo.value === "string") {
          return {
            label: fieldInfo.label || fieldInfo.value,
            value: fieldInfo.value.includes(".") || fieldInfo.value.includes("[") ? (row) => (0, import_lodash.default)(row, fieldInfo.value, defaultValue) : (row) => (0, import_utils.getProp)(row, fieldInfo.value, defaultValue)
          };
        }
        if (typeof fieldInfo.value === "function") {
          const label = fieldInfo.label || fieldInfo.value.name || "";
          const field = { label, default: defaultValue };
          return {
            label,
            value(row) {
              const value = fieldInfo.value(row, field);
              return value === null || value === void 0 ? defaultValue : value;
            }
          };
        }
      }
      throw new Error(
        "Invalid field info option. " + JSON.stringify(fieldInfo)
      );
    });
  }
  /**
   * Create the title row with all the provided fields as column headings
   *
   * @returns {String} titles as a string
   */
  getHeader() {
    return (0, import_utils.fastJoin)(
      this.opts.fields.map(
        (fieldInfo) => this.opts.formatters.header(fieldInfo.label)
      ),
      this.opts.delimiter
    );
  }
  /**
   * Preprocess each object according to the given transforms (unwind, flatten, etc.).
   * @param {Object} row JSON object to be converted in a CSV row
   */
  preprocessRow(row) {
    return this.opts.transforms.reduce(
      (rows, transform) => rows.map((row2) => transform(row2)).reduce(import_utils.flattenReducer, []),
      [row]
    );
  }
  /**
   * Create the content of a specific CSV row
   *
   * @param {Object} row JSON object to be converted in a CSV row
   * @returns {String} CSV string (row)
   */
  processRow(row) {
    if (!row) {
      return void 0;
    }
    const processedRow = this.opts.fields.map(
      (fieldInfo) => this.processCell(row, fieldInfo)
    );
    if (!this.opts.includeEmptyRows && processedRow.every((field) => field === "")) {
      return void 0;
    }
    return (0, import_utils.fastJoin)(processedRow, this.opts.delimiter);
  }
  /**
   * Create the content of a specfic CSV row cell
   *
   * @param {Object} row JSON object representing the  CSV row that the cell belongs to
   * @param {FieldInfo} fieldInfo Details of the field to process to be a CSV cell
   * @returns {String} CSV string (cell)
   */
  processCell(row, fieldInfo) {
    return this.processValue(fieldInfo.value(row));
  }
  /**
   * Create the content of a specfic CSV row cell
   *
   * @param {Any} value Value to be included in a CSV cell
   * @returns {String} Value stringified and processed
   */
  processValue(value) {
    return this.opts.formatters[typeof value](value);
  }
}
