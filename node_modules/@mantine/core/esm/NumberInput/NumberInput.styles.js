import { createStyles, rem, getSize } from '@mantine/styles';

const CONTROL_SIZES = {
  xs: rem(20),
  sm: rem(24),
  md: rem(30),
  lg: rem(34),
  xl: rem(36)
};
var useStyles = createStyles((theme, { radius }, { size }) => ({
  rightSection: {
    display: "flex",
    flexDirection: "column",
    height: `calc(100% - ${rem(2)})`,
    margin: rem(1),
    overflow: "hidden",
    borderTopRightRadius: theme.fn.radius(radius),
    borderBottomRightRadius: theme.fn.radius(radius)
  },
  control: {
    margin: 0,
    position: "relative",
    flex: "0 0 50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    width: getSize({ size, sizes: CONTROL_SIZES }),
    padding: 0,
    WebkitTapHighlightColor: "transparent",
    borderBottom: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]}`,
    borderLeft: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]}`,
    borderTop: 0,
    borderRight: 0,
    backgroundColor: "transparent",
    marginRight: rem(1),
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    "&:not(:disabled):hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[0]
    },
    "&:disabled": {
      color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[4]
    }
  },
  controlUp: {},
  controlDown: {
    borderBottom: 0
  }
}));

export default useStyles;
export { CONTROL_SIZES };
//# sourceMappingURL=NumberInput.styles.js.map
