import { createStyles, rem } from '@mantine/styles';

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
var useStyles = createStyles((theme, { color, opacity, blur, radius, gradient, fixed, zIndex }) => ({
  root: __spreadProps(__spreadValues({}, theme.fn.cover(0)), {
    position: fixed ? "fixed" : "absolute",
    backgroundColor: gradient ? void 0 : theme.fn.rgba(color, opacity),
    backgroundImage: gradient,
    backdropFilter: blur ? `blur(${rem(blur)})` : void 0,
    borderRadius: theme.fn.radius(radius),
    zIndex,
    "&[data-center]": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  })
}));

export default useStyles;
//# sourceMappingURL=Overlay.styles.js.map
