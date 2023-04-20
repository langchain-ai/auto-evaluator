'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var utils = require('@mantine/utils');
var Text = require('../Text/Text.js');
var Anchor_styles = require('./Anchor.styles.js');

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
  underline: true
};
const _Anchor = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("Anchor", defaultProps, props), { component, className, unstyled, variant, size, color, underline } = _a, others = __objRest(_a, ["component", "className", "unstyled", "variant", "size", "color", "underline"]);
  const { classes, cx } = Anchor_styles['default']({ color, underline }, { name: "Anchor", unstyled, variant, size });
  const buttonProps = component === "button" ? { type: "button" } : null;
  return /* @__PURE__ */ React__default.createElement(Text.Text, __spreadValues(__spreadValues({
    component: component || "a",
    ref,
    className: cx(classes.root, className),
    size
  }, buttonProps), others));
});
_Anchor.displayName = "@mantine/core/Anchor";
const Anchor = utils.createPolymorphicComponent(_Anchor);

exports.Anchor = Anchor;
exports._Anchor = _Anchor;
//# sourceMappingURL=Anchor.js.map
