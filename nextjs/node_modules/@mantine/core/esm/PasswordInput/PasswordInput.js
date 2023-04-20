import React, { forwardRef } from 'react';
import { useId, useUncontrolled } from '@mantine/hooks';
import { rem, useComponentDefaultProps, getSize } from '@mantine/styles';
import { PasswordToggleIcon } from './PasswordToggleIcon.js';
import useStyles from './PasswordInput.styles.js';
import { extractSystemStyles } from '../Box/style-system-props/extract-system-styles/extract-system-styles.js';
import { ActionIcon } from '../ActionIcon/ActionIcon.js';
import { Input } from '../Input/Input.js';

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
const buttonSizes = {
  xs: rem(22),
  sm: rem(26),
  md: rem(28),
  lg: rem(32),
  xl: rem(40)
};
const iconSizes = {
  xs: rem(12),
  sm: rem(15),
  md: rem(17),
  lg: rem(19),
  xl: rem(21)
};
const rightSectionSizes = {
  xs: rem(28),
  sm: rem(32),
  md: rem(34),
  lg: rem(44),
  xl: rem(54)
};
const defaultProps = {
  size: "sm",
  toggleTabIndex: -1,
  visibilityToggleIcon: PasswordToggleIcon,
  __staticSelector: "PasswordInput"
};
const PasswordInput = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("PasswordInput", defaultProps, props), {
    radius,
    disabled,
    size,
    toggleTabIndex,
    className,
    id,
    label,
    error,
    required,
    style,
    icon,
    description,
    wrapperProps,
    classNames,
    styles,
    variant,
    visibilityToggleIcon: VisibilityToggleIcon,
    __staticSelector,
    rightSection: _rightSection,
    rightSectionWidth: _rightSectionWidth,
    rightSectionProps: _rightSectionProps,
    sx,
    labelProps,
    descriptionProps,
    errorProps,
    unstyled,
    visibilityToggleLabel,
    withAsterisk,
    inputContainer,
    iconWidth,
    inputWrapperOrder,
    visible,
    defaultVisible,
    onVisibilityChange
  } = _a, others = __objRest(_a, [
    "radius",
    "disabled",
    "size",
    "toggleTabIndex",
    "className",
    "id",
    "label",
    "error",
    "required",
    "style",
    "icon",
    "description",
    "wrapperProps",
    "classNames",
    "styles",
    "variant",
    "visibilityToggleIcon",
    "__staticSelector",
    "rightSection",
    "rightSectionWidth",
    "rightSectionProps",
    "sx",
    "labelProps",
    "descriptionProps",
    "errorProps",
    "unstyled",
    "visibilityToggleLabel",
    "withAsterisk",
    "inputContainer",
    "iconWidth",
    "inputWrapperOrder",
    "visible",
    "defaultVisible",
    "onVisibilityChange"
  ]);
  const rightSectionWidth = getSize({ size, sizes: rightSectionSizes });
  const { classes } = useStyles({ rightSectionWidth }, { name: "PasswordInput", classNames, styles, unstyled, size, variant });
  const uuid = useId(id);
  const { systemStyles, rest } = extractSystemStyles(others);
  const [_visible, setVisibility] = useUncontrolled({
    value: visible,
    defaultValue: defaultVisible,
    finalValue: false,
    onChange: onVisibilityChange
  });
  const toggleVisibility = () => setVisibility(!_visible);
  const rightSection = /* @__PURE__ */ React.createElement(ActionIcon, {
    className: classes.visibilityToggle,
    tabIndex: toggleTabIndex,
    radius,
    size: getSize({ size, sizes: buttonSizes }),
    "aria-hidden": !visibilityToggleLabel,
    "aria-label": visibilityToggleLabel,
    unstyled,
    onMouseDown: (event) => {
      event.preventDefault();
      toggleVisibility();
    },
    onKeyDown: (event) => {
      if (event.key === " ") {
        event.preventDefault();
        toggleVisibility();
      }
    }
  }, /* @__PURE__ */ React.createElement(VisibilityToggleIcon, {
    reveal: _visible,
    size: getSize({ size, sizes: iconSizes })
  }));
  return /* @__PURE__ */ React.createElement(Input.Wrapper, __spreadValues(__spreadValues({
    required,
    id: uuid,
    label,
    error,
    description,
    size,
    className,
    style,
    classNames,
    styles,
    __staticSelector,
    sx,
    errorProps,
    descriptionProps,
    labelProps,
    unstyled,
    withAsterisk,
    inputWrapperOrder,
    inputContainer,
    variant
  }, systemStyles), wrapperProps), /* @__PURE__ */ React.createElement(Input, {
    component: "div",
    error,
    icon,
    size,
    classNames: __spreadProps(__spreadValues({}, classNames), { input: classes.input }),
    styles,
    radius,
    disabled,
    __staticSelector,
    rightSectionWidth,
    rightSection: !disabled && rightSection,
    variant,
    unstyled,
    iconWidth
  }, /* @__PURE__ */ React.createElement("input", __spreadValues({
    type: _visible ? "text" : "password",
    required,
    "data-invalid": !!error || void 0,
    "data-with-icon": !!icon || void 0,
    className: classes.innerInput,
    disabled,
    id: uuid,
    ref
  }, rest))));
});
PasswordInput.displayName = "@mantine/core/PasswordInput";

export { PasswordInput };
//# sourceMappingURL=PasswordInput.js.map
