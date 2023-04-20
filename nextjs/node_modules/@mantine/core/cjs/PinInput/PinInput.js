'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('@mantine/hooks');
var styles = require('@mantine/styles');
var createPinArray = require('./create-pin-array/create-pin-array.js');
var PinInput_styles = require('./PinInput.styles.js');
var Group = require('../Group/Group.js');
var Input = require('../Input/Input.js');

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
const regex = {
  number: /^[0-9]+$/,
  alphanumeric: /^[a-zA-Z0-9]+$/i
};
const defaultProps = {
  spacing: "sm",
  size: "sm",
  length: 4,
  manageFocus: true,
  placeholder: "\u25CB",
  type: "alphanumeric"
};
const PinInput = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("PinInput", defaultProps, props), {
    name,
    form,
    className,
    value,
    defaultValue,
    variant,
    spacing,
    size,
    classNames,
    styles: styles$1,
    unstyled,
    sx,
    length,
    onChange,
    onComplete,
    manageFocus,
    autoFocus,
    error,
    radius,
    disabled,
    oneTimeCode,
    placeholder,
    type,
    mask,
    "aria-label": ariaLabel,
    readOnly,
    inputType,
    inputMode
  } = _a, others = __objRest(_a, [
    "name",
    "form",
    "className",
    "value",
    "defaultValue",
    "variant",
    "spacing",
    "size",
    "classNames",
    "styles",
    "unstyled",
    "sx",
    "length",
    "onChange",
    "onComplete",
    "manageFocus",
    "autoFocus",
    "error",
    "radius",
    "disabled",
    "oneTimeCode",
    "placeholder",
    "type",
    "mask",
    "aria-label",
    "readOnly",
    "inputType",
    "inputMode"
  ]);
  const uuid = hooks.useId(name);
  const { classes, cx } = PinInput_styles['default'](null, {
    name: "PinInput",
    classNames,
    styles: styles$1,
    unstyled,
    variant,
    size
  });
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const [_value, setValues] = hooks.useUncontrolled({
    value,
    defaultValue,
    finalValue: "",
    onChange
  });
  const inputsRef = React.useRef([]);
  const validate = (code) => {
    const re = type instanceof RegExp ? type : type in regex ? regex[type] : null;
    return re == null ? void 0 : re.test(code);
  };
  const focusInputField = (dir, index) => {
    if (!manageFocus)
      return;
    if (dir === "next") {
      const nextIndex = index + 1;
      inputsRef.current[nextIndex < length ? nextIndex : index].focus();
    }
    if (dir === "prev") {
      const nextIndex = index - 1;
      inputsRef.current[nextIndex > -1 ? nextIndex : index].focus();
    }
  };
  const setFieldValue = (val, index) => {
    const values = [...createPinArray.createPinArray(length, _value)];
    values[index] = val;
    setValues(values.join(""));
  };
  const handleChange = (event, index) => {
    const inputValue = event.target.value;
    const nextChar = inputValue.length > 1 ? inputValue.split("")[inputValue.length - 1] : inputValue;
    const isValid = validate(nextChar);
    if (isValid) {
      setFieldValue(nextChar, index);
      focusInputField("next", index);
    } else {
      setFieldValue("", index);
    }
  };
  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace") {
      if (event.target.value !== "") {
        setFieldValue("", index);
      } else {
        focusInputField("prev", index);
      }
    }
  };
  const handleFocus = (event, index) => {
    event.target.select();
    setFocusedIndex(index);
  };
  const handleBlur = () => {
    setFocusedIndex(-1);
  };
  const handlePaste = (event) => {
    event.preventDefault();
    const copyValue = event.clipboardData.getData("Text");
    const isValid = validate(copyValue);
    if (isValid) {
      setValues(copyValue);
    }
  };
  React.useEffect(() => {
    if (_value.length !== length)
      return;
    onComplete == null ? void 0 : onComplete(_value);
  }, [_value]);
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Group.Group, __spreadValues({
    role: "group",
    spacing,
    ref,
    className: cx(classes.root, className),
    sx,
    unstyled,
    id: uuid,
    noWrap: true
  }, others), createPinArray.createPinArray(length, _value).map((char, index) => /* @__PURE__ */ React__default.createElement(Input.Input, {
    __staticSelector: "PinInput",
    id: `${uuid}-${index + 1}`,
    key: `${uuid}-${index}`,
    inputMode: inputMode || (type === "number" ? "numeric" : "text"),
    onChange: (event) => handleChange(event, index),
    onKeyDown: (event) => handleKeyDown(event, index),
    onFocus: (event) => handleFocus(event, index),
    onBlur: handleBlur,
    onPaste: handlePaste,
    type: inputType || (mask ? "password" : type === "number" ? "tel" : "text"),
    radius,
    error,
    variant,
    size,
    disabled,
    ref: (node) => {
      inputsRef.current[index] = node;
    },
    autoComplete: oneTimeCode ? "one-time-code" : "off",
    placeholder: focusedIndex === index ? "" : placeholder,
    value: char,
    autoFocus: autoFocus && index === 0,
    classNames: __spreadProps(__spreadValues({}, classNames), {
      input: cx(classes.input, classNames == null ? void 0 : classNames.input)
    }),
    styles: styles$1,
    unstyled,
    "aria-label": ariaLabel,
    readOnly
  }))), /* @__PURE__ */ React__default.createElement("input", {
    type: "hidden",
    name,
    form,
    value: _value
  }));
});
PinInput.displayName = "@mantine/core/PinInput";

exports.PinInput = PinInput;
//# sourceMappingURL=PinInput.js.map
