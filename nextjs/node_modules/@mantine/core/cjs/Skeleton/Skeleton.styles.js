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
const fade = styles.keyframes({
  "from, to": { opacity: 0.4 },
  "50%": { opacity: 1 }
});
var useStyles = styles.createStyles((theme, { height, width, radius, circle, animate }) => ({
  root: {
    height: styles.rem(height),
    width: circle ? styles.rem(height) : styles.rem(width),
    borderRadius: circle ? styles.rem(height) : theme.fn.radius(radius),
    position: "relative",
    WebkitTransform: "translateZ(0)"
  },
  visible: {
    overflow: "hidden",
    "&::before": __spreadProps(__spreadValues({}, theme.fn.cover(0)), {
      content: '""',
      background: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      zIndex: 10
    }),
    "&::after": __spreadProps(__spreadValues({}, theme.fn.cover(0)), {
      content: '""',
      background: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3],
      animation: animate ? `${fade} 1500ms linear infinite` : "none",
      zIndex: 11
    })
  }
}));

exports.default = useStyles;
exports.fade = fade;
//# sourceMappingURL=Skeleton.styles.js.map
