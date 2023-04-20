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
var number_exports = {};
__export(number_exports, {
  default: () => numberFormatter
});
module.exports = __toCommonJS(number_exports);
function numberFormatter(opts = {}) {
  if (opts.separator) {
    if (opts.decimals) {
      return (value) => value.toFixed(opts.decimals).replace(".", opts.separator);
    }
    return (value) => `${value}`.replace(".", opts.separator);
  }
  if (opts.decimals) {
    return (value) => value.toFixed(opts.decimals);
  }
  return (value) => `${value}`;
}
