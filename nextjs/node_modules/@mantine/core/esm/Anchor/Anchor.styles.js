import { createStyles } from '@mantine/styles';

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
function getAnchorColor({ theme, color }) {
  if (color === "dimmed") {
    return theme.fn.dimmed();
  }
  return theme.fn.themeColor(color || theme.primaryColor, theme.colorScheme === "dark" ? 4 : 7, false, true);
}
var useStyles = createStyles((theme, { color, underline }) => ({
  root: __spreadValues({
    backgroundColor: "transparent",
    cursor: "pointer",
    padding: 0,
    border: 0,
    color: getAnchorColor({ theme, color })
  }, theme.fn.hover({ textDecoration: underline ? "underline" : "none" }))
}));

export default useStyles;
//# sourceMappingURL=Anchor.styles.js.map
