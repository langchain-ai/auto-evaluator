import { createStyles, rem, getSize } from '@mantine/styles';

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
const ACTION_ICON_VARIANTS = [
  "subtle",
  "filled",
  "outline",
  "light",
  "default",
  "transparent",
  "gradient"
];
const sizes = {
  xs: rem(18),
  sm: rem(22),
  md: rem(28),
  lg: rem(34),
  xl: rem(44)
};
function getVariantStyles({ variant, theme, color, gradient }) {
  const colors = theme.fn.variant({ color, variant, gradient });
  if (variant === "gradient") {
    return {
      border: 0,
      backgroundImage: colors.background,
      color: colors.color,
      "&:hover": theme.fn.hover({
        backgroundSize: "200%"
      })
    };
  }
  if (ACTION_ICON_VARIANTS.includes(variant)) {
    return __spreadValues({
      border: `${rem(1)} solid ${colors.border}`,
      backgroundColor: colors.background,
      color: colors.color
    }, theme.fn.hover({
      backgroundColor: colors.hover
    }));
  }
  return null;
}
var useStyles = createStyles((theme, { radius, color, gradient }, { variant, size }) => ({
  root: __spreadProps(__spreadValues({
    position: "relative",
    borderRadius: theme.fn.radius(radius),
    padding: 0,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: getSize({ size, sizes }),
    minHeight: getSize({ size, sizes }),
    width: getSize({ size, sizes }),
    minWidth: getSize({ size, sizes })
  }, getVariantStyles({ variant, theme, color, gradient })), {
    "&:active": theme.activeStyles,
    "& [data-action-icon-loader]": {
      maxWidth: "70%"
    },
    "&:disabled, &[data-disabled]": {
      color: theme.colors.gray[theme.colorScheme === "dark" ? 6 : 4],
      cursor: "not-allowed",
      backgroundColor: variant === "transparent" ? void 0 : theme.fn.themeColor("gray", theme.colorScheme === "dark" ? 8 : 1),
      borderColor: variant === "transparent" ? void 0 : theme.fn.themeColor("gray", theme.colorScheme === "dark" ? 8 : 1),
      backgroundImage: "none",
      pointerEvents: "none",
      "&:active": {
        transform: "none"
      }
    },
    "&[data-loading]": {
      pointerEvents: "none",
      "&::before": __spreadProps(__spreadValues({
        content: '""'
      }, theme.fn.cover(rem(-1))), {
        backgroundColor: theme.colorScheme === "dark" ? theme.fn.rgba(theme.colors.dark[7], 0.5) : "rgba(255, 255, 255, .5)",
        borderRadius: theme.fn.radius(radius),
        cursor: "not-allowed"
      })
    }
  })
}));

export default useStyles;
export { ACTION_ICON_VARIANTS, sizes };
//# sourceMappingURL=ActionIcon.styles.js.map
