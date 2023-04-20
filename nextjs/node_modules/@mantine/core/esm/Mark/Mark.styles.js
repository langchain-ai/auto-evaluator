import { createStyles } from '@mantine/styles';

var useStyles = createStyles((theme, { color }) => ({
  root: {
    backgroundColor: theme.fn.themeColor(color, theme.colorScheme === "dark" ? 5 : 2),
    color: theme.colorScheme === "dark" ? theme.colors.dark[9] : "inherit"
  }
}));

export default useStyles;
//# sourceMappingURL=Mark.styles.js.map
