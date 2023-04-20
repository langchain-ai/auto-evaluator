'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

var useStyles = styles.createStyles((theme, { color }) => ({
  root: {
    backgroundColor: theme.fn.themeColor(color, theme.colorScheme === "dark" ? 5 : 2),
    color: theme.colorScheme === "dark" ? theme.colors.dark[9] : "inherit"
  }
}));

exports.default = useStyles;
//# sourceMappingURL=Mark.styles.js.map
