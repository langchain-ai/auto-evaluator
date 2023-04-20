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
var useStyles = styles.createStyles((theme, { color, radius }) => ({
  item: __spreadProps(__spreadValues({}, theme.fn.fontStyles()), {
    WebkitTapHighlightColor: "transparent",
    fontSize: theme.fontSizes.sm,
    border: 0,
    backgroundColor: "transparent",
    outline: 0,
    width: "100%",
    textAlign: "left",
    textDecoration: "none",
    boxSizing: "border-box",
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    cursor: "pointer",
    borderRadius: theme.fn.radius(radius),
    color: color ? theme.fn.variant({ variant: "filled", primaryFallback: false, color }).background : theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    display: "flex",
    alignItems: "center",
    "&:disabled": {
      color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[5],
      pointerEvents: "none",
      userSelect: "none"
    },
    "&[data-hovered]": {
      backgroundColor: color ? theme.fn.variant({ variant: "light", color }).background : theme.colorScheme === "dark" ? theme.fn.rgba(theme.colors.dark[3], 0.35) : theme.colors.gray[1]
    }
  }),
  itemLabel: {
    flex: 1
  },
  itemIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.xs
  },
  itemRightSection: {}
}));

exports.default = useStyles;
//# sourceMappingURL=MenuItem.styles.js.map
