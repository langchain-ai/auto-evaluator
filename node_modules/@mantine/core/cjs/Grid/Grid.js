'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var Col = require('./Col/Col.js');
var Grid_context = require('./Grid.context.js');
var Grid_styles = require('./Grid.styles.js');
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
  gutter: "md",
  justify: "flex-start",
  align: "stretch",
  columns: 12
};
const Grid = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("Grid", defaultProps, props), {
    gutter,
    gutterXs,
    gutterSm,
    gutterMd,
    gutterLg,
    gutterXl,
    children,
    grow,
    justify,
    align,
    columns,
    className,
    id,
    unstyled,
    variant
  } = _a, others = __objRest(_a, [
    "gutter",
    "gutterXs",
    "gutterSm",
    "gutterMd",
    "gutterLg",
    "gutterXl",
    "children",
    "grow",
    "justify",
    "align",
    "columns",
    "className",
    "id",
    "unstyled",
    "variant"
  ]);
  const { classes, cx } = Grid_styles['default']({ gutter, justify, align, gutterXs, gutterSm, gutterMd, gutterLg, gutterXl }, { unstyled, name: "Grid", variant });
  return /* @__PURE__ */ React__default.createElement(Grid_context.GridProvider, {
    value: { gutter, gutterXs, gutterSm, gutterMd, gutterLg, gutterXl, grow, columns }
  }, /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues({
    className: cx(classes.root, className),
    ref
  }, others), children));
});
Grid.Col = Col.Col;
Grid.displayName = "@mantine/core/Grid";

exports.Grid = Grid;
//# sourceMappingURL=Grid.js.map
