import { createStyles, MANTINE_SIZES, em, getSize } from '@mantine/styles';

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
const getColumnFlexBasis = (colSpan, columns) => {
  if (colSpan === "content") {
    return "auto";
  }
  if (colSpan === "auto") {
    return "0rem";
  }
  return colSpan ? `${100 / (columns / colSpan)}%` : void 0;
};
const getColumnMaxWidth = (colSpan, columns, grow) => {
  if (grow || colSpan === "auto" || colSpan === "content") {
    return "unset";
  }
  return getColumnFlexBasis(colSpan, columns);
};
const getColumnFlexGrow = (colSpan, grow) => {
  if (!colSpan) {
    return void 0;
  }
  return colSpan === "auto" || grow ? 1 : 0;
};
const getColumnOffset = (offset, columns) => offset === 0 ? 0 : offset ? `${100 / (columns / offset)}%` : void 0;
const getGutterSize = (gutter, theme) => typeof gutter !== "undefined" ? `calc(${getSize({ size: gutter, sizes: theme.spacing })} / 2)` : void 0;
function getBreakpointsStyles({
  sizes,
  offsets,
  orders,
  theme,
  columns,
  gutters,
  grow
}) {
  return MANTINE_SIZES.reduce((acc, size) => {
    acc[`@media (min-width: ${em(theme.breakpoints[size])})`] = {
      order: orders[size],
      flexBasis: getColumnFlexBasis(sizes[size], columns),
      padding: getGutterSize(gutters[size], theme),
      flexShrink: 0,
      width: sizes[size] === "content" ? "auto" : void 0,
      maxWidth: getColumnMaxWidth(sizes[size], columns, grow),
      marginLeft: getColumnOffset(offsets[size], columns),
      flexGrow: getColumnFlexGrow(sizes[size], grow)
    };
    return acc;
  }, {});
}
var useStyles = createStyles((theme, {
  gutter,
  gutterXs,
  gutterSm,
  gutterMd,
  gutterLg,
  gutterXl,
  grow,
  offset,
  offsetXs,
  offsetSm,
  offsetMd,
  offsetLg,
  offsetXl,
  columns,
  span,
  xs,
  sm,
  md,
  lg,
  xl,
  order,
  orderXs,
  orderSm,
  orderMd,
  orderLg,
  orderXl
}) => ({
  col: __spreadValues({
    boxSizing: "border-box",
    flexGrow: getColumnFlexGrow(span, grow),
    order,
    padding: getGutterSize(gutter, theme),
    marginLeft: getColumnOffset(offset, columns),
    flexBasis: getColumnFlexBasis(span, columns),
    flexShrink: 0,
    width: span === "content" ? "auto" : void 0,
    maxWidth: getColumnMaxWidth(span, columns, grow)
  }, getBreakpointsStyles({
    sizes: { xs, sm, md, lg, xl },
    offsets: { xs: offsetXs, sm: offsetSm, md: offsetMd, lg: offsetLg, xl: offsetXl },
    orders: { xs: orderXs, sm: orderSm, md: orderMd, lg: orderLg, xl: orderXl },
    gutters: { xs: gutterXs, sm: gutterSm, md: gutterMd, lg: gutterLg, xl: gutterXl },
    theme,
    columns,
    grow
  }))
}));

export default useStyles;
//# sourceMappingURL=Col.styles.js.map
