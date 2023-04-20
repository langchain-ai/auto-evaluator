import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { Col } from './Col/Col.js';
import { GridProvider } from './Grid.context.js';
import useStyles from './Grid.styles.js';
import { Box } from '../Box/Box.js';

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
const Grid = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("Grid", defaultProps, props), {
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
  const { classes, cx } = useStyles({ gutter, justify, align, gutterXs, gutterSm, gutterMd, gutterLg, gutterXl }, { unstyled, name: "Grid", variant });
  return /* @__PURE__ */ React.createElement(GridProvider, {
    value: { gutter, gutterXs, gutterSm, gutterMd, gutterLg, gutterXl, grow, columns }
  }, /* @__PURE__ */ React.createElement(Box, __spreadValues({
    className: cx(classes.root, className),
    ref
  }, others), children));
});
Grid.Col = Col;
Grid.displayName = "@mantine/core/Grid";

export { Grid };
//# sourceMappingURL=Grid.js.map
