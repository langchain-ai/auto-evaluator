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
var src_exports = {};
__export(src_exports, {
  default: () => import_default.default,
  number: () => import_number.default,
  object: () => import_object.default,
  string: () => import_string.default,
  stringExcel: () => import_stringExcel.default,
  stringQuoteOnlyIfNecessary: () => import_stringQuoteOnlyIfNecessary.default,
  symbol: () => import_symbol.default
});
module.exports = __toCommonJS(src_exports);
var import_default = __toESM(require("./default.js"));
var import_number = __toESM(require("./number.js"));
var import_string = __toESM(require("./string.js"));
var import_stringQuoteOnlyIfNecessary = __toESM(require("./stringQuoteOnlyIfNecessary.js"));
var import_stringExcel = __toESM(require("./stringExcel.js"));
var import_symbol = __toESM(require("./symbol.js"));
var import_object = __toESM(require("./object.js"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  number,
  object,
  string,
  stringExcel,
  stringQuoteOnlyIfNecessary,
  symbol
});
