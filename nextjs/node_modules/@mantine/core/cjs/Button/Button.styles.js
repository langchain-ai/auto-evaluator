'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');
var Input_styles = require('../Input/Input.styles.js');

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
const BUTTON_VARIANTS = [
  "filled",
  "outline",
  "light",
  "white",
  "default",
  "subtle",
  "gradient"
];
const sizes = {
  xs: { height: Input_styles.sizes.xs, paddingLeft: styles.rem(14), paddingRight: styles.rem(14) },
  sm: { height: Input_styles.sizes.sm, paddingLeft: styles.rem(18), paddingRight: styles.rem(18) },
  md: { height: Input_styles.sizes.md, paddingLeft: styles.rem(22), paddingRight: styles.rem(22) },
  lg: { height: Input_styles.sizes.lg, paddingLeft: styles.rem(26), paddingRight: styles.rem(26) },
  xl: { height: Input_styles.sizes.xl, paddingLeft: styles.rem(32), paddingRight: styles.rem(32) },
  "compact-xs": { height: styles.rem(22), paddingLeft: styles.rem(7), paddingRight: styles.rem(7) },
  "compact-sm": { height: styles.rem(26), paddingLeft: styles.rem(8), paddingRight: styles.rem(8) },
  "compact-md": { height: styles.rem(30), paddingLeft: styles.rem(10), paddingRight: styles.rem(10) },
  "compact-lg": { height: styles.rem(34), paddingLeft: styles.rem(12), paddingRight: styles.rem(12) },
  "compact-xl": { height: styles.rem(40), paddingLeft: styles.rem(14), paddingRight: styles.rem(14) }
};
function getSizeStyles({ compact, size, withLeftIcon, withRightIcon }) {
  if (compact) {
    return sizes[`compact-${size}`];
  }
  const _sizes = sizes[size];
  if (!_sizes) {
    return {};
  }
  return __spreadProps(__spreadValues({}, _sizes), {
    paddingLeft: withLeftIcon ? `calc(${_sizes.paddingLeft}  / 1.5)` : _sizes.paddingLeft,
    paddingRight: withRightIcon ? `calc(${_sizes.paddingRight}  / 1.5)` : _sizes.paddingRight
  });
}
const getWidthStyles = (fullWidth) => ({
  display: fullWidth ? "block" : "inline-block",
  width: fullWidth ? "100%" : "auto"
});
function getVariantStyles({ variant, theme, color, gradient }) {
  if (!BUTTON_VARIANTS.includes(variant)) {
    return null;
  }
  const colors = theme.fn.variant({ color, variant, gradient });
  if (variant === "gradient") {
    return __spreadValues({
      border: 0,
      backgroundImage: colors.background,
      color: colors.color
    }, theme.fn.hover({ backgroundSize: "200%" }));
  }
  return __spreadValues({
    border: `${styles.rem(1)} solid ${colors.border}`,
    backgroundColor: colors.background,
    color: colors.color
  }, theme.fn.hover({ backgroundColor: colors.hover }));
}
var useStyles = styles.createStyles((theme, {
  radius,
  fullWidth,
  compact,
  withLeftIcon,
  withRightIcon,
  color,
  gradient
}, { variant, size }) => ({
  root: __spreadProps(__spreadValues(__spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, getSizeStyles({ compact, size, withLeftIcon, withRightIcon })), theme.fn.fontStyles()), theme.fn.focusStyles()), getWidthStyles(fullWidth)), {
    borderRadius: theme.fn.radius(radius),
    fontWeight: 600,
    position: "relative",
    lineHeight: 1,
    fontSize: styles.getSize({ size, sizes: theme.fontSizes }),
    userSelect: "none",
    cursor: "pointer"
  }), getVariantStyles({ variant, theme, color, gradient })), {
    "&:active": theme.activeStyles,
    "&:disabled, &[data-disabled]": {
      borderColor: "transparent",
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],
      color: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[5],
      cursor: "not-allowed",
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
      }, theme.fn.cover(styles.rem(-1))), {
        backgroundColor: theme.colorScheme === "dark" ? theme.fn.rgba(theme.colors.dark[7], 0.5) : "rgba(255, 255, 255, .5)",
        borderRadius: theme.fn.radius(radius),
        cursor: "not-allowed"
      })
    }
  }),
  icon: {
    display: "flex",
    alignItems: "center"
  },
  leftIcon: {
    marginRight: theme.spacing.xs
  },
  rightIcon: {
    marginLeft: theme.spacing.xs
  },
  centerLoader: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    opacity: 0.5
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    overflow: "visible"
  },
  label: {
    whiteSpace: "nowrap",
    height: "100%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center"
  }
}));

exports.BUTTON_VARIANTS = BUTTON_VARIANTS;
exports.default = useStyles;
exports.sizes = sizes;
//# sourceMappingURL=Button.styles.js.map
