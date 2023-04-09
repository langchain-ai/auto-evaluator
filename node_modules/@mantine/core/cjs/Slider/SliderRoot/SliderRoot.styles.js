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
  xs: styles.rem(4),
  sm: styles.rem(6),
  md: styles.rem(8),
  lg: styles.rem(10),
  xl: styles.rem(12)
};
var useStyles = styles.createStyles((theme, { disabled }, { size }) => ({
  root: __spreadProps(__spreadValues({}, theme.fn.fontStyles()), {
    WebkitTapHighlightColor: "transparent",
    outline: 0,
    height: `calc(${styles.getSize({ sizes, size })} * 2)`,
    display: "flex",
    alignItems: "center",
    cursor: disabled ? "not-allowed" : "pointer",
    touchAction: "none"
  })
}));

exports.default = useStyles;
exports.sizes = sizes;
//# sourceMappingURL=SliderRoot.styles.js.map
