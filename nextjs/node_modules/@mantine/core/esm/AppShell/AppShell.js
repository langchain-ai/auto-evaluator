import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { AppShellProvider } from './AppShell.context.js';
import useStyles from './AppShell.styles.js';
import { Box } from '../Box/Box.js';

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
  fixed: true,
  padding: "md"
};
const AppShell = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("AppShell", defaultProps, props), {
    children,
    navbar,
    header,
    footer,
    aside,
    fixed,
    zIndex,
    padding,
    navbarOffsetBreakpoint,
    asideOffsetBreakpoint,
    className,
    styles,
    classNames,
    unstyled,
    hidden,
    layout,
    variant
  } = _a, others = __objRest(_a, [
    "children",
    "navbar",
    "header",
    "footer",
    "aside",
    "fixed",
    "zIndex",
    "padding",
    "navbarOffsetBreakpoint",
    "asideOffsetBreakpoint",
    "className",
    "styles",
    "classNames",
    "unstyled",
    "hidden",
    "layout",
    "variant"
  ]);
  const { classes, cx } = useStyles({ padding, fixed, navbarOffsetBreakpoint, asideOffsetBreakpoint }, { styles, classNames, unstyled, name: "AppShell", variant });
  if (hidden) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
  }
  return /* @__PURE__ */ React.createElement(AppShellProvider, {
    value: { fixed, zIndex, layout }
  }, /* @__PURE__ */ React.createElement(Box, __spreadValues({
    className: cx(classes.root, className),
    ref
  }, others), header, /* @__PURE__ */ React.createElement("div", {
    className: classes.body
  }, navbar, /* @__PURE__ */ React.createElement("main", {
    className: classes.main
  }, children), aside), footer));
});
AppShell.displayName = "@mantine/core/AppShell";

export { AppShell };
//# sourceMappingURL=AppShell.js.map
