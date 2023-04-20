'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

const sizes = {
  xs: styles.rem(12),
  sm: styles.rem(18),
  md: styles.rem(24),
  lg: styles.rem(34),
  xl: styles.rem(42)
};
var useStyles = styles.createStyles((theme, { color, transitionDuration }, { size }) => {
  const sizeValue = styles.getSize({ size, sizes });
  const _color = color || (theme.colorScheme === "dark" ? theme.white : theme.black);
  return {
    root: {
      borderRadius: theme.radius.sm,
      width: `calc(${sizeValue} + ${theme.spacing.xs})`,
      height: `calc(${sizeValue} + ${theme.spacing.xs})`,
      padding: `calc(${theme.spacing.xs} / 2)`,
      cursor: "pointer"
    },
    burger: {
      position: "relative",
      userSelect: "none",
      boxSizing: "border-box",
      "&, &::before, &::after": {
        display: "block",
        width: sizeValue,
        height: `calc(${sizeValue} / 12)`,
        backgroundColor: _color,
        outline: `${styles.rem(1)} solid transparent`,
        transitionProperty: "background-color, transform",
        transitionDuration: `${transitionDuration}ms`,
        "@media (prefers-reduced-motion)": {
          transitionDuration: theme.respectReducedMotion ? "0ms" : void 0
        }
      },
      "&::before, &::after": {
        position: "absolute",
        content: '""',
        left: 0
      },
      "&::before": {
        top: `calc((${sizeValue} / 3) * -1)`
      },
      "&::after": {
        top: `calc(${sizeValue} / 3)`
      },
      "&[data-opened]": {
        backgroundColor: "transparent",
        "&::before": {
          transform: `translateY(calc(${sizeValue} / 3)) rotate(45deg)`
        },
        "&::after": {
          transform: `translateY(calc(-${sizeValue} / 3)) rotate(-45deg)`
        }
      }
    }
  };
});

exports.default = useStyles;
//# sourceMappingURL=Burger.styles.js.map
