'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

var useStyles = styles.createStyles((theme, { padding }) => ({
  body: {
    padding: styles.getSize({ size: padding, sizes: theme.spacing }),
    "&:not(:only-child)": {
      paddingTop: 0
    }
  }
}));

exports.default = useStyles;
//# sourceMappingURL=ModalBaseBody.styles.js.map
