import { themeColor } from '../theme-color/theme-color.js';
import { primaryShade } from '../primary-shade/primary-shade.js';
import { getGradientColorStops } from './get-gradient-color-stops/get-gradient-color-stops.js';

function linearGradient(deg, ...colors) {
  return `linear-gradient(${deg}deg, ${getGradientColorStops(colors)})`;
}
function radialGradient(...colors) {
  return `radial-gradient(circle, ${getGradientColorStops(colors)})`;
}
function gradient(theme) {
  const getThemeColor = themeColor(theme);
  const getPrimaryShade = primaryShade(theme);
  return (payload) => {
    const merged = {
      from: (payload == null ? void 0 : payload.from) || theme.defaultGradient.from,
      to: (payload == null ? void 0 : payload.to) || theme.defaultGradient.to,
      deg: (payload == null ? void 0 : payload.deg) || theme.defaultGradient.deg
    };
    return `linear-gradient(${merged.deg}deg, ${getThemeColor(merged.from, getPrimaryShade(), false)} 0%, ${getThemeColor(merged.to, getPrimaryShade(), false)} 100%)`;
  };
}

export { gradient, linearGradient, radialGradient };
//# sourceMappingURL=gradient.js.map
