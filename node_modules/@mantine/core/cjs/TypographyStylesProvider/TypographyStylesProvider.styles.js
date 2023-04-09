'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');
var utils = require('@mantine/utils');

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
var useStyles = styles.createStyles((theme) => {
  const headings = utils.keys(theme.headings.sizes).reduce((acc, h) => {
    const values = theme.headings.sizes[h];
    acc[`& ${h}`] = __spreadProps(__spreadValues({
      fontFamily: theme.headings.fontFamily,
      fontWeight: values.fontWeight || theme.headings.fontWeight,
      marginTop: typeof values.lineHeight === "number" ? `calc(${theme.spacing.xl} * ${values.lineHeight})` : theme.spacing.xl,
      marginBottom: theme.spacing.sm
    }, values), {
      [theme.fn.smallerThan("sm")]: {
        fontSize: `calc(${styles.rem(values.fontSize)} / 1.3)`
      }
    });
    return acc;
  }, {});
  return {
    root: __spreadProps(__spreadValues(__spreadProps(__spreadValues({}, theme.fn.fontStyles()), {
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      lineHeight: theme.lineHeight,
      fontSize: theme.fontSizes.md,
      [theme.fn.smallerThan("sm")]: {
        fontSize: theme.fontSizes.sm
      }
    }), headings), {
      "& img": {
        maxWidth: "100%",
        marginBottom: theme.spacing.xs
      },
      "& p": {
        marginTop: 0,
        marginBottom: theme.spacing.lg
      },
      "& mark": {
        backgroundColor: theme.fn.themeColor("yellow", theme.colorScheme === "dark" ? 5 : 2),
        color: theme.colorScheme === "dark" ? theme.colors.dark[9] : "inherit"
      },
      "& hr": {
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        borderBottom: 0,
        borderLeft: 0,
        borderRight: 0,
        borderTop: `${styles.rem(1)} dashed ${theme.colors.gray[theme.colorScheme === "dark" ? 4 : 6]}`
      },
      "& a": __spreadProps(__spreadValues({}, theme.fn.focusStyles()), {
        color: theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline"
        }
      }),
      "& pre": {
        padding: theme.spacing.xs,
        lineHeight: theme.lineHeight,
        margin: 0,
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.md,
        overflowX: "auto",
        fontFamily: theme.fontFamilyMonospace,
        fontSize: theme.fontSizes.sm,
        borderRadius: theme.radius.sm,
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
        "& code": {
          backgroundColor: "transparent",
          padding: 0,
          borderRadius: 0,
          color: "inherit",
          border: 0
        }
      },
      "& code": {
        lineHeight: theme.lineHeight,
        padding: `${styles.rem(1)} ${styles.rem(5)}`,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[0],
        fontFamily: theme.fontFamilyMonospace,
        fontSize: theme.fontSizes.xs,
        border: `${styles.rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[3]}`
      },
      "& ul, & ol": {
        marginBottom: theme.spacing.md,
        paddingLeft: 38,
        "& li": {
          marginTop: theme.spacing.xs
        }
      },
      "& table": {
        width: "100%",
        borderCollapse: "collapse",
        captionSide: "bottom",
        marginBottom: theme.spacing.md,
        "& caption": {
          marginTop: theme.spacing.xs,
          fontSize: theme.fontSizes.sm,
          color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6]
        },
        "& th": {
          textAlign: "left",
          fontWeight: "bold",
          color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
          fontSize: 14,
          padding: `${styles.rem(7)} ${styles.rem(10)}`
        },
        "& thead th": {
          borderBottom: `${styles.rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`
        },
        "& tfoot th": {
          borderTop: `${styles.rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`
        },
        "& td": {
          padding: `${styles.rem(7)} ${styles.rem(10)}`,
          borderBottom: `${styles.rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
          fontSize: 14
        },
        "& tr:last-of-type td": {
          borderBottom: "none"
        }
      },
      "& blockquote": {
        fontSize: theme.fontSizes.lg,
        lineHeight: theme.lineHeight,
        margin: `${theme.spacing.md} 0`,
        borderTopRightRadius: theme.radius.sm,
        borderBottomRightRadius: theme.radius.sm,
        padding: `${theme.spacing.md} ${theme.spacing.lg}`,
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        borderLeft: `${styles.rem(6)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
        "& cite": {
          display: "block",
          fontSize: theme.fontSizes.sm,
          marginTop: theme.spacing.xs,
          color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
          overflow: "hidden",
          textOverflow: "ellipsis"
        }
      }
    })
  };
});

exports.default = useStyles;
//# sourceMappingURL=TypographyStylesProvider.styles.js.map
