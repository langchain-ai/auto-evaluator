'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

const sizes = {
  xs: styles.rem(180),
  sm: styles.rem(200),
  md: styles.rem(240),
  lg: styles.rem(280),
  xl: styles.rem(320)
};
var useStyles = styles.createStyles((theme, { fullWidth }, { size }) => ({
  preview: {},
  wrapper: {
    boxSizing: "border-box",
    width: fullWidth ? "100%" : styles.getSize({ size, sizes }),
    padding: styles.rem(1)
  },
  body: {
    display: "flex",
    boxSizing: "border-box",
    paddingTop: `calc(${styles.getSize({ size, sizes: theme.spacing })} / 2)`
  },
  sliders: {
    flex: 1,
    boxSizing: "border-box",
    "&:not(:only-child)": {
      marginRight: theme.spacing.xs
    }
  },
  slider: {
    boxSizing: "border-box",
    "& + &": {
      marginTop: styles.rem(5)
    }
  },
  swatch: {
    cursor: "pointer"
  }
}));

exports.default = useStyles;
exports.sizes = sizes;
//# sourceMappingURL=ColorPicker.styles.js.map
