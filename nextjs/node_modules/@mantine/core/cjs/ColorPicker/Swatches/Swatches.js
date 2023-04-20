'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var ColorSwatch = require('../../ColorSwatch/ColorSwatch.js');
var Swatches_styles = require('./Swatches.styles.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __defProp = Object.defineProperty;
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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function Swatches(_a) {
  var _b = _a, {
    data,
    swatchesPerRow = 10,
    focusable = true,
    classNames,
    styles,
    __staticSelector = "color-picker",
    unstyled,
    setValue,
    onChangeEnd,
    variant,
    size
  } = _b, others = __objRest(_b, [
    "data",
    "swatchesPerRow",
    "focusable",
    "classNames",
    "styles",
    "__staticSelector",
    "unstyled",
    "setValue",
    "onChangeEnd",
    "variant",
    "size"
  ]);
  const { classes } = Swatches_styles['default']({ swatchesPerRow }, { classNames, styles, name: __staticSelector, unstyled, variant, size });
  const colors = data.map((color, index) => /* @__PURE__ */ React__default.createElement(ColorSwatch.ColorSwatch, {
    className: classes.swatch,
    component: "button",
    type: "button",
    color,
    key: index,
    radius: "sm",
    onClick: () => {
      setValue(color);
      onChangeEnd == null ? void 0 : onChangeEnd(color);
    },
    style: { cursor: "pointer" },
    "aria-label": color,
    tabIndex: focusable ? 0 : -1
  }));
  return /* @__PURE__ */ React__default.createElement("div", __spreadValues({
    className: classes.swatches
  }, others), colors);
}
Swatches.displayName = "@mantine/core/Swatches";

exports.Swatches = Swatches;
//# sourceMappingURL=Swatches.js.map
