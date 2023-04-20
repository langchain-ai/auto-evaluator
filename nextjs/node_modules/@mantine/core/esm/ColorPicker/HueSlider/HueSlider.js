import React, { forwardRef } from 'react';
import { useComponentDefaultProps, rem } from '@mantine/styles';
import { ColorSlider } from '../ColorSlider/ColorSlider.js';

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
const HueSlider = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("HueSlider", defaultProps, props), { value, onChange, onChangeEnd, __staticSelector } = _a, others = __objRest(_a, ["value", "onChange", "onChangeEnd", "__staticSelector"]);
  return /* @__PURE__ */ React.createElement(ColorSlider, __spreadProps(__spreadValues({}, others), {
    ref,
    value,
    onChange,
    onChangeEnd,
    maxValue: 360,
    thumbColor: `hsl(${value}, 100%, 50%)`,
    round: true,
    __staticSelector: __staticSelector || "HueSlider",
    overlays: [
      {
        backgroundImage: "linear-gradient(to right,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(170,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%))"
      },
      {
        boxShadow: `rgba(0, 0, 0, .1) 0 0 0 ${rem(1)} inset, rgb(0, 0, 0, .15) 0 0 ${rem(4)} inset`
      }
    ]
  }));
});
HueSlider.displayName = "@mantine/core/HueSlider";

export { HueSlider };
//# sourceMappingURL=HueSlider.js.map
