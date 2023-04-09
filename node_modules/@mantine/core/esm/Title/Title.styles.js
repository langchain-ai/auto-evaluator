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
function getFontSize(size, element, theme) {
  if (typeof size !== "undefined") {
    return size in theme.headings.sizes ? theme.headings.sizes[size].fontSize : rem(size);
  }
  return theme.headings.sizes[element].fontSize;
}
function getLineHeight(size, element, theme) {
  if (typeof size !== "undefined" && size in theme.headings.sizes) {
    return theme.headings.sizes[size].lineHeight;
  }
  return theme.headings.sizes[element].lineHeight;
}
var useStyles = createStyles((theme, { element, weight, inline }, { size }) => ({
  root: __spreadProps(__spreadValues({}, theme.fn.fontStyles()), {
    fontFamily: theme.headings.fontFamily,
    fontWeight: weight || theme.headings.sizes[element].fontWeight || theme.headings.fontWeight,
    fontSize: getFontSize(size, element, theme),
    lineHeight: inline ? 1 : getLineHeight(size, element, theme),
    margin: 0
  })
}));

export default useStyles;
//# sourceMappingURL=Title.styles.js.map
