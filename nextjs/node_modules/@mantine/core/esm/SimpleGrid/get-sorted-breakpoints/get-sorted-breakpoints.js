import { getBreakpointValue, getSize } from '@mantine/styles';

function getSortedBreakpoints(theme, breakpoints) {
  if (breakpoints.length === 0) {
    return breakpoints;
  }
  const property = "maxWidth" in breakpoints[0] ? "maxWidth" : "minWidth";
  const sorted = [...breakpoints].sort((a, b) => getBreakpointValue(getSize({ size: b[property], sizes: theme.breakpoints })) - getBreakpointValue(getSize({ size: a[property], sizes: theme.breakpoints })));
  return property === "minWidth" ? sorted.reverse() : sorted;
}

export { getSortedBreakpoints };
//# sourceMappingURL=get-sorted-breakpoints.js.map
