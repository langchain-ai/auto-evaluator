import { em } from '../../../utils/rem/rem.js';
import { getSize } from '../../../utils/get-size/get-size.js';

function getBreakpointValue(value) {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string" && value.includes("rem")) {
    return Number(value.replace("rem", "")) * 16;
  }
  if (typeof value === "string" && value.includes("em")) {
    return Number(value.replace("em", "")) * 16;
  }
  return Number(value);
}
function largerThan(theme) {
  return (breakpoint) => `@media (min-width: ${em(getBreakpointValue(getSize({ size: breakpoint, sizes: theme.breakpoints })))})`;
}
function smallerThan(theme) {
  return (breakpoint) => `@media (max-width: ${em(getBreakpointValue(getSize({ size: breakpoint, sizes: theme.breakpoints })) - 1)})`;
}

export { getBreakpointValue, largerThan, smallerThan };
//# sourceMappingURL=breakpoints.js.map
