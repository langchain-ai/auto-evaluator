'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

var useStyles = styles.createStyles((theme, { color, radius, withTitle }) => {
  const _radius = theme.fn.radius(radius);
  const colors = theme.fn.variant({ variant: "filled", color });
  return {
    closeButton: theme.fn.hover({
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0]
    }),
    icon: {
      boxSizing: "border-box",
      marginRight: theme.spacing.md,
      width: styles.rem(28),
      height: styles.rem(28),
      borderRadius: styles.rem(28),
      display: "flex",
      flex: "none",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
      color: theme.white
    },
    root: {
      overflow: "hidden",
      boxSizing: "border-box",
      position: "relative",
      display: "flex",
      alignItems: "center",
      paddingLeft: styles.rem(22),
      paddingRight: theme.spacing.xs,
      paddingTop: theme.spacing.xs,
      paddingBottom: theme.spacing.xs,
      borderRadius: _radius,
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
      boxShadow: theme.shadows.lg,
      border: `${styles.rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]}`,
      "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        width: styles.rem(6),
        top: _radius,
        bottom: _radius,
        left: styles.rem(4),
        borderRadius: _radius,
        backgroundColor: colors.background
      },
      "&[data-with-icon]": {
        paddingLeft: theme.spacing.xs,
        "&::before": {
          display: "none"
        }
      }
    },
    body: {
      flex: 1,
      overflow: "hidden",
      marginRight: theme.spacing.xs
    },
    loader: {
      marginRight: theme.spacing.md
    },
    title: {
      lineHeight: 1.4,
      marginBottom: styles.rem(2),
      overflow: "hidden",
      textOverflow: "ellipsis",
      color: theme.colorScheme === "dark" ? theme.white : theme.colors.gray[9]
    },
    description: {
      color: withTitle ? theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6] : theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      lineHeight: 1.4,
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  };
});

exports.default = useStyles;
//# sourceMappingURL=Notification.styles.js.map
