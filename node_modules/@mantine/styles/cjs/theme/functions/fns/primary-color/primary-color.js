'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var primaryShade = require('../primary-shade/primary-shade.js');

function primaryColor(theme) {
  return (colorScheme) => {
    const shade = primaryShade.primaryShade(theme)(colorScheme);
    return theme.colors[theme.primaryColor][shade];
  };
}

exports.primaryColor = primaryColor;
//# sourceMappingURL=primary-color.js.map
