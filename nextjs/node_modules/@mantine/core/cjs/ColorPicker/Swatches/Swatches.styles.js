'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

var useStyles = styles.createStyles((_theme, { swatchesPerRow }) => ({
  swatch: {
    width: `calc(${100 / swatchesPerRow}% - ${styles.rem(4)})`,
    height: 0,
    paddingBottom: `calc(${100 / swatchesPerRow}% - ${styles.rem(4)})`,
    margin: styles.rem(2),
    boxSizing: "content-box"
  },
  swatches: {
    boxSizing: "border-box",
    marginLeft: styles.rem(-2),
    marginRight: styles.rem(-2),
    display: "flex",
    flexWrap: "wrap"
  }
}));

exports.default = useStyles;
//# sourceMappingURL=Swatches.styles.js.map
