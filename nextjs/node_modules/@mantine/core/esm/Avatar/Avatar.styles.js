import { createStyles, getSize, rem } from '@mantine/styles';

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
const AVATAR_VARIANTS = ["filled", "light", "gradient", "outline"];
const sizes = {
  xs: rem(16),
  sm: rem(26),
  md: rem(38),
  lg: rem(56),
  xl: rem(84)
};
function getGroupStyles({ withinGroup, spacing, theme }) {
  if (!withinGroup) {
    return null;
  }
  return {
    marginLeft: `calc(${getSize({ size: spacing, sizes: theme.spacing })} * -1)`,
    backgroundColor: `${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white}`,
    border: `${rem(2)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white}`
  };
}
function getVariantStyles({ theme, variant, color, gradient }) {
  const colors = theme.fn.variant({ variant, color, gradient });
  if (AVATAR_VARIANTS.includes(variant)) {
    return {
      placeholder: {
        color: colors.color,
        backgroundColor: colors.background,
        backgroundImage: variant === "gradient" ? colors.background : void 0,
        border: `${rem(variant === "gradient" ? 0 : 1)} solid ${colors.border}`
      },
      placeholderIcon: {
        color: colors.color
      }
    };
  }
  return {};
}
var useStyles = createStyles((theme, { radius, withinGroup, spacing, color, gradient }, { variant, size }) => {
  const variantStyles = getVariantStyles({ theme, color, gradient, variant });
  return {
    root: __spreadValues(__spreadProps(__spreadValues({}, theme.fn.focusStyles()), {
      WebkitTapHighlightColor: "transparent",
      boxSizing: "border-box",
      position: "relative",
      display: "block",
      userSelect: "none",
      overflow: "hidden",
      borderRadius: theme.fn.radius(radius),
      textDecoration: "none",
      border: 0,
      backgroundColor: "transparent",
      padding: 0,
      width: getSize({ size, sizes }),
      minWidth: getSize({ size, sizes }),
      height: getSize({ size, sizes })
    }), getGroupStyles({ withinGroup, spacing, theme })),
    image: {
      objectFit: "cover",
      width: "100%",
      height: "100%",
      display: "block"
    },
    placeholder: __spreadValues(__spreadProps(__spreadValues({}, theme.fn.fontStyles()), {
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      userSelect: "none",
      borderRadius: theme.fn.radius(radius),
      fontSize: `calc(${getSize({ size, sizes })} / 2.5)`
    }), variantStyles.placeholder),
    placeholderIcon: __spreadValues({
      width: "70%",
      height: "70%"
    }, variantStyles.placeholderIcon)
  };
});

export default useStyles;
export { AVATAR_VARIANTS, sizes };
//# sourceMappingURL=Avatar.styles.js.map
