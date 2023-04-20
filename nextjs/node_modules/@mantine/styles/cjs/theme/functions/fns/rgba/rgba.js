'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var toRgba = require('../../../utils/to-rgba/to-rgba.js');

function rgba(color, alpha) {
  if (typeof color !== "string" || alpha > 1 || alpha < 0) {
    return "rgba(0, 0, 0, 1)";
  }
  if (color.startsWith("var(--")) {
    return color;
  }
  const { r, g, b } = toRgba.toRgba(color);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

exports.rgba = rgba;
//# sourceMappingURL=rgba.js.map
