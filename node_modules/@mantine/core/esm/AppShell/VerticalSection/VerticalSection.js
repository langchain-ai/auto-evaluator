import React, { forwardRef } from 'react';
import { getDefaultZIndex, em, rem, Global } from '@mantine/styles';
import { useAppShellContext } from '../AppShell.context.js';
import useStyles from './VerticalSection.styles.js';
import { getSortedBreakpoints } from '../HorizontalSection/get-sorted-breakpoints/get-sorted-breakpoints.js';
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
const VerticalSection = forwardRef((_a, ref) => {
  var _b = _a, {
    children,
    className,
    classNames,
    styles,
    height,
    fixed = false,
    withBorder = true,
    position,
    zIndex,
    section,
    unstyled,
    __staticSelector,
    variant
  } = _b, others = __objRest(_b, [
    "children",
    "className",
    "classNames",
    "styles",
    "height",
    "fixed",
    "withBorder",
    "position",
    "zIndex",
    "section",
    "unstyled",
    "__staticSelector",
    "variant"
  ]);
  const ctx = useAppShellContext();
  const _zIndex = zIndex || ctx.zIndex || getDefaultZIndex("app");
  const { classes, cx, theme } = useStyles({
    height,
    fixed: ctx.fixed || fixed,
    position,
    zIndex: typeof _zIndex === "number" && ctx.layout === "default" ? _zIndex + 1 : _zIndex,
    layout: ctx.layout,
    borderPosition: withBorder ? section === "header" ? "bottom" : "top" : "none"
  }, { name: __staticSelector, classNames, styles, unstyled, variant });
  const breakpoints = typeof height === "object" && height !== null ? getSortedBreakpoints(height, theme).reduce((acc, [breakpoint, breakpointSize]) => {
    acc[`@media (min-width: ${em(breakpoint)})`] = {
      [`--mantine-${section}-height`]: rem(breakpointSize)
    };
    return acc;
  }, {}) : null;
  return /* @__PURE__ */ React.createElement(Box, __spreadValues({
    component: section === "header" ? "header" : "footer",
    className: cx(classes.root, className),
    ref
  }, others), children, /* @__PURE__ */ React.createElement(Global, {
    styles: () => ({
      ":root": __spreadValues({
        [`--mantine-${section}-height`]: typeof height === "object" ? rem(height == null ? void 0 : height.base) || "100%" : rem(height)
      }, breakpoints)
    })
  }));
});
VerticalSection.displayName = "@mantine/core/VerticalSection";

export { VerticalSection };
//# sourceMappingURL=VerticalSection.js.map
