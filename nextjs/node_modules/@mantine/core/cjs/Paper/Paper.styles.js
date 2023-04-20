'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

var useStyles = styles.createStyles((theme, { radius, shadow }) => ({
  root: {
    outline: 0,
    WebkitTapHighlightColor: "transparent",
    display: "block",
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    boxSizing: "border-box",
    borderRadius: theme.fn.radius(radius),
    boxShadow: theme.shadows[shadow] || shadow || "none",
    "&[data-with-border]": {
      border: `${styles.rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`
    }
  }
}));

exports.default = useStyles;
//# sourceMappingURL=Paper.styles.js.map
