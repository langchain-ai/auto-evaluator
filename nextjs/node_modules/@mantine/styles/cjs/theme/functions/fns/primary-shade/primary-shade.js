'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function primaryShade(theme) {
  return (colorScheme) => {
    if (typeof theme.primaryShade === "number") {
      return theme.primaryShade;
    }
    return theme.primaryShade[colorScheme || theme.colorScheme];
  };
}

exports.primaryShade = primaryShade;
//# sourceMappingURL=primary-shade.js.map
