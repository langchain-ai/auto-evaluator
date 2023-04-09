'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var utils = require('@mantine/utils');
var OptionalPortal = require('../Portal/OptionalPortal.js');
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
  position: { bottom: 0, right: 0 },
  zIndex: styles.getDefaultZIndex("modal"),
  withinPortal: true
};
const Affix = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("Affix", defaultProps, props), { target, position, zIndex, sx, withinPortal, portalProps } = _a, others = __objRest(_a, ["target", "position", "zIndex", "sx", "withinPortal", "portalProps"]);
  return /* @__PURE__ */ React__default.createElement(OptionalPortal.OptionalPortal, __spreadValues({
    withinPortal,
    target
  }, portalProps), /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues({
    sx: [__spreadValues({ position: "fixed", zIndex }, position), ...utils.packSx(sx)],
    ref
  }, others)));
});
Affix.displayName = "@mantine/core/Affix";

exports.Affix = Affix;
//# sourceMappingURL=Affix.js.map
