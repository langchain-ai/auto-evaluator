import { createStyles, getSize } from '@mantine/styles';

var useStyles = createStyles((theme, { fluid, sizes }, { size }) => ({
  root: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    maxWidth: fluid ? "100%" : getSize({ size, sizes }),
    marginLeft: "auto",
    marginRight: "auto"
  }
}));

export default useStyles;
//# sourceMappingURL=Container.styles.js.map
