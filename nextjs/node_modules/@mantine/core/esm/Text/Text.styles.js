import { createStyles, getSize } from '@mantine/styles';

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
function getTextDecoration({
  underline,
  strikethrough
}) {
  const styles = [];
  if (underline) {
    styles.push("underline");
  }
  if (strikethrough) {
    styles.push("line-through");
  }
  return styles.length > 0 ? styles.join(" ") : "none";
}
function getTextColor({ theme, color }) {
  if (color === "dimmed") {
    return theme.fn.dimmed();
  }
  return typeof color === "string" && (color in theme.colors || color.split(".")[0] in theme.colors) ? theme.fn.variant({ variant: "filled", color }).background : color || "inherit";
}
function getLineClamp(lineClamp) {
  if (typeof lineClamp === "number") {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: lineClamp,
      WebkitBoxOrient: "vertical"
    };
  }
  return null;
}
function getTruncate({ theme, truncate }) {
  if (truncate === "start") {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      direction: theme.dir === "ltr" ? "rtl" : "ltr",
      textAlign: theme.dir === "ltr" ? "right" : "left"
    };
  }
  if (truncate) {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    };
  }
  return null;
}
var useStyles = createStyles((theme, {
  color,
  lineClamp,
  truncate,
  inline,
  inherit,
  underline,
  gradient,
  weight,
  transform,
  align,
  strikethrough,
  italic
}, { size }) => {
  const colors = theme.fn.variant({ variant: "gradient", gradient });
  return {
    root: __spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, theme.fn.fontStyles()), theme.fn.focusStyles()), getLineClamp(lineClamp)), getTruncate({ theme, truncate })), {
      color: getTextColor({ color, theme }),
      fontFamily: inherit ? "inherit" : theme.fontFamily,
      fontSize: inherit || size === void 0 ? "inherit" : getSize({ size, sizes: theme.fontSizes }),
      lineHeight: inherit ? "inherit" : inline ? 1 : theme.lineHeight,
      textDecoration: getTextDecoration({ underline, strikethrough }),
      WebkitTapHighlightColor: "transparent",
      fontWeight: inherit ? "inherit" : weight,
      textTransform: transform,
      textAlign: align,
      fontStyle: italic ? "italic" : void 0
    }),
    gradient: {
      backgroundImage: colors.background,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }
  };
});

export default useStyles;
//# sourceMappingURL=Text.styles.js.map
