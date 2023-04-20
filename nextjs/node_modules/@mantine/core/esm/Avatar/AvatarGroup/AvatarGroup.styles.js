import { createStyles, getSize } from '@mantine/styles';

var useStyles = createStyles((theme, { spacing }) => ({
  root: {
    display: "flex",
    paddingLeft: getSize({ size: spacing, sizes: theme.spacing })
  }
}));

export default useStyles;
//# sourceMappingURL=AvatarGroup.styles.js.map
