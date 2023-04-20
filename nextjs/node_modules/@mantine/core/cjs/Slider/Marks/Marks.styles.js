'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');
var SliderRoot_styles = require('../SliderRoot/SliderRoot.styles.js');

var useStyles = styles.createStyles((theme, { color, disabled }, { size }) => ({
  markWrapper: {
    position: "absolute",
    top: 0,
    zIndex: 2
  },
  mark: {
    boxSizing: "border-box",
    border: `${styles.rem(2)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    height: styles.getSize({ sizes: SliderRoot_styles.sizes, size }),
    width: styles.getSize({ sizes: SliderRoot_styles.sizes, size }),
    borderRadius: 1e3,
    transform: `translateX(calc(-${styles.getSize({ sizes: SliderRoot_styles.sizes, size })} / 2))`,
    backgroundColor: theme.white
  },
  markFilled: {
    borderColor: disabled ? theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[4] : theme.fn.variant({ variant: "filled", color }).background
  },
  markLabel: {
    transform: "translate(-50%, 0)",
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
    marginTop: `calc(${theme.spacing.xs} / 2)`,
    whiteSpace: "nowrap"
  }
}));

exports.default = useStyles;
//# sourceMappingURL=Marks.styles.js.map
