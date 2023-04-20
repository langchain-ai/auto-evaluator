import React, { forwardRef } from 'react';
import { getDefaultZIndex, useComponentDefaultProps } from '@mantine/styles';
import useStyles from './Indicator.styles.js';
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
  position: "top-end",
  offset: 0,
  inline: false,
  withBorder: false,
  disabled: false,
  processing: false,
  size: 10,
  radius: 1e3,
  zIndex: getDefaultZIndex("app")
};
const Indicator = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("Indicator", defaultProps, props), {
    children,
    position,
    offset,
    size,
    radius,
    inline,
    withBorder,
    className,
    color,
    styles,
    label,
    classNames,
    disabled,
    zIndex,
    unstyled,
    processing,
    variant
  } = _a, others = __objRest(_a, [
    "children",
    "position",
    "offset",
    "size",
    "radius",
    "inline",
    "withBorder",
    "className",
    "color",
    "styles",
    "label",
    "classNames",
    "disabled",
    "zIndex",
    "unstyled",
    "processing",
    "variant"
  ]);
  const { classes, cx } = useStyles({ position, offset, radius, inline, color, withBorder, zIndex, withLabel: !!label }, { name: "Indicator", classNames, styles, unstyled, variant, size });
  return /* @__PURE__ */ React.createElement(Box, __spreadValues({
    ref,
    className: cx(classes.root, className)
  }, others), !disabled && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: cx(classes.indicator, classes.common)
  }, label), processing && /* @__PURE__ */ React.createElement("div", {
    className: cx(classes.processing, classes.common)
  })), children);
});
Indicator.displayName = "@mantine/core/Indicator";

export { Indicator };
//# sourceMappingURL=Indicator.js.map
