'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

var useStyles = styles.createStyles((theme, { padding }) => {
  const paddingValue = styles.getSize({ size: padding, sizes: theme.spacing });
  return {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: paddingValue,
      paddingRight: `calc(${paddingValue} - ${styles.rem(5)})`,
      position: "sticky",
      top: 0,
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      zIndex: 1e3
    }
  };
});

exports.default = useStyles;
//# sourceMappingURL=ModalBaseHeader.styles.js.map
