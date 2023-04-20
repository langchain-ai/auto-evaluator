'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getGradientColorStops(colors) {
  let stops = "";
  for (let i = 1; i < colors.length - 1; i += 1) {
    stops += `${colors[i]} ${i / (colors.length - 1) * 100}%, `;
  }
  return `${colors[0]} 0%, ${stops}${colors[colors.length - 1]} 100%`;
}

exports.getGradientColorStops = getGradientColorStops;
//# sourceMappingURL=get-gradient-color-stops.js.map
