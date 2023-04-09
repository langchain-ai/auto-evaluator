'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

const THUMB_SIZES = {
  xs: styles.rem(8),
  sm: styles.rem(12),
  md: styles.rem(16),
  lg: styles.rem(20),
  xl: styles.rem(22)
};
var useStyles = styles.createStyles((theme, _params, { size }) => {
  const _size = styles.getSize({ size, sizes: THUMB_SIZES });
  return {
    thumb: {
      overflow: "hidden",
      boxSizing: "border-box",
      position: "absolute",
      boxShadow: `0 0 ${styles.rem(1)} rgba(0, 0, 0, .6)`,
      border: `${styles.rem(2)} solid ${theme.white}`,
      backgroundColor: "transparent",
      width: _size,
      height: _size,
      borderRadius: _size
    }
  };
});

exports.THUMB_SIZES = THUMB_SIZES;
exports.default = useStyles;
//# sourceMappingURL=Thumb.styles.js.map
