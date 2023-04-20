import { getSize, getBreakpointValue } from '@mantine/styles';

function getSortedBreakpoints(breakpoints, theme) {
  if (!breakpoints) {
    return [];
  }
  const values = Object.keys(breakpoints).filter((breakpoint) => breakpoint !== "base").map((breakpoint) => [
    getSize({ size: breakpoint, sizes: theme.breakpoints, units: "em" }),
    breakpoints[breakpoint]
  ]);
  values.sort((a, b) => getBreakpointValue(a[0]) - getBreakpointValue(b[0]));
  return values;
}

export { getSortedBreakpoints };
//# sourceMappingURL=get-sorted-breakpoints.js.map
