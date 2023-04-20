'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getColorValue(color, theme) {
  if (color === "dimmed") {
    return theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6];
  }
  return theme.fn.variant({ variant: "filled", color, primaryFallback: false }).background;
}

exports.getColorValue = getColorValue;
//# sourceMappingURL=get-color-value.js.map
