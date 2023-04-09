import { createStyles, em, rem, getBreakpointValue, getSize } from '@mantine/styles';
import { getSortedBreakpoints } from './get-sorted-breakpoints/get-sorted-breakpoints.js';

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
var useStyles = createStyles((theme, {
  height,
  width,
  fixed,
  position,
  hiddenBreakpoint,
  zIndex,
  section,
  withBorder,
  layout
}) => {
  const breakpoints = typeof width === "object" && width !== null ? getSortedBreakpoints(width, theme).reduce((acc, [breakpoint, breakpointSize]) => {
    acc[`@media (min-width: ${em(breakpoint)})`] = {
      width: rem(breakpointSize),
      minWidth: rem(breakpointSize)
    };
    return acc;
  }, {}) : null;
  const borderStyles = withBorder ? {
    [section === "navbar" ? "borderRight" : "borderLeft"]: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`
  } : {};
  return {
    root: __spreadProps(__spreadValues(__spreadValues(__spreadProps(__spreadValues(__spreadValues({}, theme.fn.fontStyles()), position), {
      top: layout === "alt" ? 0 : (position == null ? void 0 : position.top) || "var(--mantine-header-height)",
      bottom: 0,
      zIndex,
      height: height ? rem(height) : layout === "alt" ? "auto" : "calc(100vh - var(--mantine-header-height, 0rem) - var(--mantine-footer-height, 0rem))",
      width: (width == null ? void 0 : width.base) ? rem(width == null ? void 0 : width.base) : "100%",
      position: fixed ? "fixed" : "static",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }), borderStyles), breakpoints), {
      "&[data-hidden]": {
        [`@media (max-width: ${em(getBreakpointValue(getSize({
          size: hiddenBreakpoint,
          sizes: theme.breakpoints
        })) - 1)})`]: {
          display: "none"
        }
      }
    })
  };
});

export default useStyles;
//# sourceMappingURL=HorizontalSection.styles.js.map
