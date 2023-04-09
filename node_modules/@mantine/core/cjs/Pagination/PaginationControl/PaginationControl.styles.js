'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

const sizes = {
  xs: styles.rem(22),
  sm: styles.rem(26),
  md: styles.rem(32),
  lg: styles.rem(38),
  xl: styles.rem(44)
};
var useStyles = styles.createStyles((theme, { color, radius, withPadding }, { size }) => {
  const colors = theme.fn.variant({ color, variant: "filled" });
  return {
    control: {
      cursor: "pointer",
      userSelect: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: `${styles.rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]}`,
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      height: styles.getSize({ size, sizes }),
      minWidth: styles.getSize({ size, sizes }),
      padding: withPadding ? `0 calc(${styles.getSize({ size, sizes: theme.spacing })} / 2)` : void 0,
      fontSize: styles.getSize({ size, sizes: theme.fontSizes }),
      borderRadius: theme.fn.radius(radius),
      lineHeight: 1,
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
      "&:not([data-disabled])": theme.fn.hover({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[0]
      }),
      "&:active:not([data-disabled])": theme.activeStyles,
      "&[data-disabled]": {
        opacity: 0.4,
        cursor: "not-allowed"
      },
      "&[data-active]": {
        borderColor: "transparent",
        color: colors.color,
        backgroundColor: colors.background,
        "&:not([data-disabled])": theme.fn.hover({
          backgroundColor: colors.hover
        })
      }
    }
  };
});

exports.default = useStyles;
exports.sizes = sizes;
//# sourceMappingURL=PaginationControl.styles.js.map
