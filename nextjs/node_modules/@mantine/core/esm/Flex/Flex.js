import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { packSx } from '@mantine/utils';
import { FLEX_SYSTEM_PROPS } from './flex-props.js';
import { Box } from '../Box/Box.js';
import { getSystemStyles } from '../Box/style-system-props/get-system-styles/get-system-styles.js';

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
const defaultProps = {};
const Flex = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("Flex", defaultProps, props), { gap, rowGap, columnGap, align, justify, wrap, direction, sx } = _a, others = __objRest(_a, ["gap", "rowGap", "columnGap", "align", "justify", "wrap", "direction", "sx"]);
  return /* @__PURE__ */ React.createElement(Box, __spreadProps(__spreadValues({}, others), {
    sx: [
      { display: "flex" },
      (theme) => getSystemStyles({ gap, rowGap, columnGap, align, justify, wrap, direction }, theme, FLEX_SYSTEM_PROPS),
      ...packSx(sx)
    ],
    ref
  }));
});
Flex.displayName = "@mantine/core/Flex";

export { Flex };
//# sourceMappingURL=Flex.js.map
