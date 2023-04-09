'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

const CONTROL_SIZES = {
  xs: styles.rem(20),
  sm: styles.rem(24),
  md: styles.rem(30),
  lg: styles.rem(34),
  xl: styles.rem(36)
};
var useStyles = styles.createStyles((theme, { radius }, { size }) => ({
  rightSection: {
    display: "flex",
    flexDirection: "column",
    height: `calc(100% - ${styles.rem(2)})`,
    margin: styles.rem(1),
    overflow: "hidden",
    borderTopRightRadius: theme.fn.radius(radius),
    borderBottomRightRadius: theme.fn.radius(radius)
  },
  control: {
    margin: 0,
    position: "relative",
    flex: "0 0 50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    width: styles.getSize({ size, sizes: CONTROL_SIZES }),
    padding: 0,
    WebkitTapHighlightColor: "transparent",
    borderBottom: `${styles.rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]}`,
    borderLeft: `${styles.rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]}`,
    borderTop: 0,
    borderRight: 0,
    backgroundColor: "transparent",
    marginRight: styles.rem(1),
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    "&:not(:disabled):hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[0]
    },
    "&:disabled": {
      color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[4]
    }
  },
  controlUp: {},
  controlDown: {
    borderBottom: 0
  }
}));

exports.CONTROL_SIZES = CONTROL_SIZES;
exports.default = useStyles;
//# sourceMappingURL=NumberInput.styles.js.map
