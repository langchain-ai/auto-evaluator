import React, { forwardRef } from 'react';
import { useComponentDefaultProps, rem } from '@mantine/styles';
import { createPolymorphicComponent } from '@mantine/utils';
import { InputWrapper } from './InputWrapper/InputWrapper.js';
import { InputDescription } from './InputDescription/InputDescription.js';
import { InputLabel } from './InputLabel/InputLabel.js';
import { InputError } from './InputError/InputError.js';
import { InputPlaceholder } from './InputPlaceholder/InputPlaceholder.js';
import { useInputWrapperContext } from './InputWrapper.context.js';
import useStyles from './Input.styles.js';
import { extractSystemStyles } from '../Box/style-system-props/extract-system-styles/extract-system-styles.js';
import { Box } from '../Box/Box.js';

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
const _Input = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("Input", defaultProps, props), {
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
    styles,
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
  const { offsetBottom, offsetTop, describedBy } = useInputWrapperContext();
  const { classes, cx } = useStyles({
    radius,
    multiline,
    invalid: !!error,
    rightSectionWidth: rightSectionWidth ? rem(rightSectionWidth) : void 0,
    iconWidth,
    withRightSection: !!rightSection,
    offsetBottom,
    offsetTop,
    pointer
  }, { classNames, styles, name: ["Input", __staticSelector], unstyled, variant, size });
  const { systemStyles, rest } = extractSystemStyles(others);
  return /* @__PURE__ */ React.createElement(Box, __spreadValues(__spreadValues({
    className: cx(classes.wrapper, className),
    sx,
    style
  }, systemStyles), wrapperProps), icon && /* @__PURE__ */ React.createElement("div", {
    className: classes.icon
  }, icon), /* @__PURE__ */ React.createElement(Box, __spreadProps(__spreadValues({
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
  })), rightSection && /* @__PURE__ */ React.createElement("div", __spreadProps(__spreadValues({}, rightSectionProps), {
    className: classes.rightSection
  }), rightSection));
});
_Input.displayName = "@mantine/core/Input";
_Input.Wrapper = InputWrapper;
_Input.Label = InputLabel;
_Input.Description = InputDescription;
_Input.Error = InputError;
_Input.Placeholder = InputPlaceholder;
const Input = createPolymorphicComponent(_Input);

export { Input, _Input };
//# sourceMappingURL=Input.js.map
