import React from 'react';
import useStyles from './DefaultValue.styles.js';
import { CloseButton } from '../../CloseButton/CloseButton.js';

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
const buttonSizes = {
  xs: 16,
  sm: 22,
  md: 24,
  lg: 26,
  xl: 30
};
function DefaultValue(_a) {
  var _b = _a, {
    label,
    classNames,
    styles,
    className,
    onRemove,
    disabled,
    readOnly,
    size,
    radius = "sm",
    variant,
    unstyled
  } = _b, others = __objRest(_b, [
    "label",
    "classNames",
    "styles",
    "className",
    "onRemove",
    "disabled",
    "readOnly",
    "size",
    "radius",
    "variant",
    "unstyled"
  ]);
  const { classes, cx } = useStyles({ disabled, readOnly, radius }, { name: "MultiSelect", classNames, styles, unstyled, size, variant });
  return /* @__PURE__ */ React.createElement("div", __spreadValues({
    className: cx(classes.defaultValue, className)
  }, others), /* @__PURE__ */ React.createElement("span", {
    className: classes.defaultValueLabel
  }, label), !disabled && !readOnly && /* @__PURE__ */ React.createElement(CloseButton, {
    "aria-hidden": true,
    onMouseDown: onRemove,
    size: buttonSizes[size],
    radius: 2,
    color: "blue",
    variant: "transparent",
    iconSize: "70%",
    className: classes.defaultValueRemove,
    tabIndex: -1,
    unstyled
  }));
}
DefaultValue.displayName = "@mantine/core/MultiSelect/DefaultValue";

export { DefaultValue };
//# sourceMappingURL=DefaultValue.js.map
