'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

var useStyles = styles.createStyles((theme, _params, { size }) => ({
  error: {
    wordBreak: "break-word",
    color: theme.fn.variant({ variant: "filled", color: "red" }).background,
    fontSize: `calc(${styles.getSize({ size, sizes: theme.fontSizes })} - ${styles.rem(2)})`,
    lineHeight: 1.2,
    display: "block"
  }
}));

exports.default = useStyles;
//# sourceMappingURL=InputError.styles.js.map
