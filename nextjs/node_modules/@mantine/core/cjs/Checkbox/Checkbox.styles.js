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
  xs: styles.rem(16),
  sm: styles.rem(20),
  md: styles.rem(24),
  lg: styles.rem(30),
  xl: styles.rem(36)
};
var useStyles = styles.createStyles((theme, {
  radius,
  color,
  transitionDuration,
  labelPosition,
  error,
  indeterminate
}, { size }) => {
  const _size = styles.getSize({ size, sizes });
  const colors = theme.fn.variant({ variant: "filled", color });
  return {
    icon: __spreadProps(__spreadValues({}, theme.fn.cover()), {
      ref: styles.getStylesRef("icon"),
      color: indeterminate ? "inherit" : theme.white,
      transform: indeterminate ? "none" : `translateY(${styles.rem(5)}) scale(0.5)`,
      opacity: indeterminate ? 1 : 0,
      transitionProperty: "opacity, transform",
      transitionTimingFunction: "ease",
      transitionDuration: `${transitionDuration}ms`,
      pointerEvents: "none",
      width: "60%",
      position: "absolute",
      zIndex: 1,
      margin: "auto",
      "@media (prefers-reduced-motion)": {
        transitionDuration: theme.respectReducedMotion ? "0ms" : void 0
      }
    }),
    inner: {
      position: "relative",
      width: _size,
      height: _size,
      order: labelPosition === "left" ? 2 : 1
    },
    input: __spreadProps(__spreadValues({}, theme.fn.focusStyles()), {
      appearance: "none",
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
      border: `${styles.rem(1)} solid ${error ? theme.fn.variant({ variant: "filled", color: "red" }).background : theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]}`,
      width: _size,
      height: _size,
      borderRadius: theme.fn.radius(radius),
      padding: 0,
      display: "block",
      margin: 0,
      transition: `border-color ${transitionDuration}ms ease, background-color ${transitionDuration}ms ease`,
      cursor: theme.cursorType,
      "&:checked": {
        backgroundColor: colors.background,
        borderColor: colors.background,
        [`& + .${styles.getStylesRef("icon")}`]: {
          opacity: 1,
          color: theme.white,
          transform: "translateY(0) scale(1)"
        }
      },
      "&:disabled": {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],
        borderColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[3],
        cursor: "not-allowed",
        [`& + .${styles.getStylesRef("icon")}`]: {
          color: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[5]
        }
      }
    })
  };
});

exports.default = useStyles;
//# sourceMappingURL=Checkbox.styles.js.map
