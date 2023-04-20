import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { createPolymorphicComponent } from '@mantine/utils';
import useStyles from './ActionIcon.styles.js';
import { Loader } from '../Loader/Loader.js';
import { UnstyledButton } from '../UnstyledButton/UnstyledButton.js';

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
  color: "gray",
  size: "md",
  variant: "subtle"
};
const _ActionIcon = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("ActionIcon", defaultProps, props), {
    className,
    color,
    children,
    radius,
    size,
    variant,
    gradient,
    disabled,
    loaderProps,
    loading,
    unstyled,
    __staticSelector
  } = _a, others = __objRest(_a, [
    "className",
    "color",
    "children",
    "radius",
    "size",
    "variant",
    "gradient",
    "disabled",
    "loaderProps",
    "loading",
    "unstyled",
    "__staticSelector"
  ]);
  const { classes, cx, theme } = useStyles({ radius, color, gradient }, { name: ["ActionIcon", __staticSelector], unstyled, size, variant });
  const loader = /* @__PURE__ */ React.createElement(Loader, __spreadValues({
    color: theme.fn.variant({ color, variant }).color,
    size: "100%",
    "data-action-icon-loader": true
  }, loaderProps));
  return /* @__PURE__ */ React.createElement(UnstyledButton, __spreadValues({
    className: cx(classes.root, className),
    ref,
    disabled,
    "data-disabled": disabled || void 0,
    "data-loading": loading || void 0,
    unstyled
  }, others), loading ? loader : children);
});
_ActionIcon.displayName = "@mantine/core/ActionIcon";
const ActionIcon = createPolymorphicComponent(_ActionIcon);

export { ActionIcon, _ActionIcon };
//# sourceMappingURL=ActionIcon.js.map
