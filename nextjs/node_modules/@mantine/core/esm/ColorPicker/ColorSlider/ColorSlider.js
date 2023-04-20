import React, { forwardRef, useState, useRef } from 'react';
import { useMove, useDidUpdate, useMergedRef, clampUseMovePosition } from '@mantine/hooks';
import { rem } from '@mantine/styles';
import { Thumb } from '../Thumb/Thumb.js';
import useStyles from './ColorSlider.styles.js';
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
const ColorSlider = forwardRef((_a, ref) => {
  var _b = _a, {
    value,
    onChange,
    onChangeEnd,
    maxValue,
    round,
    size = "md",
    thumbColor = "transparent",
    __staticSelector = "ColorSlider",
    focusable = true,
    overlays,
    classNames,
    styles,
    className,
    unstyled,
    variant
  } = _b, others = __objRest(_b, [
    "value",
    "onChange",
    "onChangeEnd",
    "maxValue",
    "round",
    "size",
    "thumbColor",
    "__staticSelector",
    "focusable",
    "overlays",
    "classNames",
    "styles",
    "className",
    "unstyled",
    "variant"
  ]);
  const { classes, cx } = useStyles(null, {
    classNames,
    styles,
    name: __staticSelector,
    unstyled,
    variant,
    size
  });
  const [position, setPosition] = useState({ y: 0, x: value / maxValue });
  const positionRef = useRef(position);
  const getChangeValue = (val) => round ? Math.round(val * maxValue) : val * maxValue;
  const { ref: sliderRef } = useMove(({ x, y }) => {
    positionRef.current = { x, y };
    onChange(getChangeValue(x));
  }, {
    onScrubEnd: () => {
      const { x } = positionRef.current;
      onChangeEnd(getChangeValue(x));
    }
  });
  useDidUpdate(() => {
    setPosition({ y: 0, x: value / maxValue });
  }, [value]);
  const handleArrow = (event, pos) => {
    event.preventDefault();
    const _position = clampUseMovePosition(pos);
    onChange(getChangeValue(_position.x));
    onChangeEnd(getChangeValue(_position.x));
  };
  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowRight": {
        handleArrow(event, { x: position.x + 0.05, y: position.y });
        break;
      }
      case "ArrowLeft": {
        handleArrow(event, { x: position.x - 0.05, y: position.y });
        break;
      }
    }
  };
  const layers = overlays.map((overlay, index) => /* @__PURE__ */ React.createElement("div", {
    className: classes.sliderOverlay,
    style: overlay,
    key: index
  }));
  return /* @__PURE__ */ React.createElement(Box, __spreadProps(__spreadValues({}, others), {
    ref: useMergedRef(sliderRef, ref),
    className: cx(classes.slider, className),
    role: "slider",
    "aria-valuenow": value,
    "aria-valuemax": maxValue,
    "aria-valuemin": 0,
    tabIndex: focusable ? 0 : -1,
    onKeyDown: handleKeyDown
  }), layers, /* @__PURE__ */ React.createElement(Thumb, {
    __staticSelector,
    classNames,
    styles,
    position,
    style: { top: rem(1), backgroundColor: thumbColor },
    className: classes.sliderThumb,
    size
  }));
});
ColorSlider.displayName = "@mantine/core/ColorSlider";

export { ColorSlider };
//# sourceMappingURL=ColorSlider.js.map
