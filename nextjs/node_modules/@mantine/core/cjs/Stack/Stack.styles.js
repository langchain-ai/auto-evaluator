'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

var useStyles = styles.createStyles((theme, { spacing, align, justify }) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: align,
    justifyContent: justify,
    gap: styles.getSize({ size: spacing, sizes: theme.spacing })
  }
}));

exports.default = useStyles;
//# sourceMappingURL=Stack.styles.js.map
