'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

const sizes = {
  xs: styles.rem(320),
  sm: styles.rem(380),
  md: styles.rem(440),
  lg: styles.rem(620),
  xl: styles.rem(780)
};
var useStyles = styles.createStyles((theme, { position }, { size }) => ({
  header: {
    zIndex: 1e3
  },
  content: {
    flex: position === "right" || position === "left" ? `0 0 ${styles.getSize({ size, sizes })}` : "0 0 100%",
    maxWidth: "100%",
    maxHeight: "100%",
    height: position === "right" || position === "left" ? "100%" : styles.getSize({ size, sizes }),
    borderRadius: 0,
    overflowY: "auto"
  },
  inner: {
    display: "flex",
    justifyContent: position === "right" ? "flex-end" : "flex-start",
    alignItems: position === "bottom" ? "flex-end" : "flex-start"
  }
}));

exports.default = useStyles;
//# sourceMappingURL=DrawerRoot.styles.js.map
