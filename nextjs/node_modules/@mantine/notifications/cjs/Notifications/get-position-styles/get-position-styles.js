'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getPositionStyles([vertical, horizontal], spacing) {
  const styles = {};
  vertical === "top" && (styles.top = spacing);
  vertical === "bottom" && (styles.bottom = spacing);
  horizontal === "left" && (styles.left = spacing);
  horizontal === "right" && (styles.right = spacing);
  horizontal === "center" && (styles.left = "50%", styles.transform = "translateX(-50%)");
  return styles;
}

exports.default = getPositionStyles;
//# sourceMappingURL=get-position-styles.js.map
