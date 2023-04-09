import React, { forwardRef, useState, useRef, useCallback } from 'react';
import { useUncontrolled, clamp, useMove, useMergedRef } from '@mantine/hooks';
import { useComponentDefaultProps, useMantineTheme } from '@mantine/styles';
import { getPosition } from '../utils/get-position/get-position.js';
import { getChangeValue } from '../utils/get-change-value/get-change-value.js';
import { Thumb } from '../Thumb/Thumb.js';
import { Track } from '../Track/Track.js';
import { SliderRoot } from '../SliderRoot/SliderRoot.js';

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
  size: "md",
  radius: "xl",
  min: 0,
  max: 100,
  step: 1,
  marks: [],
  label: (f) => f,
  labelTransition: "skew-down",
  labelTransitionDuration: 0,
  labelAlwaysOn: false,
  thumbLabel: "",
  showLabelOnHover: true,
  disabled: false,
  scale: (v) => v
};
const Slider = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("Slider", defaultProps, props), {
    classNames,
    styles,
    color,
    value,
    onChange,
    onChangeEnd,
    size,
    radius,
    min,
    max,
    step,
    precision,
    defaultValue,
    name,
    marks,
    label,
    labelTransition,
    labelTransitionDuration,
    labelTransitionTimingFunction,
    labelAlwaysOn,
    thumbLabel,
    showLabelOnHover,
    thumbChildren,
    disabled,
    unstyled,
    thumbSize,
    scale,
    inverted,
    variant
  } = _a, others = __objRest(_a, [
    "classNames",
    "styles",
    "color",
    "value",
    "onChange",
    "onChangeEnd",
    "size",
    "radius",
    "min",
    "max",
    "step",
    "precision",
    "defaultValue",
    "name",
    "marks",
    "label",
    "labelTransition",
    "labelTransitionDuration",
    "labelTransitionTimingFunction",
    "labelAlwaysOn",
    "thumbLabel",
    "showLabelOnHover",
    "thumbChildren",
    "disabled",
    "unstyled",
    "thumbSize",
    "scale",
    "inverted",
    "variant"
  ]);
  const theme = useMantineTheme();
  const [hovered, setHovered] = useState(false);
  const [_value, setValue] = useUncontrolled({
    value: typeof value === "number" ? clamp(value, min, max) : value,
    defaultValue: typeof defaultValue === "number" ? clamp(defaultValue, min, max) : defaultValue,
    finalValue: clamp(0, min, max),
    onChange
  });
  const valueRef = useRef(_value);
  const thumb = useRef();
  const position = getPosition({ value: _value, min, max });
  const scaledValue = scale(_value);
  const _label = typeof label === "function" ? label(scaledValue) : label;
  const handleChange = useCallback(({ x }) => {
    if (!disabled) {
      const nextValue = getChangeValue({ value: x, min, max, step, precision });
      setValue(nextValue);
      valueRef.current = nextValue;
    }
  }, [disabled, min, max, step, precision]);
  const { ref: container, active } = useMove(handleChange, { onScrubEnd: () => onChangeEnd == null ? void 0 : onChangeEnd(valueRef.current) }, theme.dir);
  const handleThumbMouseDown = (event) => {
    event.stopPropagation();
  };
  const handleTrackKeydownCapture = (event) => {
    if (!disabled) {
      switch (event.key) {
        case "ArrowUp": {
          event.preventDefault();
          thumb.current.focus();
          const nextValue = Math.min(Math.max(_value + step, min), max);
          onChangeEnd == null ? void 0 : onChangeEnd(nextValue);
          setValue(nextValue);
          break;
        }
        case "ArrowRight": {
          event.preventDefault();
          thumb.current.focus();
          const nextValue = Math.min(Math.max(theme.dir === "rtl" ? _value - step : _value + step, min), max);
          onChangeEnd == null ? void 0 : onChangeEnd(nextValue);
          setValue(nextValue);
          break;
        }
        case "ArrowDown": {
          event.preventDefault();
          thumb.current.focus();
          const nextValue = Math.min(Math.max(_value - step, min), max);
          onChangeEnd == null ? void 0 : onChangeEnd(nextValue);
          setValue(nextValue);
          break;
        }
        case "ArrowLeft": {
          event.preventDefault();
          thumb.current.focus();
          const nextValue = Math.min(Math.max(theme.dir === "rtl" ? _value + step : _value - step, min), max);
          onChangeEnd == null ? void 0 : onChangeEnd(nextValue);
          setValue(nextValue);
          break;
        }
        case "Home": {
          event.preventDefault();
          thumb.current.focus();
          onChangeEnd == null ? void 0 : onChangeEnd(min);
          setValue(min);
          break;
        }
        case "End": {
          event.preventDefault();
          thumb.current.focus();
          onChangeEnd == null ? void 0 : onChangeEnd(max);
          setValue(max);
          break;
        }
      }
    }
  };
  return /* @__PURE__ */ React.createElement(SliderRoot, __spreadProps(__spreadValues({}, others), {
    size,
    ref: useMergedRef(container, ref),
    onKeyDownCapture: handleTrackKeydownCapture,
    onMouseDownCapture: () => {
      var _a2;
      return (_a2 = container.current) == null ? void 0 : _a2.focus();
    },
    classNames,
    styles,
    disabled,
    unstyled,
    variant
  }), /* @__PURE__ */ React.createElement(Track, {
    inverted,
    offset: 0,
    filled: position,
    marks,
    size,
    radius,
    color,
    min,
    max,
    value: scaledValue,
    onChange: setValue,
    onMouseEnter: showLabelOnHover ? () => setHovered(true) : void 0,
    onMouseLeave: showLabelOnHover ? () => setHovered(false) : void 0,
    classNames,
    styles,
    disabled,
    unstyled,
    variant
  }, /* @__PURE__ */ React.createElement(Thumb, {
    max,
    min,
    value: scaledValue,
    position,
    dragging: active,
    color,
    size,
    label: _label,
    ref: thumb,
    onMouseDown: handleThumbMouseDown,
    labelTransition,
    labelTransitionDuration,
    labelTransitionTimingFunction,
    labelAlwaysOn,
    classNames,
    styles,
    thumbLabel,
    showLabelOnHover,
    isHovered: hovered,
    disabled,
    unstyled,
    thumbSize,
    variant
  }, thumbChildren)), /* @__PURE__ */ React.createElement("input", {
    type: "hidden",
    name,
    value: scaledValue
  }));
});
Slider.displayName = "@mantine/core/Slider";

export { Slider };
//# sourceMappingURL=Slider.js.map
