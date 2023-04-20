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
var utils_exports = {};
__export(utils_exports, {
  fastJoin: () => fastJoin,
  flattenReducer: () => flattenReducer,
  getProp: () => getProp
});
module.exports = __toCommonJS(utils_exports);
function getProp(obj, path, defaultValue) {
  const value = obj[path];
  return value === void 0 ? defaultValue : value;
}
function flattenReducer(acc, arr) {
  try {
    Array.isArray(arr) ? acc.push(...arr) : acc.push(arr);
    return acc;
  } catch (err) {
    return acc.concat(arr);
  }
}
function fastJoin(arr, separator) {
  let isFirst = true;
  return arr.reduce((acc, elem) => {
    if (elem === null || elem === void 0) {
      elem = "";
    }
    if (isFirst) {
      isFirst = false;
      return `${elem}`;
    }
    return `${acc}${separator}${elem}`;
  }, "");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fastJoin,
  flattenReducer,
  getProp
});
