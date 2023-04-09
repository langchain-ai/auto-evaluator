'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

function getSortedBreakpoints(breakpoints, theme) {
  if (!breakpoints) {
    return [];
  }
  const values = Object.keys(breakpoints).filter((breakpoint) => breakpoint !== "base").map((breakpoint) => [
    styles.getSize({ size: breakpoint, sizes: theme.breakpoints, units: "em" }),
    breakpoints[breakpoint]
  ]);
  values.sort((a, b) => styles.getBreakpointValue(a[0]) - styles.getBreakpointValue(b[0]));
  return values;
}

exports.getSortedBreakpoints = getSortedBreakpoints;
//# sourceMappingURL=get-sorted-breakpoints.js.map
