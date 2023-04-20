'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getPosition({ value, min, max }) {
  const position = (value - min) / (max - min) * 100;
  return Math.min(Math.max(position, 0), 100);
}

exports.getPosition = getPosition;
//# sourceMappingURL=get-position.js.map
