'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var rem = require('../../../utils/rem/rem.js');
var getSize = require('../../../utils/get-size/get-size.js');

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
  return (breakpoint) => `@media (min-width: ${rem.em(getBreakpointValue(getSize.getSize({ size: breakpoint, sizes: theme.breakpoints })))})`;
}
function smallerThan(theme) {
  return (breakpoint) => `@media (max-width: ${rem.em(getBreakpointValue(getSize.getSize({ size: breakpoint, sizes: theme.breakpoints })) - 1)})`;
}

exports.getBreakpointValue = getBreakpointValue;
exports.largerThan = largerThan;
exports.smallerThan = smallerThan;
//# sourceMappingURL=breakpoints.js.map
