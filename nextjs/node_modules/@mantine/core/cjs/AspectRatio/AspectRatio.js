'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var Box = require('../Box/Box.js');
var AspectRatio_styles = require('./AspectRatio.styles.js');

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
const AspectRatio = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("AspectRatio", {}, props), { className, ratio, children, unstyled, variant } = _a, others = __objRest(_a, ["className", "ratio", "children", "unstyled", "variant"]);
  const { classes, cx } = AspectRatio_styles['default']({ ratio }, { name: "AspectRatio", unstyled, variant });
  return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues({
    ref,
    className: cx(classes.root, className)
  }, others), children);
});
AspectRatio.displayName = "@mantine/core/AspectRatio";

exports.AspectRatio = AspectRatio;
//# sourceMappingURL=AspectRatio.js.map
