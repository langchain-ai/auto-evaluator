'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

const NEGATIVE_VALUES = ["-xs", "-sm", "-md", "-lg", "-xl"];
function getSpacingValue(size, theme) {
  if (NEGATIVE_VALUES.includes(size)) {
    return `calc(${styles.getSize({
      size: size.replace("-", ""),
      sizes: theme.spacing
    })} * -1)`;
  }
  return styles.getSize({ size, sizes: theme.spacing });
}

exports.getSpacingValue = getSpacingValue;
//# sourceMappingURL=get-spacing-value.js.map
