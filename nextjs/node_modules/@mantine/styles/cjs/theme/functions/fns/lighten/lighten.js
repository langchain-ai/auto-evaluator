'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var toRgba = require('../../../utils/to-rgba/to-rgba.js');

function lighten(color, alpha) {
  if (typeof color === "string" && color.startsWith("var(--")) {
    return color;
  }
  const { r, g, b, a } = toRgba.toRgba(color);
  const light = (input) => Math.round(input + (255 - input) * alpha);
  return `rgba(${light(r)}, ${light(g)}, ${light(b)}, ${a})`;
}

exports.lighten = lighten;
//# sourceMappingURL=lighten.js.map
