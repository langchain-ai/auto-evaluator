'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

const sizes = {
  xs: styles.rem(16),
  sm: styles.rem(22),
  md: styles.rem(26),
  lg: styles.rem(30),
  xl: styles.rem(36)
};
const fontSizes = {
  xs: styles.rem(10),
  sm: styles.rem(12),
  md: styles.rem(14),
  lg: styles.rem(16),
  xl: styles.rem(18)
};
var useStyles = styles.createStyles((theme, { disabled, radius, readOnly }, { size, variant }) => ({
  defaultValue: {
    display: "flex",
    alignItems: "center",
    backgroundColor: disabled ? theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[3] : theme.colorScheme === "dark" ? theme.colors.dark[7] : variant === "filled" ? theme.white : theme.colors.gray[1],
    color: disabled ? theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7] : theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    height: styles.getSize({ size, sizes }),
    paddingLeft: `calc(${styles.getSize({ size, sizes: theme.spacing })} / 1.5)`,
    paddingRight: disabled || readOnly ? styles.getSize({ size, sizes: theme.spacing }) : 0,
    fontWeight: 500,
    fontSize: styles.getSize({ size, sizes: fontSizes }),
    borderRadius: styles.getSize({ size: radius, sizes: theme.radius }),
    cursor: disabled ? "not-allowed" : "default",
    userSelect: "none",
    maxWidth: `calc(100% - ${styles.rem(10)})`
  },
  defaultValueRemove: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    marginLeft: `calc(${styles.getSize({ size, sizes: theme.spacing })} / 6)`
  },
  defaultValueLabel: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
}));

exports.default = useStyles;
exports.sizes = sizes;
//# sourceMappingURL=DefaultValue.styles.js.map
