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
  xs: styles.rem(160),
  sm: styles.rem(200),
  md: styles.rem(340),
  lg: styles.rem(400),
  xl: styles.rem(500)
};
var useStyles = styles.createStyles((theme, _params, { size }) => ({
  root: __spreadProps(__spreadValues({}, theme.fn.fontStyles()), {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    position: "relative",
    width: styles.getSize({ size, sizes }),
    maxWidth: "100%",
    minHeight: styles.rem(50)
  }),
  closeButton: {
    position: "absolute",
    top: `calc(${theme.spacing.md} / 2)`,
    right: `calc(${theme.spacing.md} / 2)`
  }
}));

exports.default = useStyles;
//# sourceMappingURL=Dialog.styles.js.map
