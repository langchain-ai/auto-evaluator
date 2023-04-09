'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var toRgba = require('../../../utils/to-rgba/to-rgba.js');

function darken(color, alpha) {
  if (typeof color === "string" && color.startsWith("var(--")) {
    return color;
  }
  const { r, g, b, a } = toRgba.toRgba(color);
  const f = 1 - alpha;
  const dark = (input) => Math.round(input * f);
  return `rgba(${dark(r)}, ${dark(g)}, ${dark(b)}, ${a})`;
}

exports.darken = darken;
//# sourceMappingURL=darken.js.map
