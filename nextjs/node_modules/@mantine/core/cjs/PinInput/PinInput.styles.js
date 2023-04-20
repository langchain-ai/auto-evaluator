'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

const sizes = {
  xs: styles.rem(28),
  sm: styles.rem(32),
  md: styles.rem(36),
  lg: styles.rem(40),
  xl: styles.rem(48)
};
var useStyles = styles.createStyles((_theme, _params, { size }) => ({
  root: {},
  input: {
    width: styles.getSize({ size, sizes }),
    height: styles.getSize({ size, sizes }),
    textAlign: "center",
    minHeight: "auto",
    padding: 0,
    lineHeight: styles.getSize({ size, sizes }),
    "&::selection": {
      background: "transparent"
    }
  }
}));

exports.default = useStyles;
//# sourceMappingURL=PinInput.styles.js.map
