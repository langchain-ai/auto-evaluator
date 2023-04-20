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
var useStyles = styles.createStyles((theme, { rightSectionWidth }, { size }) => ({
  visibilityToggle: {},
  input: {
    position: "relative",
    overflow: "hidden"
  },
  innerInput: __spreadProps(__spreadValues(__spreadValues({}, theme.fn.fontStyles()), theme.fn.cover(0)), {
    backgroundColor: "transparent",
    border: `${styles.rem(1)} solid transparent`,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    boxSizing: "border-box",
    display: "block",
    width: `calc(100% - ${styles.rem(rightSectionWidth)})`,
    paddingLeft: `calc(${styles.getSize({ size, sizes: Input_styles.sizes })}  / 3)`,
    fontSize: styles.getSize({ size, sizes: theme.fontSizes }),
    height: `calc(${styles.getSize({ size, sizes: Input_styles.sizes })} - ${styles.rem(2)})`,
    lineHeight: `calc(${styles.getSize({ size, sizes: Input_styles.sizes })} - ${styles.rem(4)})`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    "&::-ms-reveal, &::-ms-clear": {
      display: "none"
    },
    "&:focus": {
      outline: 0
    },
    "&:disabled": {
      cursor: "not-allowed"
    },
    "&::placeholder": __spreadProps(__spreadValues({}, theme.fn.placeholderStyles()), {
      opacity: 1
    }),
    "&[data-invalid]": {
      color: theme.fn.variant({ variant: "filled", color: "red" }).background,
      "&::placeholder": {
        opacity: 1,
        color: theme.fn.variant({ variant: "filled", color: "red" }).background
      }
    },
    "&[data-with-icon]": {
      paddingLeft: styles.getSize({ size, sizes: Input_styles.sizes })
    }
  })
}));

exports.default = useStyles;
//# sourceMappingURL=PasswordInput.styles.js.map
