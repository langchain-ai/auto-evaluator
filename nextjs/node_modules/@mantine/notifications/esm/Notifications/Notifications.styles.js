import { createStyles } from '@mantine/core';

var useStyles = createStyles((theme, { zIndex }) => ({
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

export default useStyles;
//# sourceMappingURL=Notifications.styles.js.map
