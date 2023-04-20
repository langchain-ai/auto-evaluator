import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { useUncontrolled, useMove, useMergedRef } from '@mantine/hooks';
import { useComponentDefaultProps, useMantineTheme } from '@mantine/styles';
import { getClientPosition } from '../utils/get-client-position/get-client-position.js';
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
  minRange: 10,
  step: 1,
  marks: [],
  label: (f) => f,
  labelTransition: "skew-down",
  labelTransitionDuration: 0,
  labelAlwaysOn: false,
  thumbFromLabel: "",
  thumbToLabel: "",
  showLabelOnHover: true,
  disabled: false,
  scale: (v) => v
};
const RangeSlider = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("RangeSlider", defaultProps, props), {
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
    minRange,
    maxRange,
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
    thumbFromLabel,
    thumbToLabel,
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
    "minRange",
    "maxRange",
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
    "thumbFromLabel",
    "thumbToLabel",
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
  const [focused, setFocused] = useState(-1);
  const [hovered, setHovered] = useState(false);
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: [min, max],
    onChange
  });
  const valueRef = useRef(_value);
  const thumbs = useRef([]);
  const thumbIndex = useRef(void 0);
  const positions = [
    getPosition({ value: _value[0], min, max }),
    getPosition({ value: _value[1], min, max })
  ];
  const _setValue = (val) => {
    setValue(val);
    valueRef.current = val;
  };
  useEffect(() => {
    if (Array.isArray(value)) {
      valueRef.current = value;
    }
  }, Array.isArray(value) ? [value[0], value[1]] : [null, null]);
  const setRangedValue = (val, index, triggerChangeEnd) => {
    const clone = [...valueRef.current];
    clone[index] = val;
    if (index === 0) {
      if (val > clone[1] - (minRange - 1e-9)) {
        clone[1] = Math.min(val + minRange, max);
      }
      if (val > (max - (minRange - 1e-9) || min)) {
        clone[index] = valueRef.current[index];
      }
      if (clone[1] - val > maxRange) {
        clone[1] = val + maxRange;
      }
    }
    if (index === 1) {
      if (val < clone[0] + minRange) {
        clone[0] = Math.max(val - minRange, min);
      }
      if (val < clone[0] + minRange) {
        clone[index] = valueRef.current[index];
      }
      if (val - clone[0] > maxRange) {
        clone[0] = val - maxRange;
      }
    }
    _setValue(clone);
    if (triggerChangeEnd) {
      onChangeEnd == null ? void 0 : onChangeEnd(valueRef.current);
    }
  };
  const handleChange = (val) => {
    if (!disabled) {
      const nextValue = getChangeValue({ value: val, min, max, step, precision });
      setRangedValue(nextValue, thumbIndex.current, false);
    }
  };
  const { ref: container, active } = useMove(({ x }) => handleChange(x), { onScrubEnd: () => onChangeEnd == null ? void 0 : onChangeEnd(valueRef.current) }, theme.dir);
  function handleThumbMouseDown(event, index) {
    event.stopPropagation();
    thumbIndex.current = index;
  }
  const handleTrackMouseDownCapture = (event) => {
    container.current.focus();
    const rect = container.current.getBoundingClientRect();
    const changePosition = getClientPosition(event.nativeEvent);
    const changeValue = getChangeValue({
      value: changePosition - rect.left,
      max,
      min,
      step,
      containerWidth: rect.width
    });
    const nearestHandle = Math.abs(_value[0] - changeValue) > Math.abs(_value[1] - changeValue) ? 1 : 0;
    const _nearestHandle = theme.dir === "ltr" ? nearestHandle : nearestHandle === 1 ? 0 : 1;
    thumbIndex.current = _nearestHandle;
  };
  const getFocusedThumbIndex = () => {
    if (focused !== 1 && focused !== 0) {
      setFocused(0);
      return 0;
    }
    return focused;
  };
  const handleTrackKeydownCapture = (event) => {
    if (!disabled) {
      switch (event.key) {
        case "ArrowUp": {
          event.preventDefault();
          const focusedIndex = getFocusedThumbIndex();
          thumbs.current[focusedIndex].focus();
          setRangedValue(Math.min(Math.max(valueRef.current[focusedIndex] + step, min), max), focusedIndex, true);
          break;
        }
        case "ArrowRight": {
          event.preventDefault();
          const focusedIndex = getFocusedThumbIndex();
          thumbs.current[focusedIndex].focus();
          setRangedValue(Math.min(Math.max(theme.dir === "rtl" ? valueRef.current[focusedIndex] - step : valueRef.current[focusedIndex] + step, min), max), focusedIndex, true);
          break;
        }
        case "ArrowDown": {
          event.preventDefault();
          const focusedIndex = getFocusedThumbIndex();
          thumbs.current[focusedIndex].focus();
          setRangedValue(Math.min(Math.max(valueRef.current[focusedIndex] - step, min), max), focusedIndex, true);
          break;
        }
        case "ArrowLeft": {
          event.preventDefault();
          const focusedIndex = getFocusedThumbIndex();
          thumbs.current[focusedIndex].focus();
          setRangedValue(Math.min(Math.max(theme.dir === "rtl" ? valueRef.current[focusedIndex] + step : valueRef.current[focusedIndex] - step, min), max), focusedIndex, true);
          break;
        }
      }
    }
  };
  const sharedThumbProps = {
    max,
    min,
    color,
    size,
    labelTransition,
    labelTransitionDuration,
    labelTransitionTimingFunction,
    labelAlwaysOn,
    onBlur: () => setFocused(-1),
    classNames,
    styles
  };
  const hasArrayThumbChildren = Array.isArray(thumbChildren);
  return /* @__PURE__ */ React.createElement(SliderRoot, __spreadProps(__spreadValues({}, others), {
    size,
    ref: useMergedRef(container, ref),
    onTouchStartCapture: handleTrackMouseDownCapture,
    onTouchEndCapture: () => {
      thumbIndex.current = -1;
    },
    onMouseDownCapture: handleTrackMouseDownCapture,
    onMouseUpCapture: () => {
      thumbIndex.current = -1;
    },
    onKeyDownCapture: handleTrackKeydownCapture,
    styles,
    classNames,
    disabled,
    unstyled,
    variant
  }), /* @__PURE__ */ React.createElement(Track, {
    offset: positions[0],
    marksOffset: _value[0],
    filled: positions[1] - positions[0],
    marks,
    inverted,
    size,
    radius,
    color,
    min,
    max,
    value: _value[1],
    styles,
    classNames,
    onMouseEnter: showLabelOnHover ? () => setHovered(true) : void 0,
    onMouseLeave: showLabelOnHover ? () => setHovered(false) : void 0,
    onChange: (val) => {
      const nearestValue = Math.abs(_value[0] - val) > Math.abs(_value[1] - val) ? 1 : 0;
      const clone = [..._value];
      clone[nearestValue] = val;
      _setValue(clone);
    },
    disabled,
    unstyled,
    variant
  }, /* @__PURE__ */ React.createElement(Thumb, __spreadProps(__spreadValues({}, sharedThumbProps), {
    value: scale(_value[0]),
    position: positions[0],
    dragging: active,
    label: typeof label === "function" ? label(scale(_value[0])) : label,
    ref: (node) => {
      thumbs.current[0] = node;
    },
    thumbLabel: thumbFromLabel,
    onMouseDown: (event) => handleThumbMouseDown(event, 0),
    onFocus: () => setFocused(0),
    showLabelOnHover,
    isHovered: hovered,
    disabled,
    unstyled,
    thumbSize,
    variant
  }), hasArrayThumbChildren ? thumbChildren[0] : thumbChildren), /* @__PURE__ */ React.createElement(Thumb, __spreadProps(__spreadValues({}, sharedThumbProps), {
    thumbLabel: thumbToLabel,
    value: scale(_value[1]),
    position: positions[1],
    dragging: active,
    label: typeof label === "function" ? label(scale(_value[1])) : label,
    ref: (node) => {
      thumbs.current[1] = node;
    },
    onMouseDown: (event) => handleThumbMouseDown(event, 1),
    onFocus: () => setFocused(1),
    showLabelOnHover,
    isHovered: hovered,
    disabled,
    unstyled,
    thumbSize,
    variant
  }), hasArrayThumbChildren ? thumbChildren[1] : thumbChildren)), /* @__PURE__ */ React.createElement("input", {
    type: "hidden",
    name: `${name}_from`,
    value: _value[0]
  }), /* @__PURE__ */ React.createElement("input", {
    type: "hidden",
    name: `${name}_to`,
    value: _value[1]
  }));
});
RangeSlider.displayName = "@mantine/core/RangeSlider";

export { RangeSlider };
//# sourceMappingURL=RangeSlider.js.map
