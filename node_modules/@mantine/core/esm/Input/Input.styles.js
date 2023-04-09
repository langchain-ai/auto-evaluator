import { rem, createStyles, getSize } from '@mantine/styles';

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
  xs: rem(30),
  sm: rem(36),
  md: rem(42),
  lg: rem(50),
  xl: rem(60)
};
const INPUT_VARIANTS = ["default", "filled", "unstyled"];
function getVariantStyles({ theme, variant }) {
  if (!INPUT_VARIANTS.includes(variant)) {
    return null;
  }
  if (variant === "default") {
    return {
      border: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]}`,
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
      transition: "border-color 100ms ease",
      "&:focus, &:focus-within": theme.focusRingStyles.inputStyles(theme)
    };
  }
  if (variant === "filled") {
    return {
      border: `${rem(1)} solid transparent`,
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1],
      "&:focus, &:focus-within": theme.focusRingStyles.inputStyles(theme)
    };
  }
  return {
    borderWidth: 0,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    backgroundColor: "transparent",
    minHeight: rem(28),
    outline: 0,
    "&:focus, &:focus-within": {
      outline: "none",
      borderColor: "transparent"
    },
    "&:disabled": {
      backgroundColor: "transparent",
      "&:focus, &:focus-within": {
        outline: "none",
        borderColor: "transparent"
      }
    }
  };
}
var useStyles = createStyles((theme, {
  multiline,
  radius,
  invalid,
  rightSectionWidth,
  withRightSection,
  iconWidth,
  offsetBottom,
  offsetTop,
  pointer
}, { variant, size }) => {
  const invalidColor = theme.fn.variant({ variant: "filled", color: "red" }).background;
  const sizeStyles = variant === "default" || variant === "filled" ? {
    minHeight: getSize({ size, sizes }),
    paddingLeft: `calc(${getSize({ size, sizes })}  / 3)`,
    paddingRight: withRightSection ? rightSectionWidth || getSize({ size, sizes }) : `calc(${getSize({ size, sizes })}  / 3)`,
    borderRadius: theme.fn.radius(radius)
  } : null;
  return {
    wrapper: {
      position: "relative",
      marginTop: offsetTop ? `calc(${theme.spacing.xs} / 2)` : void 0,
      marginBottom: offsetBottom ? `calc(${theme.spacing.xs} / 2)` : void 0
    },
    input: __spreadProps(__spreadValues(__spreadValues(__spreadProps(__spreadValues({}, theme.fn.fontStyles()), {
      height: multiline ? variant === "unstyled" ? void 0 : "auto" : getSize({ size, sizes }),
      WebkitTapHighlightColor: "transparent",
      lineHeight: multiline ? theme.lineHeight : `calc(${getSize({ size, sizes })} - ${rem(2)})`,
      appearance: "none",
      resize: "none",
      boxSizing: "border-box",
      fontSize: getSize({ size, sizes: theme.fontSizes }),
      width: "100%",
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      display: "block",
      textAlign: "left",
      cursor: pointer ? "pointer" : void 0
    }), getVariantStyles({ theme, variant })), sizeStyles), {
      "&:disabled, &[data-disabled]": {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
        color: theme.colors.dark[2],
        opacity: 0.6,
        cursor: "not-allowed",
        "&::placeholder": {
          color: theme.colors.dark[2]
        }
      },
      "&[data-invalid]": {
        color: invalidColor,
        borderColor: invalidColor,
        "&::placeholder": {
          opacity: 1,
          color: invalidColor
        }
      },
      "&[data-with-icon]": {
        paddingLeft: typeof iconWidth === "number" ? rem(iconWidth) : getSize({ size, sizes })
      },
      "&::placeholder": __spreadProps(__spreadValues({}, theme.fn.placeholderStyles()), {
        opacity: 1
      }),
      "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button, &::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration": {
        appearance: "none"
      },
      "&[type=number]": {
        MozAppearance: "textfield"
      }
    }),
    icon: {
      pointerEvents: "none",
      position: "absolute",
      zIndex: 1,
      left: 0,
      top: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: iconWidth ? rem(iconWidth) : getSize({ size, sizes }),
      color: invalid ? theme.colors.red[theme.colorScheme === "dark" ? 6 : 7] : theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[5]
    },
    rightSection: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: rightSectionWidth || getSize({ size, sizes })
    }
  };
});

export default useStyles;
export { sizes };
//# sourceMappingURL=Input.styles.js.map
