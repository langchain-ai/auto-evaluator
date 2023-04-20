'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const sizes = {
  xs: styles.rem(24),
  sm: styles.rem(28),
  md: styles.rem(32),
  lg: styles.rem(36),
  xl: styles.rem(40)
};
const iconSizes = {
  xs: styles.rem(10),
  sm: styles.rem(12),
  md: styles.rem(14),
  lg: styles.rem(16),
  xl: styles.rem(18)
};
const padding = {
  xs: styles.rem(16),
  sm: styles.rem(20),
  md: styles.rem(24),
  lg: styles.rem(28),
  xl: styles.rem(32)
};
const checkedPadding = {
  xs: styles.rem(7.5),
  sm: styles.rem(10),
  md: styles.rem(11.5),
  lg: styles.rem(13),
  xl: styles.rem(15)
};
function getVariantStyles(theme, { color }, variant) {
  const filledColors = theme.fn.variant({ variant: "filled", color });
  const lightColors = theme.fn.variant({ variant: "light", color });
  if (variant === "light") {
    return {
      label: __spreadValues({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1]
      }, theme.fn.hover({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[0]
      })),
      checked: __spreadProps(__spreadValues({
        color: lightColors.color,
        backgroundColor: lightColors.background
      }, theme.fn.hover({ backgroundColor: lightColors.hover })), {
        "&, &:hover": {
          backgroundColor: theme.fn.variant({ variant: "light", color }).background
        }
      })
    };
  }
  if (variant === "filled") {
    return {
      label: __spreadValues({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1]
      }, theme.fn.hover({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[0]
      })),
      checked: __spreadValues({
        color: filledColors.color,
        backgroundColor: filledColors.background
      }, theme.fn.hover({ backgroundColor: filledColors.hover }))
    };
  }
  if (variant === "outline") {
    return {
      label: __spreadValues({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
        borderColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]
      }, theme.fn.hover({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[0]
      })),
      checked: {
        border: `${styles.rem(1)} solid ${filledColors.background}`
      }
    };
  }
  return { label: null, checked: null };
}
var useStyles = styles.createStyles((theme, { radius, color }, { size, variant }) => {
  const variantStyles = getVariantStyles(theme, { color }, variant);
  return {
    root: {},
    label: __spreadProps(__spreadValues(__spreadProps(__spreadValues({
      ref: styles.getStylesRef("label")
    }, theme.fn.fontStyles()), {
      boxSizing: "border-box",
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      display: "inline-block",
      alignItems: "center",
      userSelect: "none",
      border: `${styles.rem(1)} solid transparent`,
      borderRadius: theme.fn.radius(radius),
      height: styles.getSize({ size, sizes }),
      fontSize: styles.getSize({ size, sizes: theme.fontSizes }),
      lineHeight: `calc(${styles.getSize({ size, sizes })} - ${styles.rem(2)})`,
      paddingLeft: styles.getSize({ size, sizes: padding }),
      paddingRight: styles.getSize({ size, sizes: padding }),
      cursor: "pointer",
      whiteSpace: "nowrap",
      transition: "background-color 100ms ease",
      WebkitTapHighlightColor: "transparent"
    }), variantStyles.label), {
      "&[data-disabled]": __spreadProps(__spreadValues({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1],
        borderColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1],
        color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[5],
        cursor: "not-allowed"
      }, theme.fn.hover({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
      })), {
        [`& .${styles.getStylesRef("iconWrapper")}`]: {
          color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[5]
        }
      }),
      "&[data-checked]": {
        paddingLeft: styles.getSize({ size, sizes: checkedPadding }),
        paddingRight: styles.getSize({ size, sizes: checkedPadding }),
        "&:not([data-disabled])": variantStyles.checked
      }
    }),
    iconWrapper: {
      ref: styles.getStylesRef("iconWrapper"),
      color: variant === "filled" ? theme.white : theme.fn.variant({ variant: "filled", color }).background,
      width: `calc(${styles.getSize({ size, sizes: iconSizes })} + (${styles.getSize({
        size,
        sizes: theme.spacing
      })} / 1.5))`,
      maxWidth: `calc(${styles.getSize({ size, sizes: iconSizes })} + (${styles.getSize({
        size,
        sizes: theme.spacing
      })} / 1.5))`,
      height: styles.getSize({ size, sizes: iconSizes }),
      display: "inline-block",
      verticalAlign: "middle",
      overflow: "hidden"
    },
    checkIcon: {
      width: styles.getSize({ size, sizes: iconSizes }),
      height: `calc(${styles.getSize({ size, sizes: iconSizes })} / 1.1)`,
      display: "block"
    },
    input: {
      width: 0,
      height: 0,
      padding: 0,
      opacity: 0,
      margin: 0,
      "&:focus": {
        outline: "none",
        [`& + .${styles.getStylesRef("label")}`]: __spreadValues({}, theme.focusRing === "always" || theme.focusRing === "auto" ? theme.focusRingStyles.styles(theme) : theme.focusRingStyles.resetStyles(theme)),
        "&:focus:not(:focus-visible)": {
          [`& + .${styles.getStylesRef("label")}`]: __spreadValues({}, theme.focusRing === "auto" || theme.focusRing === "never" ? theme.focusRingStyles.resetStyles(theme) : null)
        }
      }
    }
  };
});

exports.default = useStyles;
exports.sizes = sizes;
//# sourceMappingURL=Chip.styles.js.map
