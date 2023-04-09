'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

const GROUP_POSITIONS = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
  apart: "space-between"
};
var useStyles = styles.createStyles((theme, { spacing, position, noWrap, grow, align, count }) => ({
  root: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    alignItems: align || "center",
    flexWrap: noWrap ? "nowrap" : "wrap",
    justifyContent: GROUP_POSITIONS[position],
    gap: styles.getSize({ size: spacing, sizes: theme.spacing }),
    "& > *": {
      boxSizing: "border-box",
      maxWidth: grow ? `calc(${100 / count}% - (${styles.rem(styles.getSize({ size: spacing, sizes: theme.spacing }))} - ${styles.getSize({ size: spacing, sizes: theme.spacing })} / ${count}))` : void 0,
      flexGrow: grow ? 1 : 0
    }
  }
}));

exports.GROUP_POSITIONS = GROUP_POSITIONS;
exports.default = useStyles;
//# sourceMappingURL=Group.styles.js.map
