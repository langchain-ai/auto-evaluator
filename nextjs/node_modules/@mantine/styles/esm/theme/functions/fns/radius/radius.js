import { rem } from '../../../utils/rem/rem.js';

function radius(theme) {
  return (size) => {
    if (typeof size === "number") {
      return rem(size);
    }
    const defaultRadius = typeof theme.defaultRadius === "number" ? theme.defaultRadius : theme.radius[theme.defaultRadius] || theme.defaultRadius;
    return theme.radius[size] || size || defaultRadius;
  };
}

export { radius };
//# sourceMappingURL=radius.js.map
