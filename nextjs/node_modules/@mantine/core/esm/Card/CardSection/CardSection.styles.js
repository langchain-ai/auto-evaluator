import { createStyles, getSize, rem } from '@mantine/styles';

var useStyles = createStyles((theme, { padding, withBorder, inheritPadding }) => {
  const spacing = getSize({ size: padding, sizes: theme.spacing });
  const offset = `calc(-1 * ${spacing})`;
  const borderColor = theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3];
  return {
    cardSection: {
      display: "block",
      marginLeft: offset,
      marginRight: offset,
      paddingLeft: inheritPadding ? spacing : void 0,
      paddingRight: inheritPadding ? spacing : void 0,
      borderTop: withBorder ? `${rem(1)} solid ${borderColor}` : void 0,
      borderBottom: withBorder ? `${rem(1)} solid ${borderColor}` : void 0,
      "& + &": {
        borderTop: 0
      },
      "&[data-first]": {
        marginTop: offset,
        borderTop: 0,
        borderBottom: withBorder ? `${rem(1)} solid ${borderColor}` : void 0
      },
      "&[data-last]": {
        marginBottom: offset,
        borderBottom: 0
      }
    }
  };
});

export default useStyles;
//# sourceMappingURL=CardSection.styles.js.map
