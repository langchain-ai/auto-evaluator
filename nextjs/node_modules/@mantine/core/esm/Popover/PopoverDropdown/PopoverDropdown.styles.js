import { createStyles, rem } from '@mantine/styles';

var useStyles = createStyles((theme, { radius, shadow }) => ({
  dropdown: {
    position: "absolute",
    backgroundColor: theme.white,
    background: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    border: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    boxShadow: theme.shadows[shadow] || shadow || "none",
    borderRadius: theme.fn.radius(radius),
    "&:focus": {
      outline: 0
    }
  },
  arrow: {
    backgroundColor: "inherit",
    border: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    zIndex: 1
  }
}));

export default useStyles;
//# sourceMappingURL=PopoverDropdown.styles.js.map
