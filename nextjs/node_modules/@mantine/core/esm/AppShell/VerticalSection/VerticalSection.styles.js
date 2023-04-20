import { createStyles, em, rem } from '@mantine/styles';
import { getSortedBreakpoints } from '../HorizontalSection/get-sorted-breakpoints/get-sorted-breakpoints.js';

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
var useStyles = createStyles((theme, { height, fixed, position, zIndex, borderPosition, layout }) => {
  const breakpoints = typeof height === "object" && height !== null ? getSortedBreakpoints(height, theme).reduce((acc, [breakpoint, breakpointSize]) => {
    acc[`@media (min-width: ${em(breakpoint)})`] = {
      height: rem(breakpointSize),
      minHeight: rem(breakpointSize)
    };
    return acc;
  }, {}) : null;
  return {
    root: __spreadProps(__spreadValues(__spreadProps(__spreadValues(__spreadValues({}, theme.fn.fontStyles()), position), {
      zIndex,
      left: layout === "alt" ? "var(--mantine-navbar-width, 0)" : 0,
      right: layout === "alt" ? "var(--mantine-aside-width, 0)" : 0,
      height: typeof height === "object" ? rem(height == null ? void 0 : height.base) || "100%" : rem(height),
      maxHeight: typeof height === "object" ? rem(height == null ? void 0 : height.base) || "100%" : rem(height),
      position: fixed ? "fixed" : "static",
      boxSizing: "border-box",
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }), breakpoints), {
      borderBottom: borderPosition === "bottom" ? `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}` : void 0,
      borderTop: borderPosition === "top" ? `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}` : void 0
    })
  };
});

export default useStyles;
//# sourceMappingURL=VerticalSection.styles.js.map
