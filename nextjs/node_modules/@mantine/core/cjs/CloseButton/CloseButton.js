'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var utils = require('@mantine/utils');
var ActionIcon = require('../ActionIcon/ActionIcon.js');
var CloseIcon = require('./CloseIcon.js');

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
const iconSizes = {
  xs: styles.rem(12),
  sm: styles.rem(16),
  md: styles.rem(20),
  lg: styles.rem(28),
  xl: styles.rem(34)
};
const defaultProps = {
  size: "sm"
};
const _CloseButton = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("CloseButton", defaultProps, props), { iconSize, size, children } = _a, others = __objRest(_a, ["iconSize", "size", "children"]);
  const _iconSize = styles.rem(iconSize || iconSizes[size]);
  return /* @__PURE__ */ React__default.createElement(ActionIcon.ActionIcon, __spreadValues({
    ref,
    __staticSelector: "CloseButton",
    size
  }, others), children || /* @__PURE__ */ React__default.createElement(CloseIcon.CloseIcon, {
    width: _iconSize,
    height: _iconSize
  }));
});
_CloseButton.displayName = "@mantine/core/CloseButton";
const CloseButton = utils.createPolymorphicComponent(_CloseButton);

exports.CloseButton = CloseButton;
exports._CloseButton = _CloseButton;
//# sourceMappingURL=CloseButton.js.map
