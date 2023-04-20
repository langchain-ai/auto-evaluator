import { createStyles, getSize } from '@mantine/styles';
import { sizes } from '../SliderRoot/SliderRoot.styles.js';

var useStyles = createStyles((theme, { radius, color, disabled, inverted }, { size }) => ({
  track: {
    position: "relative",
    height: getSize({ sizes, size }),
    width: "100%",
    marginRight: getSize({ size, sizes }),
    marginLeft: getSize({ size, sizes }),
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      borderRadius: theme.fn.radius(radius),
      right: `calc(${getSize({ size, sizes })} * -1)`,
      left: `calc(${getSize({ size, sizes })} * -1)`,
      backgroundColor: inverted ? disabled ? theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[4] : theme.fn.variant({ variant: "filled", color }).background : theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],
      zIndex: 0
    }
  },
  bar: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    bottom: 0,
    backgroundColor: inverted ? theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2] : disabled ? theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[4] : theme.fn.variant({ variant: "filled", color }).background,
    borderRadius: theme.fn.radius(radius)
  }
}));

export default useStyles;
//# sourceMappingURL=Track.styles.js.map
