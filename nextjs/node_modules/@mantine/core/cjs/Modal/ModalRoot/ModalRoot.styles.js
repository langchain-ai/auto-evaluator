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
var useStyles = styles.createStyles((theme, { yOffset, xOffset, centered, fullScreen }, { size }) => ({
  content: {
    flex: fullScreen ? "0 0 100%" : `0 0 ${styles.getSize({ size, sizes })}`,
    maxWidth: "100%",
    maxHeight: fullScreen ? void 0 : `calc(100vh - (${styles.rem(yOffset)} * 2))`,
    height: fullScreen ? "100vh" : void 0,
    borderRadius: fullScreen ? 0 : void 0,
    overflowY: "auto"
  },
  inner: {
    paddingTop: fullScreen ? 0 : yOffset,
    paddingBottom: fullScreen ? 0 : yOffset,
    paddingLeft: fullScreen ? 0 : xOffset,
    paddingRight: fullScreen ? 0 : xOffset,
    display: "flex",
    justifyContent: "center",
    alignItems: centered ? "center" : "flex-start"
  }
}));

exports.default = useStyles;
//# sourceMappingURL=ModalRoot.styles.js.map
