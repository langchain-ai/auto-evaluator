'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var AppShell_context = require('../AppShell.context.js');
var VerticalSection_styles = require('./VerticalSection.styles.js');
var getSortedBreakpoints = require('../HorizontalSection/get-sorted-breakpoints/get-sorted-breakpoints.js');
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
const VerticalSection = React.forwardRef((_a, ref) => {
  var _b = _a, {
    children,
    className,
    classNames,
    styles: styles$1,
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
  const ctx = AppShell_context.useAppShellContext();
  const _zIndex = zIndex || ctx.zIndex || styles.getDefaultZIndex("app");
  const { classes, cx, theme } = VerticalSection_styles['default']({
    height,
    fixed: ctx.fixed || fixed,
    position,
    zIndex: typeof _zIndex === "number" && ctx.layout === "default" ? _zIndex + 1 : _zIndex,
    layout: ctx.layout,
    borderPosition: withBorder ? section === "header" ? "bottom" : "top" : "none"
  }, { name: __staticSelector, classNames, styles: styles$1, unstyled, variant });
  const breakpoints = typeof height === "object" && height !== null ? getSortedBreakpoints.getSortedBreakpoints(height, theme).reduce((acc, [breakpoint, breakpointSize]) => {
    acc[`@media (min-width: ${styles.em(breakpoint)})`] = {
      [`--mantine-${section}-height`]: styles.rem(breakpointSize)
    };
    return acc;
  }, {}) : null;
  return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues({
    component: section === "header" ? "header" : "footer",
    className: cx(classes.root, className),
    ref
  }, others), children, /* @__PURE__ */ React__default.createElement(styles.Global, {
    styles: () => ({
      ":root": __spreadValues({
        [`--mantine-${section}-height`]: typeof height === "object" ? styles.rem(height == null ? void 0 : height.base) || "100%" : styles.rem(height)
      }, breakpoints)
    })
  }));
});
VerticalSection.displayName = "@mantine/core/VerticalSection";

exports.VerticalSection = VerticalSection;
//# sourceMappingURL=VerticalSection.js.map
