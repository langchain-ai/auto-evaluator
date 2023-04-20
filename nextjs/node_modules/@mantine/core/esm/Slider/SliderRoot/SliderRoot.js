import React, { forwardRef } from 'react';
import useStyles from './SliderRoot.styles.js';
import { Box } from '../../Box/Box.js';

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
const SliderRoot = forwardRef((_a, ref) => {
  var _b = _a, {
    className,
    size,
    classNames,
    styles,
    disabled,
    unstyled,
    variant
  } = _b, others = __objRest(_b, [
    "className",
    "size",
    "classNames",
    "styles",
    "disabled",
    "unstyled",
    "variant"
  ]);
  const { classes, cx } = useStyles({ disabled }, { name: "Slider", classNames, styles, unstyled, variant, size });
  return /* @__PURE__ */ React.createElement(Box, __spreadProps(__spreadValues({}, others), {
    tabIndex: -1,
    className: cx(classes.root, className),
    ref
  }));
});
SliderRoot.displayName = "@mantine/core/SliderRoot";

export { SliderRoot };
//# sourceMappingURL=SliderRoot.js.map
