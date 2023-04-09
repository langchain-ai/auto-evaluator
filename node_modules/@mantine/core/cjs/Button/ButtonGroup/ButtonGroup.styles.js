'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

var useStyles = styles.createStyles((_theme, { orientation, buttonBorderWidth }) => ({
  root: {
    display: "flex",
    flexDirection: orientation === "vertical" ? "column" : "row",
    "& [data-button]": {
      "&:first-of-type:not(:last-of-type)": {
        borderBottomRightRadius: 0,
        [orientation === "vertical" ? "borderBottomLeftRadius" : "borderTopRightRadius"]: 0,
        [orientation === "vertical" ? "borderBottomWidth" : "borderRightWidth"]: `calc(${styles.rem(buttonBorderWidth)} / 2)`
      },
      "&:last-of-type:not(:first-of-type)": {
        borderTopLeftRadius: 0,
        [orientation === "vertical" ? "borderTopRightRadius" : "borderBottomLeftRadius"]: 0,
        [orientation === "vertical" ? "borderTopWidth" : "borderLeftWidth"]: `calc(${styles.rem(buttonBorderWidth)} / 2)`
      },
      "&:not(:first-of-type):not(:last-of-type)": {
        borderRadius: 0,
        [orientation === "vertical" ? "borderTopWidth" : "borderLeftWidth"]: `calc(${styles.rem(buttonBorderWidth)} / 2)`,
        [orientation === "vertical" ? "borderBottomWidth" : "borderRightWidth"]: `calc(${styles.rem(buttonBorderWidth)} / 2)`
      },
      "& + [data-button]": {
        [orientation === "vertical" ? "marginTop" : "marginLeft"]: `calc(${buttonBorderWidth} * -1)`,
        "@media (min-resolution: 192dpi)": {
          [orientation === "vertical" ? "marginTop" : "marginLeft"]: 0
        }
      }
    }
  }
}));

exports.default = useStyles;
//# sourceMappingURL=ButtonGroup.styles.js.map
