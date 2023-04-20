'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getFloatingPosition(dir, position) {
  if (dir === "rtl" && (position.includes("right") || position.includes("left"))) {
    const [side, placement] = position.split("-");
    const flippedPosition = side === "right" ? "left" : "right";
    return placement === void 0 ? flippedPosition : `${flippedPosition}-${placement}`;
  }
  return position;
}

exports.getFloatingPosition = getFloatingPosition;
//# sourceMappingURL=get-floating-position.js.map
