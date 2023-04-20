import { createStyles, getSize, rem } from '@mantine/styles';

var useStyles = createStyles((theme, _params, { size }) => ({
  input: {
    fontFamily: theme.fontFamilyMonospace,
    fontSize: `calc(${getSize({ size, sizes: theme.fontSizes })} - ${rem(2)})`
  }
}));

export default useStyles;
//# sourceMappingURL=JsonInput.styles.js.map
