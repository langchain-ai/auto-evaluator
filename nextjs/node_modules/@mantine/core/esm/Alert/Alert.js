import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { useId } from '@mantine/hooks';
import useStyles from './Alert.styles.js';
import { Box } from '../Box/Box.js';
import { CloseButton } from '../CloseButton/CloseButton.js';

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
  variant: "light"
};
const Alert = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("Alert", defaultProps, props), {
    id,
    className,
    title,
    variant,
    children,
    color,
    classNames,
    icon,
    styles,
    onClose,
    radius,
    withCloseButton,
    closeButtonLabel,
    unstyled
  } = _a, others = __objRest(_a, [
    "id",
    "className",
    "title",
    "variant",
    "children",
    "color",
    "classNames",
    "icon",
    "styles",
    "onClose",
    "radius",
    "withCloseButton",
    "closeButtonLabel",
    "unstyled"
  ]);
  const { classes, cx } = useStyles({ color, radius }, { classNames, styles, unstyled, variant, name: "Alert" });
  const rootId = useId(id);
  const titleId = title && `${rootId}-title`;
  const bodyId = `${rootId}-body`;
  return /* @__PURE__ */ React.createElement(Box, __spreadValues({
    id: rootId,
    role: "alert",
    "aria-labelledby": titleId,
    "aria-describedby": bodyId,
    className: cx(classes.root, classes[variant], className),
    ref
  }, others), /* @__PURE__ */ React.createElement("div", {
    className: classes.wrapper
  }, icon && /* @__PURE__ */ React.createElement("div", {
    className: classes.icon
  }, icon), /* @__PURE__ */ React.createElement("div", {
    className: classes.body
  }, title && /* @__PURE__ */ React.createElement("div", {
    className: classes.title,
    "data-with-close-button": withCloseButton || void 0
  }, /* @__PURE__ */ React.createElement("span", {
    id: titleId,
    className: classes.label
  }, title)), /* @__PURE__ */ React.createElement("div", {
    id: bodyId,
    className: classes.message
  }, children)), withCloseButton && /* @__PURE__ */ React.createElement(CloseButton, {
    className: classes.closeButton,
    onClick: onClose,
    variant: "transparent",
    size: 16,
    iconSize: 16,
    "aria-label": closeButtonLabel
  })));
});
Alert.displayName = "@mantine/core/Alert";

export { Alert };
//# sourceMappingURL=Alert.js.map
