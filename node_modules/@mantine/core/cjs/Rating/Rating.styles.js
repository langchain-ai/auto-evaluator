'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

var useStyles = styles.createStyles(() => ({
  root: {
    display: "flex",
    width: "max-content"
  },
  symbolGroup: {
    position: "relative",
    transition: "transform 100ms ease",
    '&[data-active="true"]': {
      zIndex: 1,
      transform: "scale(1.2)"
    }
  }
}));

exports.default = useStyles;
//# sourceMappingURL=Rating.styles.js.map
