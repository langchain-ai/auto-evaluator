import { createStyles, getStylesRef, getSize, rem } from '@mantine/styles';
import { THUMB_SIZES } from '../Thumb/Thumb.styles.js';

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
  xs: rem(100),
  sm: rem(110),
  md: rem(120),
  lg: rem(140),
  xl: rem(160)
};
var useStyles = createStyles((theme, _params, { size }) => ({
  saturationThumb: {
    ref: getStylesRef("saturationThumb")
  },
  saturation: {
    boxSizing: "border-box",
    position: "relative",
    height: getSize({ size, sizes: SATURATION_HEIGHTS }),
    borderRadius: theme.radius.sm,
    margin: `calc(${getSize({ size, sizes: THUMB_SIZES })} / 2)`,
    WebkitTapHighlightColor: "transparent",
    [`&:focus .${getStylesRef("saturationThumb")}`]: __spreadValues({}, theme.focusRing === "always" || theme.focusRing === "auto" ? theme.focusRingStyles.styles(theme) : theme.focusRingStyles.resetStyles(theme)),
    [`&:focus:not(:focus-visible) .${getStylesRef("saturationThumb")}`]: __spreadValues({}, theme.focusRing === "auto" || theme.focusRing === "never" ? theme.focusRingStyles.resetStyles(theme) : null)
  },
  saturationOverlay: __spreadValues({
    boxSizing: "border-box",
    borderRadius: theme.radius.sm
  }, theme.fn.cover(`calc(${getSize({ size, sizes: THUMB_SIZES })} * -1 / 2 - ${rem(1)})`))
}));

export default useStyles;
//# sourceMappingURL=Saturation.styles.js.map
