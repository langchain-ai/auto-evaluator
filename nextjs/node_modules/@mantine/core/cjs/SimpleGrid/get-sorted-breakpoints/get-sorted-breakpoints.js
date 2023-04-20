'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

function getSortedBreakpoints(theme, breakpoints) {
  if (breakpoints.length === 0) {
    return breakpoints;
  }
  const property = "maxWidth" in breakpoints[0] ? "maxWidth" : "minWidth";
  const sorted = [...breakpoints].sort((a, b) => styles.getBreakpointValue(styles.getSize({ size: b[property], sizes: theme.breakpoints })) - styles.getBreakpointValue(styles.getSize({ size: a[property], sizes: theme.breakpoints })));
  return property === "minWidth" ? sorted.reverse() : sorted;
}

exports.getSortedBreakpoints = getSortedBreakpoints;
//# sourceMappingURL=get-sorted-breakpoints.js.map
