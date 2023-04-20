'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var utils = require('@mantine/utils');
var ButtonGroup = require('./ButtonGroup/ButtonGroup.js');
var Button_styles = require('./Button.styles.js');
var Loader = require('../Loader/Loader.js');
var UnstyledButton = require('../UnstyledButton/UnstyledButton.js');

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
  size: "sm",
  type: "button",
  variant: "filled",
  loaderPosition: "left"
};
const _Button = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("Button", defaultProps, props), {
    className,
    size,
    color,
    type,
    disabled,
    children,
    leftIcon,
    rightIcon,
    fullWidth,
    variant,
    radius,
    uppercase,
    compact,
    loading,
    loaderPosition,
    loaderProps,
    gradient,
    classNames,
    styles: styles$1,
    unstyled
  } = _a, others = __objRest(_a, [
    "className",
    "size",
    "color",
    "type",
    "disabled",
    "children",
    "leftIcon",
    "rightIcon",
    "fullWidth",
    "variant",
    "radius",
    "uppercase",
    "compact",
    "loading",
    "loaderPosition",
    "loaderProps",
    "gradient",
    "classNames",
    "styles",
    "unstyled"
  ]);
  const { classes, cx, theme } = Button_styles['default']({
    radius,
    color,
    fullWidth,
    compact,
    gradient,
    withLeftIcon: !!leftIcon,
    withRightIcon: !!rightIcon
  }, { name: "Button", unstyled, classNames, styles: styles$1, variant, size });
  const colors = theme.fn.variant({ color, variant });
  const loader = /* @__PURE__ */ React__default.createElement(Loader.Loader, __spreadValues({
    color: colors.color,
    size: `calc(${styles.getSize({ size, sizes: Button_styles.sizes }).height} / 2)`
  }, loaderProps));
  return /* @__PURE__ */ React__default.createElement(UnstyledButton.UnstyledButton, __spreadValues({
    className: cx(classes.root, className),
    type,
    disabled,
    "data-button": true,
    "data-disabled": disabled || void 0,
    "data-loading": loading || void 0,
    ref,
    unstyled
  }, others), /* @__PURE__ */ React__default.createElement("div", {
    className: classes.inner
  }, (leftIcon || loading && loaderPosition === "left") && /* @__PURE__ */ React__default.createElement("span", {
    className: cx(classes.icon, classes.leftIcon)
  }, loading && loaderPosition === "left" ? loader : leftIcon), loading && loaderPosition === "center" && /* @__PURE__ */ React__default.createElement("span", {
    className: classes.centerLoader
  }, loader), /* @__PURE__ */ React__default.createElement("span", {
    className: classes.label,
    style: { textTransform: uppercase ? "uppercase" : void 0 }
  }, children), (rightIcon || loading && loaderPosition === "right") && /* @__PURE__ */ React__default.createElement("span", {
    className: cx(classes.icon, classes.rightIcon)
  }, loading && loaderPosition === "right" ? loader : rightIcon)));
});
_Button.displayName = "@mantine/core/Button";
_Button.Group = ButtonGroup.ButtonGroup;
const Button = utils.createPolymorphicComponent(_Button);

exports.Button = Button;
exports._Button = _Button;
//# sourceMappingURL=Button.js.map
