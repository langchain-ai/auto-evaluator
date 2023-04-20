'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

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
var useStyles = styles.createStyles((theme, {
  captionSide,
  horizontalSpacing,
  verticalSpacing,
  fontSize,
  withBorder,
  withColumnBorders
}) => {
  const border = `${styles.rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`;
  return {
    root: __spreadProps(__spreadValues({}, theme.fn.fontStyles()), {
      width: "100%",
      borderCollapse: "collapse",
      captionSide,
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      lineHeight: theme.lineHeight,
      border: withBorder ? border : void 0,
      "& caption": {
        marginTop: captionSide === "top" ? 0 : theme.spacing.xs,
        marginBottom: captionSide === "bottom" ? 0 : theme.spacing.xs,
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6]
      },
      "& thead tr th, & tfoot tr th, & tbody tr th": {
        textAlign: "left",
        fontWeight: "bold",
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: styles.getSize({ size: fontSize, sizes: theme.fontSizes }),
        padding: `${styles.getSize({ size: verticalSpacing, sizes: theme.spacing })} ${styles.getSize({
          size: horizontalSpacing,
          sizes: theme.spacing
        })}`
      },
      "& thead tr th": {
        borderBottom: border
      },
      "& tfoot tr th, & tbody tr th": {
        borderTop: border
      },
      "& tbody tr td": {
        padding: `${styles.getSize({
          size: verticalSpacing,
          sizes: theme.spacing
        })} ${styles.getSize({ size: horizontalSpacing, sizes: theme.spacing })}`,
        borderTop: border,
        fontSize: styles.getSize({ size: fontSize, sizes: theme.fontSizes })
      },
      "& tbody tr:first-of-type td, & tbody tr:first-of-type th": {
        borderTop: "none"
      },
      "& thead th, & tbody td": {
        borderRight: withColumnBorders ? border : "none",
        "&:last-of-type": {
          borderRight: "none",
          borderLeft: withColumnBorders ? border : "none"
        }
      },
      "& tbody tr th": {
        borderRight: withColumnBorders ? border : "none"
      },
      "&[data-striped] tbody tr:nth-of-type(odd)": {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
      },
      "&[data-hover] tbody tr": theme.fn.hover({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
      })
    })
  };
});

exports.default = useStyles;
//# sourceMappingURL=Table.styles.js.map
