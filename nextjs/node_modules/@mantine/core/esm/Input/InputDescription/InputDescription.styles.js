import { createStyles, getSize, rem } from '@mantine/styles';

var useStyles = createStyles((theme, _params, { size }) => ({
  description: {
    wordBreak: "break-word",
    color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
    fontSize: `calc(${getSize({ size, sizes: theme.fontSizes })} - ${rem(2)})`,
    lineHeight: 1.2,
    display: "block"
  }
}));

export default useStyles;
//# sourceMappingURL=InputDescription.styles.js.map
