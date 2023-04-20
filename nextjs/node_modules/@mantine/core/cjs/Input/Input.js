'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var utils = require('@mantine/utils');
var InputWrapper = require('./InputWrapper/InputWrapper.js');
var InputDescription = require('./InputDescription/InputDescription.js');
var InputLabel = require('./InputLabel/InputLabel.js');
var InputError = require('./InputError/InputError.js');
var InputPlaceholder = require('./InputPlaceholder/InputPlaceholder.js');
var InputWrapper_context = require('./InputWrapper.context.js');
var Input_styles = require('./Input.styles.js');
var extractSystemStyles = require('../Box/style-system-props/extract-system-styles/extract-system-styles.js');
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
const defaultProps = {
  size: "sm",
  variant: "default"
};
const _Input = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("Input", defaultProps, props), {
    className,
    error,
    required,
    disabled,
    variant,
    icon,
    style,
    rightSectionWidth,
    iconWidth,
    rightSection,
    rightSectionProps,
    radius,
    size,
    wrapperProps,
    classNames,
    styles: styles$1,
    __staticSelector,
    multiline,
    sx,
    unstyled,
    pointer
  } = _a, others = __objRest(_a, [
    "className",
    "error",
    "required",
    "disabled",
    "variant",
    "icon",
    "style",
    "rightSectionWidth",
    "iconWidth",
    "rightSection",
    "rightSectionProps",
    "radius",
    "size",
    "wrapperProps",
    "classNames",
    "styles",
    "__staticSelector",
    "multiline",
    "sx",
    "unstyled",
    "pointer"
  ]);
  const { offsetBottom, offsetTop, describedBy } = InputWrapper_context.useInputWrapperContext();
  const { classes, cx } = Input_styles['default']({
    radius,
    multiline,
    invalid: !!error,
    rightSectionWidth: rightSectionWidth ? styles.rem(rightSectionWidth) : void 0,
    iconWidth,
    withRightSection: !!rightSection,
    offsetBottom,
    offsetTop,
    pointer
  }, { classNames, styles: styles$1, name: ["Input", __staticSelector], unstyled, variant, size });
  const { systemStyles, rest } = extractSystemStyles.extractSystemStyles(others);
  return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues(__spreadValues({
    className: cx(classes.wrapper, className),
    sx,
    style
  }, systemStyles), wrapperProps), icon && /* @__PURE__ */ React__default.createElement("div", {
    className: classes.icon
  }, icon), /* @__PURE__ */ React__default.createElement(Box.Box, __spreadProps(__spreadValues({
    component: "input"
  }, rest), {
    ref,
    required,
    "aria-invalid": !!error,
    "aria-describedby": describedBy,
    disabled,
    "data-disabled": disabled || void 0,
    "data-with-icon": !!icon || void 0,
    "data-invalid": !!error || void 0,
    className: classes.input
  })), rightSection && /* @__PURE__ */ React__default.createElement("div", __spreadProps(__spreadValues({}, rightSectionProps), {
    className: classes.rightSection
  }), rightSection));
});
_Input.displayName = "@mantine/core/Input";
_Input.Wrapper = InputWrapper.InputWrapper;
_Input.Label = InputLabel.InputLabel;
_Input.Description = InputDescription.InputDescription;
_Input.Error = InputError.InputError;
_Input.Placeholder = InputPlaceholder.InputPlaceholder;
const Input = utils.createPolymorphicComponent(_Input);

exports.Input = Input;
exports._Input = _Input;
//# sourceMappingURL=Input.js.map
