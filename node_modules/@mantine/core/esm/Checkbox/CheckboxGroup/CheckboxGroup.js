import React, { forwardRef } from 'react';
import { useUncontrolled } from '@mantine/hooks';
import { useComponentDefaultProps } from '@mantine/styles';
import { CheckboxGroupProvider } from '../CheckboxGroup.context.js';
import { Input } from '../../Input/Input.js';

var __defProp = Object.defineProperty;
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
  size: "sm"
};
const CheckboxGroup = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("CheckboxGroup", defaultProps, props), { children, value, defaultValue, onChange, size, wrapperProps } = _a, others = __objRest(_a, ["children", "value", "defaultValue", "onChange", "size", "wrapperProps"]);
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: [],
    onChange
  });
  const handleChange = (event) => {
    const itemValue = event.currentTarget.value;
    setValue(_value.includes(itemValue) ? _value.filter((item) => item !== itemValue) : [..._value, itemValue]);
  };
  return /* @__PURE__ */ React.createElement(CheckboxGroupProvider, {
    value: { value: _value, onChange: handleChange, size }
  }, /* @__PURE__ */ React.createElement(Input.Wrapper, __spreadValues(__spreadValues({
    labelElement: "div",
    size,
    __staticSelector: "CheckboxGroup",
    ref
  }, wrapperProps), others), children));
});
CheckboxGroup.displayName = "@mantine/core/CheckboxGroup";

export { CheckboxGroup };
//# sourceMappingURL=CheckboxGroup.js.map
