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
var useStyles = styles.createStyles((theme, { radius }, { size }) => {
  const overlayColor = theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3];
  return {
    root: __spreadProps(__spreadValues({}, theme.fn.focusStyles()), {
      width: styles.rem(size),
      height: styles.rem(size),
      WebkitTapHighlightColor: "transparent",
      border: 0,
      borderRadius: theme.fn.radius(radius),
      appearance: "none",
      WebkitAppearance: "none",
      padding: 0,
      position: "relative",
      overflow: "hidden"
    }),
    overlay: __spreadProps(__spreadValues({}, theme.fn.cover()), {
      position: "absolute",
      borderRadius: theme.fn.radius(radius)
    }),
    children: {
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center"
    },
    shadowOverlay: {
      boxShadow: `rgba(0, 0, 0, .1) 0 0 0 ${styles.rem(1)} inset, rgb(0, 0, 0, .15) 0 0 ${styles.rem(4)} inset`,
      zIndex: 1
    },
    alphaOverlay: {
      backgroundImage: `linear-gradient(45deg, ${overlayColor} 25%, transparent 25%), linear-gradient(-45deg, ${overlayColor} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${overlayColor} 75%), linear-gradient(-45deg, ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white} 75%, ${overlayColor} 75%)`,
      backgroundSize: `${styles.rem(8)} ${styles.rem(8)}`,
      backgroundPosition: `0 0, 0 ${styles.rem(4)}, ${styles.rem(4)} -${styles.rem(4)}, -${styles.rem(4)} 0`
    }
  };
});

exports.default = useStyles;
//# sourceMappingURL=ColorSwatch.styles.js.map
