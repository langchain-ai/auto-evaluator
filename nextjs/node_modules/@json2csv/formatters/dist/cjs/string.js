var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var string_exports = {};
__export(string_exports, {
  default: () => stringFormatter
});
module.exports = __toCommonJS(string_exports);
function stringFormatter(opts = {}) {
  const quote = typeof opts.quote === "string" ? opts.quote : '"';
  const escapedQuote = typeof opts.escapedQuote === "string" ? opts.escapedQuote : `${quote}${quote}`;
  if (!quote || quote === escapedQuote) {
    return (value) => value;
  }
  return (value) => {
    if (value.includes(quote)) {
      value = value.replace(new RegExp(quote, "g"), escapedQuote);
    }
    return `${quote}${value}${quote}`;
  };
}
