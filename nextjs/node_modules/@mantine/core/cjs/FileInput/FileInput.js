'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('@mantine/hooks');
var FileInput_styles = require('./FileInput.styles.js');
var useInputProps = require('../Input/use-input-props.js');
var CloseButton = require('../CloseButton/CloseButton.js');
var Input = require('../Input/Input.js');
var FileButton = require('../FileButton/FileButton.js');
var Text = require('../Text/Text.js');

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
const DefaultValue = ({ value }) => /* @__PURE__ */ React__default.createElement(Text.Text, {
  sx: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
}, Array.isArray(value) ? value.map((file) => file.name).join(", ") : value == null ? void 0 : value.name);
const defaultProps = {
  size: "sm",
  valueComponent: DefaultValue
};
const _FileInput = React.forwardRef((props, ref) => {
  const _a = useInputProps.useInputProps("FileInput", defaultProps, props), {
    inputProps,
    wrapperProps,
    placeholder,
    value,
    defaultValue,
    onChange,
    multiple,
    accept,
    name,
    form,
    classNames,
    styles,
    unstyled,
    valueComponent: ValueComponent,
    rightSection,
    clearable,
    clearButtonProps,
    readOnly,
    capture,
    fileInputProps
  } = _a, others = __objRest(_a, [
    "inputProps",
    "wrapperProps",
    "placeholder",
    "value",
    "defaultValue",
    "onChange",
    "multiple",
    "accept",
    "name",
    "form",
    "classNames",
    "styles",
    "unstyled",
    "valueComponent",
    "rightSection",
    "clearable",
    "clearButtonProps",
    "readOnly",
    "capture",
    "fileInputProps"
  ]);
  const resetRef = React.useRef();
  const { classes, cx } = FileInput_styles['default'](null, {
    name: "FileInput",
    classNames,
    styles,
    unstyled
  });
  const [_value, setValue] = hooks.useUncontrolled({
    value,
    defaultValue,
    onChange,
    finalValue: multiple ? [] : null
  });
  const hasValue = Array.isArray(_value) ? _value.length !== 0 : _value !== null;
  const _rightSection = rightSection || (clearable && hasValue && !readOnly ? /* @__PURE__ */ React__default.createElement(CloseButton.CloseButton, __spreadProps(__spreadValues({}, clearButtonProps), {
    variant: "transparent",
    onClick: () => setValue(multiple ? [] : null),
    size: inputProps.size,
    unstyled
  })) : null);
  React.useEffect(() => {
    if (Array.isArray(_value) && _value.length === 0 || _value === null) {
      resetRef.current();
    }
  }, [_value]);
  return /* @__PURE__ */ React__default.createElement(Input.Input.Wrapper, __spreadProps(__spreadValues({}, wrapperProps), {
    __staticSelector: "FileInput"
  }), /* @__PURE__ */ React__default.createElement(FileButton.FileButton, {
    onChange: setValue,
    multiple,
    accept,
    name,
    form,
    resetRef,
    disabled: readOnly,
    capture,
    inputProps: fileInputProps
  }, (fileButtonProps) => /* @__PURE__ */ React__default.createElement(Input.Input, __spreadProps(__spreadValues(__spreadValues(__spreadValues({
    multiline: true
  }, fileButtonProps), inputProps), others), {
    component: "button",
    type: "button",
    ref,
    __staticSelector: "FileInput",
    rightSection: _rightSection,
    classNames: __spreadProps(__spreadValues({}, classNames), { input: cx(classes.input, classNames == null ? void 0 : classNames.input) })
  }), !hasValue ? /* @__PURE__ */ React__default.createElement(Input.Input.Placeholder, {
    className: classes.placeholder
  }, placeholder) : /* @__PURE__ */ React__default.createElement(ValueComponent, {
    value: _value
  }))));
});
_FileInput.displayName = "@mantine/core/FileInput";
const FileInput = _FileInput;

exports.FileInput = FileInput;
exports._FileInput = _FileInput;
//# sourceMappingURL=FileInput.js.map
