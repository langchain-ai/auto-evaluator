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
var useStyles = styles.createStyles((theme, _params, { size }) => ({
  sliderThumb: {
    ref: styles.getStylesRef("sliderThumb")
  },
  slider: {
    position: "relative",
    height: `calc(${styles.getSize({ size, sizes: Thumb_styles.THUMB_SIZES })} + ${styles.rem(2)})`,
    boxSizing: "border-box",
    marginLeft: `calc(${styles.getSize({ size, sizes: Thumb_styles.THUMB_SIZES })} / 2)`,
    marginRight: `calc(${styles.getSize({ size, sizes: Thumb_styles.THUMB_SIZES })} / 2)`,
    outline: 0,
    [`&:focus .${styles.getStylesRef("sliderThumb")}`]: __spreadValues({}, theme.focusRing === "always" || theme.focusRing === "auto" ? theme.focusRingStyles.styles(theme) : theme.focusRingStyles.resetStyles(theme)),
    [`&:focus:not(:focus-visible) .${styles.getStylesRef("sliderThumb")}`]: __spreadValues({}, theme.focusRing === "auto" || theme.focusRing === "never" ? theme.focusRingStyles.resetStyles(theme) : null)
  },
  sliderOverlay: {
    position: "absolute",
    boxSizing: "border-box",
    top: 0,
    bottom: 0,
    left: `calc(${styles.getSize({ size, sizes: Thumb_styles.THUMB_SIZES })} * -1 / 2 - ${styles.rem(1)})`,
    right: `calc(${styles.getSize({ size, sizes: Thumb_styles.THUMB_SIZES })} * -1 / 2 - ${styles.rem(1)})`,
    borderRadius: 1e3
  }
}));

exports.default = useStyles;
//# sourceMappingURL=ColorSlider.styles.js.map
