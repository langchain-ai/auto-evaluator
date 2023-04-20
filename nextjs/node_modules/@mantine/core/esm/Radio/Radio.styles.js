import { createStyles, getStylesRef, rem, getSize } from '@mantine/styles';

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
  xs: rem(16),
  sm: rem(20),
  md: rem(24),
  lg: rem(30),
  xl: rem(36)
};
const iconSizes = {
  xs: rem(6),
  sm: rem(8),
  md: rem(10),
  lg: rem(14),
  xl: rem(16)
};
var useStyles = createStyles((theme, { color, transitionDuration, labelPosition, error }, { size }) => {
  const colors = theme.fn.variant({ variant: "filled", color });
  const errorColor = theme.fn.variant({ variant: "filled", color: "red" }).background;
  return {
    inner: {
      order: labelPosition === "left" ? 2 : 1,
      position: "relative",
      alignSelf: "flex-start"
    },
    icon: {
      ref: getStylesRef("icon"),
      color: theme.white,
      opacity: 0,
      transform: `scale(0.75) translateY(${rem(2)})`,
      transition: `opacity ${transitionDuration}ms ${theme.transitionTimingFunction}`,
      pointerEvents: "none",
      width: getSize({ sizes: iconSizes, size }),
      height: getSize({ sizes: iconSizes, size }),
      position: "absolute",
      top: `calc(50% - ${getSize({ sizes: iconSizes, size })} / 2)`,
      left: `calc(50% - ${getSize({ sizes: iconSizes, size })} / 2)`
    },
    radio: __spreadProps(__spreadValues({}, theme.fn.focusStyles()), {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
      border: `${rem(1)} solid ${error ? errorColor : theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]}`,
      position: "relative",
      appearance: "none",
      width: getSize({ sizes, size }),
      height: getSize({ sizes, size }),
      borderRadius: getSize({ sizes, size }),
      margin: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transitionProperty: "background-color, border-color",
      transitionTimingFunction: theme.transitionTimingFunction,
      transitionDuration: `${transitionDuration}ms`,
      cursor: theme.cursorType,
      "&:checked": {
        background: colors.background,
        borderColor: colors.background,
        [`& + .${getStylesRef("icon")}`]: {
          opacity: 1,
          transform: "scale(1)"
        }
      },
      "&:disabled": {
        borderColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[4],
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1],
        [`& + .${getStylesRef("icon")}`]: {
          color: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]
        }
      }
    })
  };
});

export default useStyles;
//# sourceMappingURL=Radio.styles.js.map
