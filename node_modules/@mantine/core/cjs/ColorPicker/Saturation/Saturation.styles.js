'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');
var Thumb_styles = require('../Thumb/Thumb.styles.js');

var __defProp = Object.defineProperty;
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
const SATURATION_HEIGHTS = {
  xs: styles.rem(100),
  sm: styles.rem(110),
  md: styles.rem(120),
  lg: styles.rem(140),
  xl: styles.rem(160)
};
var useStyles = styles.createStyles((theme, _params, { size }) => ({
  saturationThumb: {
    ref: styles.getStylesRef("saturationThumb")
  },
  saturation: {
    boxSizing: "border-box",
    position: "relative",
    height: styles.getSize({ size, sizes: SATURATION_HEIGHTS }),
    borderRadius: theme.radius.sm,
    margin: `calc(${styles.getSize({ size, sizes: Thumb_styles.THUMB_SIZES })} / 2)`,
    WebkitTapHighlightColor: "transparent",
    [`&:focus .${styles.getStylesRef("saturationThumb")}`]: __spreadValues({}, theme.focusRing === "always" || theme.focusRing === "auto" ? theme.focusRingStyles.styles(theme) : theme.focusRingStyles.resetStyles(theme)),
    [`&:focus:not(:focus-visible) .${styles.getStylesRef("saturationThumb")}`]: __spreadValues({}, theme.focusRing === "auto" || theme.focusRing === "never" ? theme.focusRingStyles.resetStyles(theme) : null)
  },
  saturationOverlay: __spreadValues({
    boxSizing: "border-box",
    borderRadius: theme.radius.sm
  }, theme.fn.cover(`calc(${styles.getSize({ size, sizes: Thumb_styles.THUMB_SIZES })} * -1 / 2 - ${styles.rem(1)})`))
}));

exports.default = useStyles;
//# sourceMappingURL=Saturation.styles.js.map
