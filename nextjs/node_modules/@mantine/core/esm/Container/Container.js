import React, { forwardRef } from 'react';
import { rem, useComponentDefaultProps } from '@mantine/styles';
import useStyles from './Container.styles.js';
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
  sizes: {
    xs: rem(540),
    sm: rem(720),
    md: rem(960),
    lg: rem(1140),
    xl: rem(1320)
  }
};
const Container = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("Container", defaultProps, props), { className, fluid, size, unstyled, sizes, variant } = _a, others = __objRest(_a, ["className", "fluid", "size", "unstyled", "sizes", "variant"]);
  const { classes, cx } = useStyles({ fluid, sizes }, { unstyled, name: "Container", variant, size });
  return /* @__PURE__ */ React.createElement(Box, __spreadValues({
    className: cx(classes.root, className),
    ref
  }, others));
});
Container.displayName = "@mantine/core/Container";

export { Container };
//# sourceMappingURL=Container.js.map
