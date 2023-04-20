'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function range(start, end) {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
}

exports.range = range;
//# sourceMappingURL=range.js.map
