'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var Grid_context = require('../Grid.context.js');
var Col_styles = require('./Col.styles.js');
var Box = require('../../Box/Box.js');

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
const defaultProps = {};
function isValidSpan(span) {
  if (span === "auto" || span === "content") {
    return true;
  }
  return typeof span === "number" && span > 0 && span % 1 === 0;
}
const Col = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("GridCol", defaultProps, props), {
    children,
    span,
    offset,
    offsetXs,
    offsetSm,
    offsetMd,
    offsetLg,
    offsetXl,
    xs,
    sm,
    md,
    lg,
    xl,
    order,
    orderXs,
    orderSm,
    orderMd,
    orderLg,
    orderXl,
    className,
    id,
    unstyled,
    variant
  } = _a, others = __objRest(_a, [
    "children",
    "span",
    "offset",
    "offsetXs",
    "offsetSm",
    "offsetMd",
    "offsetLg",
    "offsetXl",
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "order",
    "orderXs",
    "orderSm",
    "orderMd",
    "orderLg",
    "orderXl",
    "className",
    "id",
    "unstyled",
    "variant"
  ]);
  const ctx = Grid_context.useGridContext();
  const colSpan = span || ctx.columns;
  const { classes, cx } = Col_styles['default']({
    gutter: ctx.gutter,
    gutterXs: ctx.gutterXs,
    gutterSm: ctx.gutterSm,
    gutterMd: ctx.gutterMd,
    gutterLg: ctx.gutterLg,
    gutterXl: ctx.gutterXl,
    offset,
    offsetXs,
    offsetSm,
    offsetMd,
    offsetLg,
    offsetXl,
    xs,
    sm,
    md,
    lg,
    xl,
    order,
    orderXs,
    orderSm,
    orderMd,
    orderLg,
    orderXl,
    grow: ctx.grow,
    columns: ctx.columns,
    span: colSpan
  }, { unstyled, name: "Grid", variant });
  if (!isValidSpan(colSpan) || colSpan > ctx.columns) {
    return null;
  }
  return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues({
    className: cx(classes.col, className),
    ref
  }, others), children);
});
Col.displayName = "@mantine/core/Col";

exports.Col = Col;
//# sourceMappingURL=Col.js.map
