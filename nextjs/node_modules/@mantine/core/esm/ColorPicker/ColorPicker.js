import React, { forwardRef, useRef, useState } from 'react';
import { useUncontrolled, useDidUpdate } from '@mantine/hooks';
import { useComponentDefaultProps, rem, getSize } from '@mantine/styles';
import { ColorSwatch } from '../ColorSwatch/ColorSwatch.js';
import { HueSlider } from './HueSlider/HueSlider.js';
import { AlphaSlider } from './AlphaSlider/AlphaSlider.js';
import { Saturation } from './Saturation/Saturation.js';
import { Swatches } from './Swatches/Swatches.js';
import useStyles from './ColorPicker.styles.js';
import { parseColor, isColorValid } from './converters/parsers.js';
import { convertHsvaTo } from './converters/converters.js';
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
const SWATCH_SIZES = {
  xs: 26,
  sm: 34,
  md: 42,
  lg: 50,
  xl: 54
};
const defaultProps = {
  swatchesPerRow: 10,
  size: "sm",
  withPicker: true,
  focusable: true,
  __staticSelector: "ColorPicker"
};
const ColorPicker = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("ColorPicker", defaultProps, props), {
    value,
    defaultValue,
    onChange,
    onChangeEnd,
    format,
    swatches,
    swatchesPerRow,
    size,
    withPicker,
    fullWidth,
    focusable,
    __staticSelector,
    saturationLabel,
    hueLabel,
    alphaLabel,
    className,
    styles,
    classNames,
    unstyled,
    onColorSwatchClick,
    variant
  } = _a, others = __objRest(_a, [
    "value",
    "defaultValue",
    "onChange",
    "onChangeEnd",
    "format",
    "swatches",
    "swatchesPerRow",
    "size",
    "withPicker",
    "fullWidth",
    "focusable",
    "__staticSelector",
    "saturationLabel",
    "hueLabel",
    "alphaLabel",
    "className",
    "styles",
    "classNames",
    "unstyled",
    "onColorSwatchClick",
    "variant"
  ]);
  const { classes, cx } = useStyles({ fullWidth }, { classNames, styles, name: __staticSelector, unstyled, variant, size });
  const formatRef = useRef(format);
  const valueRef = useRef(null);
  const updateRef = useRef(true);
  const withAlpha = format === "hexa" || format === "rgba" || format === "hsla";
  const [_value, setValue, controlled] = useUncontrolled({
    value,
    defaultValue,
    finalValue: "#FFFFFF",
    onChange
  });
  const [parsed, setParsed] = useState(parseColor(_value));
  const handleChange = (color) => {
    updateRef.current = false;
    setParsed((current) => {
      const next = __spreadValues(__spreadValues({}, current), color);
      valueRef.current = convertHsvaTo(formatRef.current, next);
      return next;
    });
    setValue(valueRef.current);
    setTimeout(() => {
      updateRef.current = true;
    }, 0);
  };
  useDidUpdate(() => {
    if (isColorValid(value) && updateRef.current) {
      setParsed(parseColor(value));
      updateRef.current = true;
    }
  }, [value]);
  useDidUpdate(() => {
    formatRef.current = format;
    setValue(convertHsvaTo(format, parsed));
  }, [format]);
  return /* @__PURE__ */ React.createElement(Box, __spreadValues({
    className: cx(classes.wrapper, className),
    ref
  }, others), withPicker && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Saturation, {
    value: parsed,
    onChange: handleChange,
    onChangeEnd: ({ s, v }) => onChangeEnd == null ? void 0 : onChangeEnd(convertHsvaTo(formatRef.current, __spreadProps(__spreadValues({}, parsed), { s, v }))),
    color: _value,
    styles,
    classNames,
    size,
    focusable,
    saturationLabel,
    __staticSelector
  }), /* @__PURE__ */ React.createElement("div", {
    className: classes.body
  }, /* @__PURE__ */ React.createElement("div", {
    className: classes.sliders
  }, /* @__PURE__ */ React.createElement(HueSlider, {
    value: parsed.h,
    onChange: (h) => handleChange({ h }),
    onChangeEnd: (h) => onChangeEnd == null ? void 0 : onChangeEnd(convertHsvaTo(formatRef.current, __spreadProps(__spreadValues({}, parsed), { h }))),
    size,
    styles,
    classNames,
    focusable,
    "aria-label": hueLabel,
    __staticSelector
  }), withAlpha && /* @__PURE__ */ React.createElement(AlphaSlider, {
    value: parsed.a,
    onChange: (a) => handleChange({ a }),
    onChangeEnd: (a) => {
      onChangeEnd == null ? void 0 : onChangeEnd(convertHsvaTo(formatRef.current, __spreadProps(__spreadValues({}, parsed), { a })));
    },
    size,
    color: convertHsvaTo("hex", parsed),
    style: { marginTop: rem(6) },
    styles,
    classNames,
    focusable,
    "aria-label": alphaLabel,
    __staticSelector
  })), withAlpha && /* @__PURE__ */ React.createElement(ColorSwatch, {
    color: _value,
    radius: "sm",
    size: getSize({ size, sizes: SWATCH_SIZES }),
    className: classes.preview
  }))), Array.isArray(swatches) && /* @__PURE__ */ React.createElement(Swatches, {
    data: swatches,
    style: { marginTop: rem(5) },
    swatchesPerRow,
    focusable,
    classNames,
    styles,
    __staticSelector,
    setValue,
    onChangeEnd: (color) => {
      const convertedColor = convertHsvaTo(format, parseColor(color));
      onColorSwatchClick == null ? void 0 : onColorSwatchClick(convertedColor);
      onChangeEnd == null ? void 0 : onChangeEnd(convertedColor);
      if (!controlled) {
        setParsed(parseColor(color));
      }
    }
  }));
});
ColorPicker.displayName = "@mantine/core/ColorPicker";

export { ColorPicker };
//# sourceMappingURL=ColorPicker.js.map
