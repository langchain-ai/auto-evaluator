'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');
var PaginationControl_styles = require('../PaginationControl/PaginationControl.styles.js');

var useStyles = styles.createStyles((theme, _params, { size }) => ({
  dots: {
    height: styles.getSize({ size, sizes: PaginationControl_styles.sizes }),
    minWidth: styles.getSize({ size, sizes: PaginationControl_styles.sizes }),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none"
  }
}));

exports.default = useStyles;
//# sourceMappingURL=PaginationDots.styles.js.map
