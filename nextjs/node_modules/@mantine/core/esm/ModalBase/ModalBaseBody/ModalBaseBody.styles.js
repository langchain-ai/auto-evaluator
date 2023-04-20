import { createStyles, getSize } from '@mantine/styles';

var useStyles = createStyles((theme, { padding }) => ({
  body: {
    padding: getSize({ size: padding, sizes: theme.spacing }),
    "&:not(:only-child)": {
      paddingTop: 0
    }
  }
}));

export default useStyles;
//# sourceMappingURL=ModalBaseBody.styles.js.map
