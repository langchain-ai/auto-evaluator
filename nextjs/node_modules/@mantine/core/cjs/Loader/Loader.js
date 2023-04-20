'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var Bars = require('./loaders/Bars.js');
var Oval = require('./loaders/Oval.js');
var Dots = require('./loaders/Dots.js');
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
const LOADERS = {
  bars: Bars.Bars,
  oval: Oval.Oval,
  dots: Dots.Dots
};
const sizes = {
  xs: styles.rem(18),
  sm: styles.rem(22),
  md: styles.rem(36),
  lg: styles.rem(44),
  xl: styles.rem(58)
};
const defaultProps = {
  size: "md"
};
function Loader(props) {
  const _a = styles.useComponentDefaultProps("Loader", defaultProps, props), { size, color, variant } = _a, others = __objRest(_a, ["size", "color", "variant"]);
  const theme = styles.useMantineTheme();
  const defaultLoader = variant in LOADERS ? variant : theme.loader;
  return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues({
    role: "presentation",
    component: LOADERS[defaultLoader] || LOADERS.bars,
    size: styles.getSize({ size, sizes }),
    color: theme.fn.variant({
      variant: "filled",
      primaryFallback: false,
      color: color || theme.primaryColor
    }).background
  }, others));
}
Loader.displayName = "@mantine/core/Loader";

exports.Loader = Loader;
//# sourceMappingURL=Loader.js.map
