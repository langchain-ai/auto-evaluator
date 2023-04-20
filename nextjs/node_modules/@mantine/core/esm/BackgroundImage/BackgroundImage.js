import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { createPolymorphicComponent } from '@mantine/utils';
import useStyles from './BackgroundImage.styles.js';
import { Box } from '../Box/Box.js';

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
  radius: 0
};
const _BackgroundImage = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("BackgroundImage", defaultProps, props), { src, radius, variant, unstyled, className } = _a, others = __objRest(_a, ["src", "radius", "variant", "unstyled", "className"]);
  const { classes, cx } = useStyles({ radius, src }, { name: "BackgroundImage", variant, unstyled });
  return /* @__PURE__ */ React.createElement(Box, __spreadProps(__spreadValues({}, others), {
    ref,
    className: cx(classes.root, className)
  }));
});
_BackgroundImage.displayName = "@mantine/core/BackgroundImage";
const BackgroundImage = createPolymorphicComponent(_BackgroundImage);

export { BackgroundImage, _BackgroundImage };
//# sourceMappingURL=BackgroundImage.js.map
