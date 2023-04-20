import React, { forwardRef, useState } from 'react';
import { useUncontrolled } from '@mantine/hooks';
import { useComponentDefaultProps } from '@mantine/styles';
import { validateJson } from './validate-json/validate-json.js';
import useStyles from './JsonInput.styles.js';
import { Textarea } from '../Textarea/Textarea.js';

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
  formatOnBlur: false,
  size: "sm",
  serialize: JSON.stringify,
  deserialize: JSON.parse
};
const JsonInput = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("JsonInput", defaultProps, props), {
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    error,
    formatOnBlur,
    size,
    validationError,
    classNames,
    unstyled,
    readOnly,
    variant,
    serialize,
    deserialize
  } = _a, others = __objRest(_a, [
    "value",
    "defaultValue",
    "onChange",
    "onFocus",
    "onBlur",
    "error",
    "formatOnBlur",
    "size",
    "validationError",
    "classNames",
    "unstyled",
    "readOnly",
    "variant",
    "serialize",
    "deserialize"
  ]);
  const { classes, cx } = useStyles(null, { name: "JsonInput", unstyled, size, variant });
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: "",
    onChange
  });
  const [valid, setValid] = useState(validateJson(_value, deserialize));
  const handleFocus = (event) => {
    typeof onFocus === "function" && onFocus(event);
    setValid(true);
  };
  const handleBlur = (event) => {
    typeof onBlur === "function" && onBlur(event);
    const isValid = validateJson(event.currentTarget.value, deserialize);
    formatOnBlur && !readOnly && isValid && event.currentTarget.value.trim() !== "" && setValue(serialize(deserialize(event.currentTarget.value), null, 2));
    setValid(isValid);
  };
  return /* @__PURE__ */ React.createElement(Textarea, __spreadValues({
    value: _value,
    onChange: (event) => setValue(event.currentTarget.value),
    onFocus: handleFocus,
    onBlur: handleBlur,
    error: valid ? error : validationError || true,
    __staticSelector: "JsonInput",
    classNames: __spreadProps(__spreadValues({}, classNames), { input: cx(classes.input, classNames == null ? void 0 : classNames.input) }),
    autoComplete: "nope",
    ref,
    unstyled,
    readOnly,
    size,
    variant
  }, others));
});
JsonInput.displayName = "@mantine/core/JsonInput";

export { JsonInput };
//# sourceMappingURL=JsonInput.js.map
