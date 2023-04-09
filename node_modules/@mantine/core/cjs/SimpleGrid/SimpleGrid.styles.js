'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');
var getSortedBreakpoints = require('./get-sorted-breakpoints/get-sorted-breakpoints.js');

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
var useStyles = styles.createStyles((theme, { spacing, breakpoints, cols, verticalSpacing }) => {
  const hasVerticalSpacing = verticalSpacing != null;
  const gridBreakpoints = getSortedBreakpoints.getSortedBreakpoints(theme, breakpoints).reduce((acc, breakpoint) => {
    var _a, _b;
    const property = "maxWidth" in breakpoint ? "max-width" : "min-width";
    const breakpointSize = styles.getSize({
      size: property === "max-width" ? breakpoint.maxWidth : breakpoint.minWidth,
      sizes: theme.breakpoints,
      units: "em"
    });
    const breakpointValue = styles.getBreakpointValue(breakpointSize) - (property === "max-width" ? 1 : 0);
    acc[`@media (${property}: ${styles.em(breakpointValue)})`] = {
      gridTemplateColumns: `repeat(${breakpoint.cols}, minmax(0, 1fr))`,
      gap: `${styles.getSize({
        size: (_a = breakpoint.verticalSpacing) != null ? _a : hasVerticalSpacing ? verticalSpacing : spacing,
        sizes: theme.spacing
      })} ${styles.getSize({
        size: (_b = breakpoint.spacing) != null ? _b : spacing,
        sizes: theme.spacing
      })}`
    };
    return acc;
  }, {});
  return {
    root: __spreadValues({
      boxSizing: "border-box",
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      gap: `${styles.getSize({
        size: hasVerticalSpacing ? verticalSpacing : spacing,
        sizes: theme.spacing
      })} ${styles.getSize({ size: spacing, sizes: theme.spacing })}`
    }, gridBreakpoints)
  };
});

exports.default = useStyles;
//# sourceMappingURL=SimpleGrid.styles.js.map
