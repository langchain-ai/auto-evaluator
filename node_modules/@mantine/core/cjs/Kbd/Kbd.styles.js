'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

const sizes = {
  xs: { padding: `${styles.rem(2)} ${styles.rem(4)}`, fontSize: styles.rem(10) },
  sm: { padding: `${styles.rem(3)} ${styles.rem(5)}`, fontSize: styles.rem(12) },
  md: { padding: `${styles.rem(4)} ${styles.rem(7)}`, fontSize: styles.rem(14) },
  lg: { padding: `${styles.rem(5)} ${styles.rem(9)}`, fontSize: styles.rem(16) },
  xl: { padding: `${styles.rem(8)} ${styles.rem(14)}`, fontSize: styles.rem(20) }
};
var useStyles = styles.createStyles((theme, _params, { size }) => {
  const _size = size in sizes ? sizes[size] : sizes.sm;
  return {
    root: {
      lineHeight: theme.lineHeight,
      fontFamily: theme.fontFamilyMonospace,
      fontSize: _size.fontSize,
      fontWeight: 700,
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
      padding: _size.padding,
      borderRadius: theme.radius.sm,
      border: `${styles.rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
      borderBottom: `${styles.rem(3)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`
    }
  };
});

exports.default = useStyles;
//# sourceMappingURL=Kbd.styles.js.map
