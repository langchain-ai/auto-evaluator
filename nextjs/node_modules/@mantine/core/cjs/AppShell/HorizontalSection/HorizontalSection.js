'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var AppShell_context = require('../AppShell.context.js');
var getSortedBreakpoints = require('./get-sorted-breakpoints/get-sorted-breakpoints.js');
var HorizontalSection_styles = require('./HorizontalSection.styles.js');
var Box = require('../../Box/Box.js');

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
const HorizontalSection = React.forwardRef((_a, ref) => {
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
    styles: styles$1,
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
  const ctx = AppShell_context.useAppShellContext();
  const { classes, cx, theme } = HorizontalSection_styles['default']({
    width,
    height,
    fixed: ctx.fixed || fixed,
    position,
    hiddenBreakpoint,
    zIndex: zIndex || ctx.zIndex || styles.getDefaultZIndex("app"),
    section,
    withBorder,
    layout: ctx.layout
  }, { classNames, styles: styles$1, name: __staticSelector, unstyled, variant });
  const breakpoints = getSortedBreakpoints.getSortedBreakpoints(width, theme).reduce((acc, [breakpoint, breakpointSize]) => {
    acc[`@media (min-width: ${styles.em(breakpoint)})`] = {
      [`--mantine-${section}-width`]: styles.rem(breakpointSize)
    };
    return acc;
  }, {});
  return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues({
    component: section === "navbar" ? "nav" : "aside",
    ref,
    "data-hidden": hidden || void 0,
    className: cx(classes.root, className)
  }, others), children, /* @__PURE__ */ React__default.createElement(styles.Global, {
    styles: () => ({
      ":root": __spreadValues({
        [`--mantine-${section}-width`]: (width == null ? void 0 : width.base) ? styles.rem(width.base) : "0rem"
      }, breakpoints)
    })
  }));
});
HorizontalSection.displayName = "@mantine/core/HorizontalSection";

exports.HorizontalSection = HorizontalSection;
//# sourceMappingURL=HorizontalSection.js.map
