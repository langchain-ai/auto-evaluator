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
const NAV_LINK_VARIANTS = ["filled", "light", "subtle"];
function getVariantStyles({ theme, variant, color }) {
  if (!NAV_LINK_VARIANTS.includes(variant)) {
    return null;
  }
  const colors = theme.fn.variant({ variant, color });
  return {
    "&[data-active]": __spreadValues({
      backgroundColor: colors.background,
      color: colors.color
    }, theme.fn.hover({ backgroundColor: colors.hover }))
  };
}
var useStyles = styles.createStyles((theme, { noWrap, childrenOffset, alignIcon, color }, { variant }) => ({
  root: __spreadProps(__spreadValues(__spreadValues({
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: `${styles.rem(8)} ${theme.spacing.sm}`,
    userSelect: "none"
  }, getVariantStyles({ theme, variant, color })), theme.fn.hover({
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
  })), {
    "&[data-disabled]": {
      opacity: 0.4,
      pointerEvents: "none"
    }
  }),
  icon: {
    marginRight: theme.spacing.sm,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: alignIcon === "center" ? "center" : "flex-start",
    paddingTop: alignIcon === "center" ? void 0 : styles.rem(4)
  },
  rightSection: {
    marginLeft: theme.spacing.sm,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: `transform 150ms ${theme.transitionTimingFunction}`,
    "&[data-rotate]": {
      transform: "rotate(90deg)"
    }
  },
  body: {
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: noWrap ? "nowrap" : void 0
  },
  label: {},
  description: {
    display: "block",
    "&[data-active]": {
      color: "inherit"
    }
  },
  children: {
    paddingLeft: styles.getSize({ size: childrenOffset, sizes: theme.spacing })
  }
}));

exports.default = useStyles;
//# sourceMappingURL=NavLink.styles.js.map
