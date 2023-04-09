'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('@mantine/hooks');
var styles = require('@mantine/styles');
var RadioGroup_context = require('../RadioGroup.context.js');
var Input = require('../../Input/Input.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
const RadioGroup = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("RadioGroup", defaultProps, props), {
    children,
    value,
    defaultValue,
    onChange,
    size,
    wrapperProps,
    unstyled,
    name
  } = _a, others = __objRest(_a, [
    "children",
    "value",
    "defaultValue",
    "onChange",
    "size",
    "wrapperProps",
    "unstyled",
    "name"
  ]);
  const _name = hooks.useId(name);
  const [_value, setValue] = hooks.useUncontrolled({
    value,
    defaultValue,
    finalValue: "",
    onChange
  });
  const handleChange = (event) => setValue(event.currentTarget.value);
  return /* @__PURE__ */ React__default.createElement(RadioGroup_context.RadioGroupProvider, {
    value: { value: _value, onChange: handleChange, size, name: _name }
  }, /* @__PURE__ */ React__default.createElement(Input.Input.Wrapper, __spreadValues(__spreadValues({
    labelElement: "div",
    size,
    __staticSelector: "RadioGroup",
    ref,
    unstyled
  }, wrapperProps), others), children));
});
RadioGroup.displayName = "@mantine/core/RadioGroup";

exports.RadioGroup = RadioGroup;
//# sourceMappingURL=RadioGroup.js.map
