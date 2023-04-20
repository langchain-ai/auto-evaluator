'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

var useStyles = styles.createStyles((_theme, { zIndex }) => ({
  inner: {
    position: "fixed",
    width: "100%",
    top: 0,
    bottom: 0,
    maxHeight: "100%",
    zIndex,
    pointerEvents: "none"
  },
  content: {
    pointerEvents: "all"
  }
}));

exports.default = useStyles;
//# sourceMappingURL=ModalBaseContent.styles.js.map
