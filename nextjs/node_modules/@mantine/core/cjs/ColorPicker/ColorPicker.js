'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('@mantine/hooks');
var styles = require('@mantine/styles');
var ColorSwatch = require('../ColorSwatch/ColorSwatch.js');
var HueSlider = require('./HueSlider/HueSlider.js');
var AlphaSlider = require('./AlphaSlider/AlphaSlider.js');
var Saturation = require('./Saturation/Saturation.js');
var Swatches = require('./Swatches/Swatches.js');
var ColorPicker_styles = require('./ColorPicker.styles.js');
var parsers = require('./converters/parsers.js');
var converters = require('./converters/converters.js');
var Box = require('../Box/Box.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
const ColorPicker = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("ColorPicker", defaultProps, props), {
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
    styles: styles$1,
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
  const { classes, cx } = ColorPicker_styles['default']({ fullWidth }, { classNames, styles: styles$1, name: __staticSelector, unstyled, variant, size });
  const formatRef = React.useRef(format);
  const valueRef = React.useRef(null);
  const updateRef = React.useRef(true);
  const withAlpha = format === "hexa" || format === "rgba" || format === "hsla";
  const [_value, setValue, controlled] = hooks.useUncontrolled({
    value,
    defaultValue,
    finalValue: "#FFFFFF",
    onChange
  });
  const [parsed, setParsed] = React.useState(parsers.parseColor(_value));
  const handleChange = (color) => {
    updateRef.current = false;
    setParsed((current) => {
      const next = __spreadValues(__spreadValues({}, current), color);
      valueRef.current = converters.convertHsvaTo(formatRef.current, next);
      return next;
    });
    setValue(valueRef.current);
    setTimeout(() => {
      updateRef.current = true;
    }, 0);
  };
  hooks.useDidUpdate(() => {
    if (parsers.isColorValid(value) && updateRef.current) {
      setParsed(parsers.parseColor(value));
      updateRef.current = true;
    }
  }, [value]);
  hooks.useDidUpdate(() => {
    formatRef.current = format;
    setValue(converters.convertHsvaTo(format, parsed));
  }, [format]);
  return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues({
    className: cx(classes.wrapper, className),
    ref
  }, others), withPicker && /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Saturation.Saturation, {
    value: parsed,
    onChange: handleChange,
    onChangeEnd: ({ s, v }) => onChangeEnd == null ? void 0 : onChangeEnd(converters.convertHsvaTo(formatRef.current, __spreadProps(__spreadValues({}, parsed), { s, v }))),
    color: _value,
    styles: styles$1,
    classNames,
    size,
    focusable,
    saturationLabel,
    __staticSelector
  }), /* @__PURE__ */ React__default.createElement("div", {
    className: classes.body
  }, /* @__PURE__ */ React__default.createElement("div", {
    className: classes.sliders
  }, /* @__PURE__ */ React__default.createElement(HueSlider.HueSlider, {
    value: parsed.h,
    onChange: (h) => handleChange({ h }),
    onChangeEnd: (h) => onChangeEnd == null ? void 0 : onChangeEnd(converters.convertHsvaTo(formatRef.current, __spreadProps(__spreadValues({}, parsed), { h }))),
    size,
    styles: styles$1,
    classNames,
    focusable,
    "aria-label": hueLabel,
    __staticSelector
  }), withAlpha && /* @__PURE__ */ React__default.createElement(AlphaSlider.AlphaSlider, {
    value: parsed.a,
    onChange: (a) => handleChange({ a }),
    onChangeEnd: (a) => {
      onChangeEnd == null ? void 0 : onChangeEnd(converters.convertHsvaTo(formatRef.current, __spreadProps(__spreadValues({}, parsed), { a })));
    },
    size,
    color: converters.convertHsvaTo("hex", parsed),
    style: { marginTop: styles.rem(6) },
    styles: styles$1,
    classNames,
    focusable,
    "aria-label": alphaLabel,
    __staticSelector
  })), withAlpha && /* @__PURE__ */ React__default.createElement(ColorSwatch.ColorSwatch, {
    color: _value,
    radius: "sm",
    size: styles.getSize({ size, sizes: SWATCH_SIZES }),
    className: classes.preview
  }))), Array.isArray(swatches) && /* @__PURE__ */ React__default.createElement(Swatches.Swatches, {
    data: swatches,
    style: { marginTop: styles.rem(5) },
    swatchesPerRow,
    focusable,
    classNames,
    styles: styles$1,
    __staticSelector,
    setValue,
    onChangeEnd: (color) => {
      const convertedColor = converters.convertHsvaTo(format, parsers.parseColor(color));
      onColorSwatchClick == null ? void 0 : onColorSwatchClick(convertedColor);
      onChangeEnd == null ? void 0 : onChangeEnd(convertedColor);
      if (!controlled) {
        setParsed(parsers.parseColor(color));
      }
    }
  }));
});
ColorPicker.displayName = "@mantine/core/ColorPicker";

exports.ColorPicker = ColorPicker;
//# sourceMappingURL=ColorPicker.js.map
