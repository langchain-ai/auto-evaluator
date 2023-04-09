'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var attachFunctions = require('../../functions/attach-functions.js');

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
function mergeTheme(currentTheme, themeOverride) {
  var _a;
  if (!themeOverride) {
    return currentTheme;
  }
  const result = Object.keys(currentTheme).reduce((acc, key) => {
    if (key === "headings" && themeOverride.headings) {
      const sizes = themeOverride.headings.sizes ? Object.keys(currentTheme.headings.sizes).reduce((headingsAcc, h) => {
        headingsAcc[h] = __spreadValues(__spreadValues({}, currentTheme.headings.sizes[h]), themeOverride.headings.sizes[h]);
        return headingsAcc;
      }, {}) : currentTheme.headings.sizes;
      return __spreadProps(__spreadValues({}, acc), {
        headings: __spreadProps(__spreadValues(__spreadValues({}, currentTheme.headings), themeOverride.headings), {
          sizes
        })
      });
    }
    acc[key] = typeof themeOverride[key] === "object" ? __spreadValues(__spreadValues({}, currentTheme[key]), themeOverride[key]) : typeof themeOverride[key] === "number" || typeof themeOverride[key] === "boolean" || typeof themeOverride[key] === "function" ? themeOverride[key] : themeOverride[key] || currentTheme[key];
    return acc;
  }, {});
  if ((themeOverride == null ? void 0 : themeOverride.fontFamily) && !((_a = themeOverride == null ? void 0 : themeOverride.headings) == null ? void 0 : _a.fontFamily)) {
    result.headings.fontFamily = themeOverride.fontFamily;
  }
  if (!(result.primaryColor in result.colors)) {
    throw new Error("MantineProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more \u2013 https://mantine.dev/theming/colors/#primary-color");
  }
  return result;
}
function mergeThemeWithFunctions(currentTheme, themeOverride) {
  return attachFunctions.attachFunctions(mergeTheme(currentTheme, themeOverride));
}

exports.mergeTheme = mergeTheme;
exports.mergeThemeWithFunctions = mergeThemeWithFunctions;
//# sourceMappingURL=merge-theme.js.map
