'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var InputLabel = require('../InputLabel/InputLabel.js');
var InputError = require('../InputError/InputError.js');
var InputDescription = require('../InputDescription/InputDescription.js');
var InputWrapper_context = require('../InputWrapper.context.js');
var getInputOffsets = require('./get-input-offsets.js');
var InputWrapper_styles = require('./InputWrapper.styles.js');
var Box = require('../../Box/Box.js');

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
  labelElement: "label",
  size: "sm",
  inputContainer: (children) => children,
  inputWrapperOrder: ["label", "description", "input", "error"]
};
const InputWrapper = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("InputWrapper", defaultProps, props), {
    className,
    label,
    children,
    required,
    id,
    error,
    description,
    labelElement,
    labelProps,
    descriptionProps,
    errorProps,
    classNames,
    styles: styles$1,
    size,
    inputContainer,
    __staticSelector,
    unstyled,
    inputWrapperOrder,
    withAsterisk,
    variant
  } = _a, others = __objRest(_a, [
    "className",
    "label",
    "children",
    "required",
    "id",
    "error",
    "description",
    "labelElement",
    "labelProps",
    "descriptionProps",
    "errorProps",
    "classNames",
    "styles",
    "size",
    "inputContainer",
    "__staticSelector",
    "unstyled",
    "inputWrapperOrder",
    "withAsterisk",
    "variant"
  ]);
  const { classes, cx } = InputWrapper_styles['default'](null, {
    classNames,
    styles: styles$1,
    name: ["InputWrapper", __staticSelector],
    unstyled,
    variant,
    size
  });
  const sharedProps = {
    classNames,
    styles: styles$1,
    unstyled,
    size,
    variant,
    __staticSelector
  };
  const isRequired = typeof withAsterisk === "boolean" ? withAsterisk : required;
  const errorId = id ? `${id}-error` : errorProps == null ? void 0 : errorProps.id;
  const descriptionId = id ? `${id}-description` : descriptionProps == null ? void 0 : descriptionProps.id;
  const hasError = !!error && typeof error !== "boolean";
  const _describedBy = `${hasError ? errorId : ""} ${description ? descriptionId : ""}`;
  const describedBy = _describedBy.trim().length > 0 ? _describedBy.trim() : void 0;
  const _label = label && /* @__PURE__ */ React__default.createElement(InputLabel.InputLabel, __spreadValues(__spreadValues({
    key: "label",
    labelElement,
    id: id ? `${id}-label` : void 0,
    htmlFor: id,
    required: isRequired
  }, sharedProps), labelProps), label);
  const _description = description && /* @__PURE__ */ React__default.createElement(InputDescription.InputDescription, __spreadProps(__spreadValues(__spreadValues({
    key: "description"
  }, descriptionProps), sharedProps), {
    size: (descriptionProps == null ? void 0 : descriptionProps.size) || sharedProps.size,
    id: (descriptionProps == null ? void 0 : descriptionProps.id) || descriptionId
  }), description);
  const _input = /* @__PURE__ */ React__default.createElement(React.Fragment, {
    key: "input"
  }, inputContainer(children));
  const _error = typeof error !== "boolean" && error && /* @__PURE__ */ React__default.createElement(InputError.InputError, __spreadProps(__spreadValues(__spreadValues({}, errorProps), sharedProps), {
    size: (errorProps == null ? void 0 : errorProps.size) || sharedProps.size,
    key: "error",
    id: (errorProps == null ? void 0 : errorProps.id) || errorId
  }), error);
  const content = inputWrapperOrder.map((part) => {
    switch (part) {
      case "label":
        return _label;
      case "input":
        return _input;
      case "description":
        return _description;
      case "error":
        return _error;
      default:
        return null;
    }
  });
  return /* @__PURE__ */ React__default.createElement(InputWrapper_context.InputWrapperProvider, {
    value: __spreadValues({
      describedBy
    }, getInputOffsets.getInputOffsets(inputWrapperOrder, {
      hasDescription: !!_description,
      hasError: !!_error
    }))
  }, /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues({
    className: cx(classes.root, className),
    ref
  }, others), content));
});
InputWrapper.displayName = "@mantine/core/InputWrapper";

exports.InputWrapper = InputWrapper;
//# sourceMappingURL=InputWrapper.js.map
