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
const switchHeight = {
  xs: rem(16),
  sm: rem(20),
  md: rem(24),
  lg: rem(30),
  xl: rem(36)
};
const switchWidth = {
  xs: rem(32),
  sm: rem(38),
  md: rem(46),
  lg: rem(56),
  xl: rem(72)
};
const handleSizes = {
  xs: rem(12),
  sm: rem(14),
  md: rem(18),
  lg: rem(22),
  xl: rem(28)
};
const labelFontSizes = {
  xs: rem(5),
  sm: rem(6),
  md: rem(7),
  lg: rem(9),
  xl: rem(11)
};
const trackLabelPaddings = {
  xs: rem(4),
  sm: rem(5),
  md: rem(6),
  lg: rem(8),
  xl: rem(10)
};
var useStyles = createStyles((theme, { radius, color, labelPosition, error }, { size }) => {
  const handleSize = getSize({ size, sizes: handleSizes });
  const borderRadius = getSize({ size: radius, sizes: theme.radius });
  const colors = theme.fn.variant({ variant: "filled", color });
  const trackWidth = getSize({ size, sizes: switchWidth });
  const trackPadding = rem(size === "xs" ? 1 : 2);
  const errorColor = theme.fn.variant({ variant: "filled", color: "red" }).background;
  return {
    root: {
      position: "relative"
    },
    input: {
      height: 0,
      width: 0,
      overflow: "hidden",
      whiteSpace: "nowrap",
      padding: 0,
      WebkitClipPath: "inset(50%)",
      clipPath: "inset(50%)",
      position: "absolute"
    },
    track: __spreadProps(__spreadValues({}, theme.fn.focusStyles("input:focus + &")), {
      cursor: theme.cursorType,
      overflow: "hidden",
      WebkitTapHighlightColor: "transparent",
      position: "relative",
      borderRadius,
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2],
      border: `${rem(1)} solid ${error ? errorColor : theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
      height: getSize({ size, sizes: switchHeight }),
      minWidth: trackWidth,
      margin: 0,
      transitionProperty: "background-color, border-color",
      transitionTimingFunction: theme.transitionTimingFunction,
      transitionDuration: "150ms",
      boxSizing: "border-box",
      appearance: "none",
      display: "flex",
      alignItems: "center",
      fontSize: getSize({ size, sizes: labelFontSizes }),
      fontWeight: 600,
      order: labelPosition === "left" ? 2 : 1,
      userSelect: "none",
      zIndex: 0,
      lineHeight: 0,
      color: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[6],
      transition: `color 150ms ${theme.transitionTimingFunction}`,
      "input:checked + &": {
        backgroundColor: colors.background,
        borderColor: colors.background,
        color: theme.white,
        transition: `color 150ms ${theme.transitionTimingFunction}`
      },
      "input:disabled + &": {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],
        borderColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],
        cursor: "not-allowed"
      }
    }),
    thumb: {
      position: "absolute",
      zIndex: 1,
      borderRadius,
      boxSizing: "border-box",
      display: "flex",
      backgroundColor: theme.white,
      height: handleSize,
      width: handleSize,
      border: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.white : theme.colors.gray[3]}`,
      left: trackPadding,
      transition: `left 150ms ${theme.transitionTimingFunction}`,
      "& > *": {
        margin: "auto"
      },
      "@media (prefers-reduced-motion)": {
        transitionDuration: theme.respectReducedMotion ? "0ms" : ""
      },
      "input:checked + * > &": {
        left: `calc(100% - ${handleSize} - ${trackPadding})`,
        borderColor: theme.white
      },
      "input:disabled + * > &": {
        borderColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[0]
      }
    },
    trackLabel: {
      height: "100%",
      display: "grid",
      placeContent: "center",
      minWidth: `calc(${trackWidth} - ${handleSize})`,
      paddingInline: getSize({ size, sizes: trackLabelPaddings }),
      margin: `0 0 0 calc(${handleSize} + ${trackPadding})`,
      transition: `margin 150ms ${theme.transitionTimingFunction}`,
      "input:checked + * > &": {
        margin: `0 calc(${handleSize} + ${trackPadding}) 0 0`
      }
    }
  };
});

export default useStyles;
//# sourceMappingURL=Switch.styles.js.map
