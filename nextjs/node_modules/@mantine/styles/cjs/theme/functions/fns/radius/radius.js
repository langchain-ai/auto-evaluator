'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var rem = require('../../../utils/rem/rem.js');

function radius(theme) {
  return (size) => {
    if (typeof size === "number") {
      return rem.rem(size);
    }
    const defaultRadius = typeof theme.defaultRadius === "number" ? theme.defaultRadius : theme.radius[theme.defaultRadius] || theme.defaultRadius;
    return theme.radius[size] || size || defaultRadius;
  };
}

exports.radius = radius;
//# sourceMappingURL=radius.js.map
