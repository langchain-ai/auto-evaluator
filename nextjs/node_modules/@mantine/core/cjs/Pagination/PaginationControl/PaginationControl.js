'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var Pagination_context = require('../Pagination.context.js');
var PaginationControl_styles = require('./PaginationControl.styles.js');
var UnstyledButton = require('../../UnstyledButton/UnstyledButton.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
  withPadding: true
};
const PaginationControl = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("PaginationControl", defaultProps, props), { active, className, disabled, withPadding } = _a, others = __objRest(_a, ["active", "className", "disabled", "withPadding"]);
  const ctx = Pagination_context.usePaginationContext();
  const { classes, cx } = PaginationControl_styles['default']({ color: ctx.color, radius: ctx.radius, withPadding }, ctx.stylesApi);
  return /* @__PURE__ */ React__default.createElement(UnstyledButton.UnstyledButton, __spreadProps(__spreadValues({}, others), {
    disabled,
    "data-active": active || void 0,
    "data-disabled": disabled || void 0,
    ref,
    className: cx(classes.control, className)
  }));
});
PaginationControl.displayName = "@mantine/core/PaginationControl";

exports.PaginationControl = PaginationControl;
//# sourceMappingURL=PaginationControl.js.map
