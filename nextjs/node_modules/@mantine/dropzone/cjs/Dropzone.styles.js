'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@mantine/core');

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
var useStyles = core.createStyles((theme, { padding, radius }) => {
  const rejected = theme.fn.variant({ color: "red", variant: "light" });
  const accepted = theme.fn.variant({ color: theme.primaryColor, variant: "light" });
  return {
    root: __spreadProps(__spreadValues(__spreadValues({}, theme.fn.fontStyles()), theme.fn.focusStyles()), {
      boxSizing: "border-box",
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
      border: `${core.rem(2)} dashed ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]}`,
      padding: core.getSize({ size: padding, sizes: theme.spacing }),
      borderRadius: theme.fn.radius(radius),
      cursor: "pointer",
      userSelect: "none",
      transition: "background-color 150ms ease",
      position: "relative",
      "&:hover": {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[0]
      },
      "&[data-loading]": {
        cursor: "default",
        "&:hover": {
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white
        }
      },
      "&[data-accept]": {
        backgroundColor: theme.colorScheme === "dark" ? accepted.background : theme.colors[theme.primaryColor][0],
        borderColor: theme.colorScheme === "dark" ? accepted.border : theme.colors[theme.primaryColor][4],
        "&:hover": {
          backgroundColor: theme.colorScheme === "dark" ? accepted.background : theme.colors[theme.primaryColor][0]
        }
      },
      "&[data-reject]": {
        backgroundColor: theme.colorScheme === "dark" ? rejected.background : theme.colors.red[0],
        borderColor: theme.colorScheme === "dark" ? rejected.border : theme.colors.red[4],
        "&:hover": {
          backgroundColor: theme.colorScheme === "dark" ? rejected.background : theme.colors.red[0]
        }
      }
    }),
    inner: {
      pointerEvents: "none",
      userSelect: "none"
    }
  };
});

exports.default = useStyles;
//# sourceMappingURL=Dropzone.styles.js.map
