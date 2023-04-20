'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function placeholderStyles(theme) {
  return () => ({
    userSelect: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[5]
  });
}

exports.placeholderStyles = placeholderStyles;
//# sourceMappingURL=placeholder-styles.js.map
