import React, { forwardRef, useState, useEffect } from 'react';
import { useUncontrolled, useEyeDropper, useDidUpdate } from '@mantine/hooks';
import { rem, getDefaultZIndex, useMantineTheme, getSize } from '@mantine/styles';
import { noop } from '@mantine/utils';
import { ColorPicker } from '../ColorPicker/ColorPicker.js';
import { EyeDropperIcon } from './EyeDropperIcon.js';
import { useInputProps } from '../Input/use-input-props.js';
import { ActionIcon } from '../ActionIcon/ActionIcon.js';
import { convertHsvaTo } from '../ColorPicker/converters/converters.js';
import { parseColor, isColorValid } from '../ColorPicker/converters/parsers.js';
import { Input } from '../Input/Input.js';
import { Popover } from '../Popover/Popover.js';
import { ColorSwatch } from '../ColorSwatch/ColorSwatch.js';

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
  xs: rem(16),
  sm: rem(18),
  md: rem(22),
  lg: rem(28),
  xl: rem(36)
};
const EYE_DROPPER_SIZES = {
  xs: rem(14),
  sm: rem(16),
  md: rem(18),
  lg: rem(20),
  xl: rem(22)
};
const defaultProps = {
  size: "sm",
  format: "hex",
  fixOnBlur: true,
  withPreview: true,
  swatchesPerRow: 10,
  withPicker: true,
  transitionProps: { transition: "fade", duration: 0 },
  dropdownZIndex: getDefaultZIndex("popover"),
  withinPortal: true,
  shadow: "md",
  withEyeDropper: true
};
const ColorInput = forwardRef((props, ref) => {
  const _a = useInputProps("ColorInput", defaultProps, props), {
    wrapperProps,
    inputProps,
    format,
    onChange,
    onChangeEnd,
    onFocus,
    onBlur,
    onClick,
    value,
    defaultValue,
    disallowInput,
    fixOnBlur,
    withPreview,
    swatchesPerRow,
    withPicker,
    icon,
    transitionProps,
    dropdownZIndex,
    withinPortal,
    portalProps,
    swatches,
    shadow,
    classNames,
    styles,
    unstyled,
    readOnly,
    withEyeDropper,
    eyeDropperIcon,
    rightSection,
    closeOnColorSwatchClick,
    disabled
  } = _a, others = __objRest(_a, [
    "wrapperProps",
    "inputProps",
    "format",
    "onChange",
    "onChangeEnd",
    "onFocus",
    "onBlur",
    "onClick",
    "value",
    "defaultValue",
    "disallowInput",
    "fixOnBlur",
    "withPreview",
    "swatchesPerRow",
    "withPicker",
    "icon",
    "transitionProps",
    "dropdownZIndex",
    "withinPortal",
    "portalProps",
    "swatches",
    "shadow",
    "classNames",
    "styles",
    "unstyled",
    "readOnly",
    "withEyeDropper",
    "eyeDropperIcon",
    "rightSection",
    "closeOnColorSwatchClick",
    "disabled"
  ]);
  const theme = useMantineTheme();
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [lastValidValue, setLastValidValue] = useState("");
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: "",
    onChange
  });
  const { supported: eyeDropperSupported, open: openEyeDropper } = useEyeDropper();
  const eyeDropper = /* @__PURE__ */ React.createElement(ActionIcon, {
    sx: { color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black },
    size: inputProps.size,
    onClick: () => openEyeDropper().then(({ sRGBHex }) => setValue(convertHsvaTo(format, parseColor(sRGBHex)))).catch(noop)
  }, eyeDropperIcon || /* @__PURE__ */ React.createElement(EyeDropperIcon, {
    size: getSize({ size: inputProps.size, sizes: EYE_DROPPER_SIZES })
  }));
  const handleInputFocus = (event) => {
    onFocus == null ? void 0 : onFocus(event);
    setDropdownOpened(true);
  };
  const handleInputBlur = (event) => {
    onBlur == null ? void 0 : onBlur(event);
    setDropdownOpened(false);
    fixOnBlur && setValue(lastValidValue);
  };
  const handleInputClick = (event) => {
    onClick == null ? void 0 : onClick(event);
    setDropdownOpened(true);
  };
  useEffect(() => {
    if (isColorValid(_value) || _value.trim() === "") {
      setLastValidValue(_value);
    }
  }, [_value]);
  useDidUpdate(() => {
    if (isColorValid(_value)) {
      setValue(convertHsvaTo(format, parseColor(_value)));
    }
  }, [format]);
  return /* @__PURE__ */ React.createElement(Input.Wrapper, __spreadProps(__spreadValues({}, wrapperProps), {
    __staticSelector: "ColorInput"
  }), /* @__PURE__ */ React.createElement(Popover, {
    __staticSelector: "ColorInput",
    position: "bottom-start",
    offset: 5,
    zIndex: dropdownZIndex,
    withinPortal,
    portalProps,
    transitionProps,
    opened: dropdownOpened,
    shadow,
    classNames,
    styles,
    unstyled,
    disabled: readOnly || withPicker === false && (!Array.isArray(swatches) || swatches.length === 0)
  }, /* @__PURE__ */ React.createElement(Popover.Target, null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Input, __spreadProps(__spreadValues(__spreadValues({
    autoComplete: "nope"
  }, others), inputProps), {
    disabled,
    ref,
    __staticSelector: "ColorInput",
    onFocus: handleInputFocus,
    onBlur: handleInputBlur,
    onClick: handleInputClick,
    spellCheck: false,
    value: _value,
    onChange: (event) => {
      const inputValue = event.currentTarget.value;
      setValue(inputValue);
      if (isColorValid(inputValue)) {
        onChangeEnd == null ? void 0 : onChangeEnd(convertHsvaTo(format, parseColor(inputValue)));
      }
    },
    icon: icon || (withPreview ? /* @__PURE__ */ React.createElement(ColorSwatch, {
      color: isColorValid(_value) ? _value : "#fff",
      size: getSize({ size: inputProps.size, sizes: SWATCH_SIZES })
    }) : null),
    readOnly: disallowInput || readOnly,
    sx: { cursor: disallowInput ? "pointer" : void 0 },
    unstyled,
    classNames,
    styles,
    rightSection: rightSection || (withEyeDropper && !disabled && !readOnly && eyeDropperSupported ? eyeDropper : null)
  })))), /* @__PURE__ */ React.createElement(Popover.Dropdown, {
    onMouseDown: (event) => event.preventDefault(),
    p: inputProps.size
  }, /* @__PURE__ */ React.createElement(ColorPicker, {
    __staticSelector: "ColorInput",
    value: _value,
    onChange: setValue,
    onChangeEnd,
    format,
    swatches,
    swatchesPerRow,
    withPicker,
    size: inputProps.size,
    focusable: false,
    unstyled,
    styles,
    classNames,
    onColorSwatchClick: () => closeOnColorSwatchClick && setDropdownOpened(false)
  }))));
});
ColorInput.displayName = "@mantine/core/ColorInput";

export { ColorInput };
//# sourceMappingURL=ColorInput.js.map
