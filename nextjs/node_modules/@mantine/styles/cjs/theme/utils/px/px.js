'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function px(value) {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    if (value.includes("px")) {
      return Number(value.replace("px", ""));
    }
    if (value.includes("rem")) {
      return Number(value.replace("rem", "")) * 16;
    }
    return Number(value);
  }
  return NaN;
}

exports.px = px;
//# sourceMappingURL=px.js.map
