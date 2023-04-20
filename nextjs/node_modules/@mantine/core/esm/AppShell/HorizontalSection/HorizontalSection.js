import React, { forwardRef } from 'react';
import { getDefaultZIndex, em, rem, Global } from '@mantine/styles';
import { useAppShellContext } from '../AppShell.context.js';
import { getSortedBreakpoints } from './get-sorted-breakpoints/get-sorted-breakpoints.js';
import useStyles from './HorizontalSection.styles.js';
import { Box } from '../../Box/Box.js';

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
const HorizontalSection = forwardRef((_a, ref) => {
  var _b = _a, {
    width,
    height,
    fixed = false,
    position,
    zIndex,
    hiddenBreakpoint = "md",
    hidden = false,
    withBorder = true,
    className,
    classNames,
    styles,
    children,
    section,
    __staticSelector,
    unstyled,
    variant
  } = _b, others = __objRest(_b, [
    "width",
    "height",
    "fixed",
    "position",
    "zIndex",
    "hiddenBreakpoint",
    "hidden",
    "withBorder",
    "className",
    "classNames",
    "styles",
    "children",
    "section",
    "__staticSelector",
    "unstyled",
    "variant"
  ]);
  const ctx = useAppShellContext();
  const { classes, cx, theme } = useStyles({
    width,
    height,
    fixed: ctx.fixed || fixed,
    position,
    hiddenBreakpoint,
    zIndex: zIndex || ctx.zIndex || getDefaultZIndex("app"),
    section,
    withBorder,
    layout: ctx.layout
  }, { classNames, styles, name: __staticSelector, unstyled, variant });
  const breakpoints = getSortedBreakpoints(width, theme).reduce((acc, [breakpoint, breakpointSize]) => {
    acc[`@media (min-width: ${em(breakpoint)})`] = {
      [`--mantine-${section}-width`]: rem(breakpointSize)
    };
    return acc;
  }, {});
  return /* @__PURE__ */ React.createElement(Box, __spreadValues({
    component: section === "navbar" ? "nav" : "aside",
    ref,
    "data-hidden": hidden || void 0,
    className: cx(classes.root, className)
  }, others), children, /* @__PURE__ */ React.createElement(Global, {
    styles: () => ({
      ":root": __spreadValues({
        [`--mantine-${section}-width`]: (width == null ? void 0 : width.base) ? rem(width.base) : "0rem"
      }, breakpoints)
    })
  }));
});
HorizontalSection.displayName = "@mantine/core/HorizontalSection";

export { HorizontalSection };
//# sourceMappingURL=HorizontalSection.js.map
