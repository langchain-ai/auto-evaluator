'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

var useStyles = styles.createStyles((theme, _params, { size }) => ({
  input: {
    fontFamily: theme.fontFamilyMonospace,
    fontSize: `calc(${styles.getSize({ size, sizes: theme.fontSizes })} - ${styles.rem(2)})`
  }
}));

exports.default = useStyles;
//# sourceMappingURL=JsonInput.styles.js.map
