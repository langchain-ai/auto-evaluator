'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('@mantine/hooks');
var styles = require('@mantine/styles');
var PasswordToggleIcon = require('./PasswordToggleIcon.js');
var PasswordInput_styles = require('./PasswordInput.styles.js');
var extractSystemStyles = require('../Box/style-system-props/extract-system-styles/extract-system-styles.js');
var ActionIcon = require('../ActionIcon/ActionIcon.js');
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
const buttonSizes = {
  xs: styles.rem(22),
  sm: styles.rem(26),
  md: styles.rem(28),
  lg: styles.rem(32),
  xl: styles.rem(40)
};
const iconSizes = {
  xs: styles.rem(12),
  sm: styles.rem(15),
  md: styles.rem(17),
  lg: styles.rem(19),
  xl: styles.rem(21)
};
const rightSectionSizes = {
  xs: styles.rem(28),
  sm: styles.rem(32),
  md: styles.rem(34),
  lg: styles.rem(44),
  xl: styles.rem(54)
};
const defaultProps = {
  size: "sm",
  toggleTabIndex: -1,
  visibilityToggleIcon: PasswordToggleIcon.PasswordToggleIcon,
  __staticSelector: "PasswordInput"
};
const PasswordInput = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("PasswordInput", defaultProps, props), {
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
    styles: styles$1,
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
  const rightSectionWidth = styles.getSize({ size, sizes: rightSectionSizes });
  const { classes } = PasswordInput_styles['default']({ rightSectionWidth }, { name: "PasswordInput", classNames, styles: styles$1, unstyled, size, variant });
  const uuid = hooks.useId(id);
  const { systemStyles, rest } = extractSystemStyles.extractSystemStyles(others);
  const [_visible, setVisibility] = hooks.useUncontrolled({
    value: visible,
    defaultValue: defaultVisible,
    finalValue: false,
    onChange: onVisibilityChange
  });
  const toggleVisibility = () => setVisibility(!_visible);
  const rightSection = /* @__PURE__ */ React__default.createElement(ActionIcon.ActionIcon, {
    className: classes.visibilityToggle,
    tabIndex: toggleTabIndex,
    radius,
    size: styles.getSize({ size, sizes: buttonSizes }),
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
  }, /* @__PURE__ */ React__default.createElement(VisibilityToggleIcon, {
    reveal: _visible,
    size: styles.getSize({ size, sizes: iconSizes })
  }));
  return /* @__PURE__ */ React__default.createElement(Input.Input.Wrapper, __spreadValues(__spreadValues({
    required,
    id: uuid,
    label,
    error,
    description,
    size,
    className,
    style,
    classNames,
    styles: styles$1,
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
  }, systemStyles), wrapperProps), /* @__PURE__ */ React__default.createElement(Input.Input, {
    component: "div",
    error,
    icon,
    size,
    classNames: __spreadProps(__spreadValues({}, classNames), { input: classes.input }),
    styles: styles$1,
    radius,
    disabled,
    __staticSelector,
    rightSectionWidth,
    rightSection: !disabled && rightSection,
    variant,
    unstyled,
    iconWidth
  }, /* @__PURE__ */ React__default.createElement("input", __spreadValues({
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

exports.PasswordInput = PasswordInput;
//# sourceMappingURL=PasswordInput.js.map
