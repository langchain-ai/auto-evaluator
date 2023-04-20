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
var Parser_exports = {};
__export(Parser_exports, {
  default: () => JSON2CSVParser
});
module.exports = __toCommonJS(Parser_exports);
var import_BaseParser = __toESM(require("./BaseParser.js"));
var import_utils = require("./utils.js");
class JSON2CSVParser extends import_BaseParser.default {
  constructor(opts) {
    super(opts);
  }
  /**
   * Main function that converts json to csv.
   *
   * @param {Array|Object} data Array of JSON objects to be converted to CSV
   * @returns {String} The CSV formated data as a string
   */
  parse(data) {
    const preprocessedData = this.preprocessData(data);
    this.opts.fields = this.opts.fields || this.preprocessFieldsInfo(
      preprocessedData.reduce((fields, item) => {
        Object.keys(item).forEach((field) => {
          if (!fields.includes(field)) {
            fields.push(field);
          }
        });
        return fields;
      }, [])
    );
    const header = this.opts.header ? this.getHeader() : "";
    const rows = this.processData(preprocessedData);
    const csv = (this.opts.withBOM ? "\uFEFF" : "") + header + (header && rows ? this.opts.eol : "") + rows;
    return csv;
  }
  /**
   * Preprocess the data according to the give opts (unwind, flatten, etc.)
    and calculate the fields and field names if they are not provided.
   *
   * @param {Array|Object} data Array or object to be converted to CSV
   */
  preprocessData(data) {
    const processedData = Array.isArray(data) ? data : [data];
    if (!this.opts.fields && (processedData.length === 0 || typeof processedData[0] !== "object")) {
      throw new Error(
        'Data should not be empty or the "fields" option should be included'
      );
    }
    if (this.opts.transforms.length === 0)
      return processedData;
    return processedData.map((row) => this.preprocessRow(row)).reduce(import_utils.flattenReducer, []);
  }
  /**
   * Create the content row by row below the header
   *
   * @param {Array} data Array of JSON objects to be converted to CSV
   * @returns {String} CSV string (body)
   */
  processData(data) {
    return (0, import_utils.fastJoin)(
      data.map((row) => this.processRow(row)).filter((row) => row),
      // Filter empty rows
      this.opts.eol
    );
  }
}
