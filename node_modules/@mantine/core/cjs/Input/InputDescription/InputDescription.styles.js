'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

var useStyles = styles.createStyles((theme, _params, { size }) => ({
  description: {
    wordBreak: "break-word",
    color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
    fontSize: `calc(${styles.getSize({ size, sizes: theme.fontSizes })} - ${styles.rem(2)})`,
    lineHeight: 1.2,
    display: "block"
  }
}));

exports.default = useStyles;
//# sourceMappingURL=InputDescription.styles.js.map
