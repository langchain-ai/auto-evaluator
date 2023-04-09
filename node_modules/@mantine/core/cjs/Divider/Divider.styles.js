'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

const sizes = {
  xs: styles.rem(1),
  sm: styles.rem(2),
  md: styles.rem(3),
  lg: styles.rem(4),
  xl: styles.rem(5)
};
function getColor(theme, color) {
  const themeColor = theme.fn.variant({ variant: "outline", color }).border;
  return typeof color === "string" && (color in theme.colors || color.split(".")[0] in theme.colors) ? themeColor : color === void 0 ? theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4] : color;
}
var useStyles = styles.createStyles((theme, { color }, { size, variant }) => ({
  root: {},
  withLabel: {
    borderTop: "0 !important"
  },
  left: {
    "&::before": {
      display: "none"
    }
  },
  right: {
    "&::after": {
      display: "none"
    }
  },
  label: {
    display: "flex",
    alignItems: "center",
    "&::before": {
      content: '""',
      flex: 1,
      height: styles.rem(1),
      borderTop: `${styles.getSize({ size, sizes })} ${variant} ${getColor(theme, color)}`,
      marginRight: theme.spacing.xs
    },
    "&::after": {
      content: '""',
      flex: 1,
      borderTop: `${styles.getSize({ size, sizes })} ${variant} ${getColor(theme, color)}`,
      marginLeft: theme.spacing.xs
    }
  },
  labelDefaultStyles: {
    color: color === "dark" ? theme.colors.dark[1] : theme.fn.themeColor(color, theme.colorScheme === "dark" ? 5 : theme.fn.primaryShade(), false)
  },
  horizontal: {
    border: 0,
    borderTopWidth: styles.rem(styles.getSize({ size, sizes })),
    borderTopColor: getColor(theme, color),
    borderTopStyle: variant,
    margin: 0
  },
  vertical: {
    border: 0,
    alignSelf: "stretch",
    height: "auto",
    borderLeftWidth: styles.rem(styles.getSize({ size, sizes })),
    borderLeftColor: getColor(theme, color),
    borderLeftStyle: variant
  }
}));

exports.default = useStyles;
//# sourceMappingURL=Divider.styles.js.map
