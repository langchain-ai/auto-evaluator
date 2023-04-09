import React from 'react';
import { rem, useComponentDefaultProps, useMantineTheme, getSize } from '@mantine/styles';
import { Bars } from './loaders/Bars.js';
import { Oval } from './loaders/Oval.js';
import { Dots } from './loaders/Dots.js';
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
const LOADERS = {
  bars: Bars,
  oval: Oval,
  dots: Dots
};
const sizes = {
  xs: rem(18),
  sm: rem(22),
  md: rem(36),
  lg: rem(44),
  xl: rem(58)
};
const defaultProps = {
  size: "md"
};
function Loader(props) {
  const _a = useComponentDefaultProps("Loader", defaultProps, props), { size, color, variant } = _a, others = __objRest(_a, ["size", "color", "variant"]);
  const theme = useMantineTheme();
  const defaultLoader = variant in LOADERS ? variant : theme.loader;
  return /* @__PURE__ */ React.createElement(Box, __spreadValues({
    role: "presentation",
    component: LOADERS[defaultLoader] || LOADERS.bars,
    size: getSize({ size, sizes }),
    color: theme.fn.variant({
      variant: "filled",
      primaryFallback: false,
      color: color || theme.primaryColor
    }).background
  }, others));
}
Loader.displayName = "@mantine/core/Loader";

export { Loader };
//# sourceMappingURL=Loader.js.map
