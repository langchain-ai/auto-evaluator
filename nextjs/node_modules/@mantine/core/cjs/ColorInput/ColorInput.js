'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('@mantine/hooks');
var styles = require('@mantine/styles');
var utils = require('@mantine/utils');
var ColorPicker = require('../ColorPicker/ColorPicker.js');
var EyeDropperIcon = require('./EyeDropperIcon.js');
var useInputProps = require('../Input/use-input-props.js');
var ActionIcon = require('../ActionIcon/ActionIcon.js');
var converters = require('../ColorPicker/converters/converters.js');
var parsers = require('../ColorPicker/converters/parsers.js');
var Input = require('../Input/Input.js');
var Popover = require('../Popover/Popover.js');
var ColorSwatch = require('../ColorSwatch/ColorSwatch.js');

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
  xs: styles.rem(16),
  sm: styles.rem(18),
  md: styles.rem(22),
  lg: styles.rem(28),
  xl: styles.rem(36)
};
const EYE_DROPPER_SIZES = {
  xs: styles.rem(14),
  sm: styles.rem(16),
  md: styles.rem(18),
  lg: styles.rem(20),
  xl: styles.rem(22)
};
const defaultProps = {
  size: "sm",
  format: "hex",
  fixOnBlur: true,
  withPreview: true,
  swatchesPerRow: 10,
  withPicker: true,
  transitionProps: { transition: "fade", duration: 0 },
  dropdownZIndex: styles.getDefaultZIndex("popover"),
  withinPortal: true,
  shadow: "md",
  withEyeDropper: true
};
const ColorInput = React.forwardRef((props, ref) => {
  const _a = useInputProps.useInputProps("ColorInput", defaultProps, props), {
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
    styles: styles$1,
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
  const theme = styles.useMantineTheme();
  const [dropdownOpened, setDropdownOpened] = React.useState(false);
  const [lastValidValue, setLastValidValue] = React.useState("");
  const [_value, setValue] = hooks.useUncontrolled({
    value,
    defaultValue,
    finalValue: "",
    onChange
  });
  const { supported: eyeDropperSupported, open: openEyeDropper } = hooks.useEyeDropper();
  const eyeDropper = /* @__PURE__ */ React__default.createElement(ActionIcon.ActionIcon, {
    sx: { color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black },
    size: inputProps.size,
    onClick: () => openEyeDropper().then(({ sRGBHex }) => setValue(converters.convertHsvaTo(format, parsers.parseColor(sRGBHex)))).catch(utils.noop)
  }, eyeDropperIcon || /* @__PURE__ */ React__default.createElement(EyeDropperIcon.EyeDropperIcon, {
    size: styles.getSize({ size: inputProps.size, sizes: EYE_DROPPER_SIZES })
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
  React.useEffect(() => {
    if (parsers.isColorValid(_value) || _value.trim() === "") {
      setLastValidValue(_value);
    }
  }, [_value]);
  hooks.useDidUpdate(() => {
    if (parsers.isColorValid(_value)) {
      setValue(converters.convertHsvaTo(format, parsers.parseColor(_value)));
    }
  }, [format]);
  return /* @__PURE__ */ React__default.createElement(Input.Input.Wrapper, __spreadProps(__spreadValues({}, wrapperProps), {
    __staticSelector: "ColorInput"
  }), /* @__PURE__ */ React__default.createElement(Popover.Popover, {
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
    styles: styles$1,
    unstyled,
    disabled: readOnly || withPicker === false && (!Array.isArray(swatches) || swatches.length === 0)
  }, /* @__PURE__ */ React__default.createElement(Popover.Popover.Target, null, /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement(Input.Input, __spreadProps(__spreadValues(__spreadValues({
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
      if (parsers.isColorValid(inputValue)) {
        onChangeEnd == null ? void 0 : onChangeEnd(converters.convertHsvaTo(format, parsers.parseColor(inputValue)));
      }
    },
    icon: icon || (withPreview ? /* @__PURE__ */ React__default.createElement(ColorSwatch.ColorSwatch, {
      color: parsers.isColorValid(_value) ? _value : "#fff",
      size: styles.getSize({ size: inputProps.size, sizes: SWATCH_SIZES })
    }) : null),
    readOnly: disallowInput || readOnly,
    sx: { cursor: disallowInput ? "pointer" : void 0 },
    unstyled,
    classNames,
    styles: styles$1,
    rightSection: rightSection || (withEyeDropper && !disabled && !readOnly && eyeDropperSupported ? eyeDropper : null)
  })))), /* @__PURE__ */ React__default.createElement(Popover.Popover.Dropdown, {
    onMouseDown: (event) => event.preventDefault(),
    p: inputProps.size
  }, /* @__PURE__ */ React__default.createElement(ColorPicker.ColorPicker, {
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
    styles: styles$1,
    classNames,
    onColorSwatchClick: () => closeOnColorSwatchClick && setDropdownOpened(false)
  }))));
});
ColorInput.displayName = "@mantine/core/ColorInput";

exports.ColorInput = ColorInput;
//# sourceMappingURL=ColorInput.js.map
