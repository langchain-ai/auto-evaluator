import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import useStyles from './Notification.styles.js';
import { Box } from '../Box/Box.js';
import { Loader } from '../Loader/Loader.js';
import { Text } from '../Text/Text.js';
import { CloseButton } from '../CloseButton/CloseButton.js';

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
  withCloseButton: true
};
const Notification = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("Notification", defaultProps, props), {
    className,
    color,
    radius,
    loading,
    withCloseButton,
    title,
    icon,
    children,
    onClose,
    closeButtonProps,
    classNames,
    styles,
    unstyled,
    variant
  } = _a, others = __objRest(_a, [
    "className",
    "color",
    "radius",
    "loading",
    "withCloseButton",
    "title",
    "icon",
    "children",
    "onClose",
    "closeButtonProps",
    "classNames",
    "styles",
    "unstyled",
    "variant"
  ]);
  const { classes, cx } = useStyles({ color, radius, withTitle: !!title }, { name: "Notification", classNames, styles, unstyled, variant });
  return /* @__PURE__ */ React.createElement(Box, __spreadValues({
    className: cx(classes.root, className),
    "data-with-icon": !!icon || loading || void 0,
    role: "alert",
    ref
  }, others), icon && !loading && /* @__PURE__ */ React.createElement("div", {
    className: classes.icon
  }, icon), loading && /* @__PURE__ */ React.createElement(Loader, {
    size: 28,
    color,
    className: classes.loader
  }), /* @__PURE__ */ React.createElement("div", {
    className: classes.body
  }, title && /* @__PURE__ */ React.createElement(Text, {
    className: classes.title,
    size: "sm",
    weight: 500
  }, title), /* @__PURE__ */ React.createElement(Text, {
    color: "dimmed",
    className: classes.description,
    size: "sm"
  }, children)), withCloseButton && /* @__PURE__ */ React.createElement(CloseButton, __spreadProps(__spreadValues({
    iconSize: 16,
    color: "gray"
  }, closeButtonProps), {
    onClick: onClose,
    className: classes.closeButton
  })));
});
Notification.displayName = "@mantine/core/Notification";

export { Notification };
//# sourceMappingURL=Notification.js.map
