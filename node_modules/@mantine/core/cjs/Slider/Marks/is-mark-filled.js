'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function isMarkFilled({ mark, offset, value, inverted = false }) {
  return inverted ? typeof offset === "number" ? mark.value <= offset || mark.value >= value : mark.value >= value : typeof offset === "number" ? mark.value >= offset && mark.value <= value : mark.value <= value;
}

exports.isMarkFilled = isMarkFilled;
//# sourceMappingURL=is-mark-filled.js.map
