'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

var useStyles = styles.createStyles((theme) => ({
  label: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
    fontWeight: 500,
    fontSize: theme.fontSizes.xs,
    padding: `calc(${theme.spacing.xs} / 2) ${theme.spacing.sm}`,
    cursor: "default"
  }
}));

exports.default = useStyles;
//# sourceMappingURL=MenuLabel.styles.js.map
