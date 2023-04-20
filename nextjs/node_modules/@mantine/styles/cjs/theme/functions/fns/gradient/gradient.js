'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var themeColor = require('../theme-color/theme-color.js');
var primaryShade = require('../primary-shade/primary-shade.js');
var getGradientColorStops = require('./get-gradient-color-stops/get-gradient-color-stops.js');

function linearGradient(deg, ...colors) {
  return `linear-gradient(${deg}deg, ${getGradientColorStops.getGradientColorStops(colors)})`;
}
function radialGradient(...colors) {
  return `radial-gradient(circle, ${getGradientColorStops.getGradientColorStops(colors)})`;
}
function gradient(theme) {
  const getThemeColor = themeColor.themeColor(theme);
  const getPrimaryShade = primaryShade.primaryShade(theme);
  return (payload) => {
    const merged = {
      from: (payload == null ? void 0 : payload.from) || theme.defaultGradient.from,
      to: (payload == null ? void 0 : payload.to) || theme.defaultGradient.to,
      deg: (payload == null ? void 0 : payload.deg) || theme.defaultGradient.deg
    };
    return `linear-gradient(${merged.deg}deg, ${getThemeColor(merged.from, getPrimaryShade(), false)} 0%, ${getThemeColor(merged.to, getPrimaryShade(), false)} 100%)`;
  };
}

exports.gradient = gradient;
exports.linearGradient = linearGradient;
exports.radialGradient = radialGradient;
//# sourceMappingURL=gradient.js.map
