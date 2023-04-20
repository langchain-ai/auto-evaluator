'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

var useStyles = styles.createStyles((theme) => ({
  divider: {
    marginTop: styles.rem(4),
    marginBottom: styles.rem(4),
    borderTop: `${styles.rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`
  }
}));

exports.default = useStyles;
//# sourceMappingURL=MenuDivider.styles.js.map
