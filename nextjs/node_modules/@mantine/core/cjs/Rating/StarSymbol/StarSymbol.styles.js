'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

const sizes = {
  xs: styles.rem(14),
  sm: styles.rem(18),
  md: styles.rem(20),
  lg: styles.rem(28),
  xl: styles.rem(32)
};
var useStyles = styles.createStyles((theme, { type, color }, { size }) => {
  const emptyColor = theme.colorScheme === "light" ? theme.colors.gray[3] : theme.colors.gray[8];
  const fullColor = theme.fn.variant({ variant: "filled", color }).background;
  return {
    icon: {
      stroke: type === "empty" ? emptyColor : fullColor,
      fill: type === "empty" ? emptyColor : fullColor,
      width: styles.getSize({ size, sizes }),
      height: styles.getSize({ size, sizes })
    }
  };
});

exports.default = useStyles;
//# sourceMappingURL=StarSymbol.styles.js.map
