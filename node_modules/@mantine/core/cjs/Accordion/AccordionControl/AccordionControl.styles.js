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
function getVariantStyles(theme, variant) {
  if (variant === "default" || variant === "contained") {
    return theme.fn.hover({
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
    });
  }
  return {};
}
var useStyles = styles.createStyles((theme, { transitionDuration, chevronPosition, chevronSize }, { variant }) => ({
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: chevronPosition === "left" ? 0 : theme.spacing.sm,
    marginLeft: chevronPosition === "left" ? theme.spacing.lg : 0
  },
  chevron: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: `transform ${transitionDuration}ms ease`,
    marginRight: chevronPosition === "right" ? 0 : theme.spacing.sm,
    marginLeft: chevronPosition === "right" ? theme.spacing.lg : 0,
    width: chevronSize,
    minWidth: chevronSize,
    "&[data-rotate]": {
      transform: "rotate(180deg)"
    }
  },
  label: {
    color: "inherit",
    fontWeight: 400,
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md
  },
  itemTitle: {
    margin: 0,
    padding: 0
  },
  control: __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, theme.fn.focusStyles()), theme.fn.fontStyles()), getVariantStyles(theme, variant)), {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: chevronPosition === "right" ? "row-reverse" : "row",
    paddingRight: theme.spacing.md,
    paddingLeft: chevronPosition === "right" ? `calc(${theme.spacing.md} + ${styles.rem(4)})` : theme.spacing.xs,
    textAlign: "left",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    "&:disabled": __spreadValues({
      opacity: 0.4,
      cursor: "not-allowed"
    }, theme.fn.hover({ backgroundColor: "transparent" }))
  })
}));

exports.default = useStyles;
//# sourceMappingURL=AccordionControl.styles.js.map
