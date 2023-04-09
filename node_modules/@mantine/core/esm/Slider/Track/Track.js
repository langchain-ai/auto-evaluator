import React from 'react';
import { getSize } from '@mantine/styles';
import { Marks } from '../Marks/Marks.js';
import { sizes } from '../SliderRoot/SliderRoot.styles.js';
import useStyles from './Track.styles.js';
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
function Track(_a) {
  var _b = _a, {
    filled,
    size,
    color,
    classNames,
    styles,
    radius,
    children,
    offset,
    onMouseLeave,
    onMouseEnter,
    disabled,
    marksOffset,
    unstyled,
    inverted,
    variant
  } = _b, others = __objRest(_b, [
    "filled",
    "size",
    "color",
    "classNames",
    "styles",
    "radius",
    "children",
    "offset",
    "onMouseLeave",
    "onMouseEnter",
    "disabled",
    "marksOffset",
    "unstyled",
    "inverted",
    "variant"
  ]);
  const { classes } = useStyles({ color, radius, disabled, inverted }, { name: "Slider", classNames, styles, unstyled, variant, size });
  return /* @__PURE__ */ React.createElement("div", {
    className: classes.track,
    onMouseLeave,
    onMouseEnter
  }, /* @__PURE__ */ React.createElement(Box, {
    className: classes.bar,
    sx: {
      left: `calc(${offset}% - ${getSize({ size, sizes })})`,
      width: `calc(${filled}% + ${getSize({ size, sizes })})`
    }
  }), children, /* @__PURE__ */ React.createElement(Marks, __spreadProps(__spreadValues({}, others), {
    size,
    color,
    offset: marksOffset,
    classNames,
    styles,
    disabled,
    unstyled,
    inverted,
    variant
  })));
}
Track.displayName = "@mantine/core/SliderTrack";

export { Track };
//# sourceMappingURL=Track.js.map
