'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var getSelectRightSectionProps = require('../Select/SelectRightSection/get-select-right-section-props.js');
var useInputProps = require('../Input/use-input-props.js');
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
const defaultProps = {
  size: "sm"
};
const NativeSelect = React.forwardRef((props, ref) => {
  const _a = useInputProps.useInputProps("NativeSelect", defaultProps, props), {
    inputProps,
    wrapperProps,
    data,
    onChange,
    value,
    classNames,
    styles: styles$1,
    rightSection,
    rightSectionWidth
  } = _a, others = __objRest(_a, [
    "inputProps",
    "wrapperProps",
    "data",
    "onChange",
    "value",
    "classNames",
    "styles",
    "rightSection",
    "rightSectionWidth"
  ]);
  const theme = styles.useMantineTheme();
  const formattedData = data.map((item) => typeof item === "string" ? { label: item, value: item } : item);
  const options = formattedData.map((item) => /* @__PURE__ */ React__default.createElement("option", {
    key: item.value,
    value: item.value,
    disabled: item.disabled
  }, item.label));
  return /* @__PURE__ */ React__default.createElement(Input.Input.Wrapper, __spreadProps(__spreadValues({}, wrapperProps), {
    __staticSelector: "NativeSelect"
  }), /* @__PURE__ */ React__default.createElement(Input.Input, __spreadValues(__spreadProps(__spreadValues(__spreadValues({}, inputProps), others), {
    onChange,
    component: "select",
    ref,
    value: value === null ? "" : value,
    __staticSelector: "NativeSelect",
    pointer: theme.cursorType === "pointer"
  }), getSelectRightSectionProps.getSelectRightSectionProps({
    theme,
    rightSection,
    rightSectionWidth,
    styles: styles$1,
    shouldClear: false,
    size: inputProps.size,
    error: wrapperProps.error,
    readOnly: false
  })), options));
});
NativeSelect.displayName = "@mantine/core/NativeSelect";

exports.NativeSelect = NativeSelect;
//# sourceMappingURL=NativeSelect.js.map
