'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var utils = require('@mantine/utils');
var ColorSwatch_styles = require('./ColorSwatch.styles.js');
var Box = require('../Box/Box.js');

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
const defaultProps = {
  size: styles.rem(25),
  radius: styles.rem(25),
  withShadow: true
};
const _ColorSwatch = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("ColorSwatch", defaultProps, props), {
    color,
    size,
    radius,
    className,
    children,
    classNames,
    styles: styles$1,
    unstyled,
    withShadow,
    variant
  } = _a, others = __objRest(_a, [
    "color",
    "size",
    "radius",
    "className",
    "children",
    "classNames",
    "styles",
    "unstyled",
    "withShadow",
    "variant"
  ]);
  const { classes, cx } = ColorSwatch_styles['default']({ radius }, { classNames, styles: styles$1, unstyled, name: "ColorSwatch", size, variant });
  return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues({
    className: cx(classes.root, className),
    ref
  }, others), /* @__PURE__ */ React__default.createElement("div", {
    className: cx(classes.alphaOverlay, classes.overlay)
  }), withShadow && /* @__PURE__ */ React__default.createElement("div", {
    className: cx(classes.shadowOverlay, classes.overlay)
  }), /* @__PURE__ */ React__default.createElement("div", {
    className: classes.overlay,
    style: { backgroundColor: color }
  }), /* @__PURE__ */ React__default.createElement("div", {
    className: cx(classes.children, classes.overlay)
  }, children));
});
_ColorSwatch.displayName = "@mantine/core/ColorSwatch";
const ColorSwatch = utils.createPolymorphicComponent(_ColorSwatch);

exports.ColorSwatch = ColorSwatch;
exports._ColorSwatch = _ColorSwatch;
//# sourceMappingURL=ColorSwatch.js.map
