import { createStyles, getSize, rem } from '@mantine/styles';

const sizes = {
  xs: rem(14),
  sm: rem(18),
  md: rem(20),
  lg: rem(28),
  xl: rem(32)
};
var useStyles = createStyles((theme, { type, color }, { size }) => {
  const emptyColor = theme.colorScheme === "light" ? theme.colors.gray[3] : theme.colors.gray[8];
  const fullColor = theme.fn.variant({ variant: "filled", color }).background;
  return {
    icon: {
      stroke: type === "empty" ? emptyColor : fullColor,
      fill: type === "empty" ? emptyColor : fullColor,
      width: getSize({ size, sizes }),
      height: getSize({ size, sizes })
    }
  };
});

export default useStyles;
//# sourceMappingURL=StarSymbol.styles.js.map
