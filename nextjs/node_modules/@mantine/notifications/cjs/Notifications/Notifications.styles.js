'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@mantine/core');

var useStyles = core.createStyles((theme, { zIndex }) => ({
  notifications: {
    width: `calc(100% - ${theme.spacing.md} * 2)`,
    boxSizing: "border-box",
    position: "fixed",
    zIndex
  },
  notification: {
    "&:not(:first-of-type)": {
      marginTop: theme.spacing.sm
    }
  }
}));

exports.default = useStyles;
//# sourceMappingURL=Notifications.styles.js.map
