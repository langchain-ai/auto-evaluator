'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

const ITEM_PADDING = styles.rem(7);
var useStyles = styles.createStyles((theme, { reversed, native, radius }) => {
  const _radius = styles.rem(theme.fn.radius(radius));
  return {
    transferList: {
      flex: 1,
      display: "flex",
      flexDirection: "column"
    },
    transferListItem: {
      display: "block",
      width: `calc(100% - (${ITEM_PADDING} * 2))`,
      padding: ITEM_PADDING,
      marginLeft: `calc(${theme.spacing.sm} - ${ITEM_PADDING})`,
      marginRight: `calc(${theme.spacing.sm} - ${ITEM_PADDING})`,
      borderRadius: theme.fn.radius(radius),
      "&:first-of-type": {
        marginTop: `calc(${theme.spacing.sm} - ${ITEM_PADDING})`
      },
      "&:last-of-type": {
        marginBottom: `calc(${theme.spacing.sm} - ${ITEM_PADDING})`
      }
    },
    transferListItemHovered: {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
    },
    transferListItems: {
      overflow: native ? "auto" : "hidden"
    },
    transferListHeader: {
      display: "flex",
      flexDirection: reversed ? "row-reverse" : "row"
    },
    transferListBody: {
      flex: 1,
      borderRadius: theme.fn.radius(radius),
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      border: `${styles.rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]}`
    },
    transferListTitle: {
      marginBottom: styles.rem(5)
    },
    transferListSearch: {
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderTopLeftRadius: reversed ? 0 : `calc(${_radius} - ${styles.rem(1)})`,
      borderTopRightRadius: reversed ? `calc(${_radius} - ${styles.rem(1)})` : 0,
      display: "block",
      borderBottomColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]
    },
    transferListControl: {
      borderTop: 0,
      borderRightWidth: reversed ? void 0 : 0,
      borderLeftWidth: reversed ? 0 : void 0,
      borderColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4],
      "&:last-of-type": {
        borderTopLeftRadius: reversed ? `calc(${_radius} - ${styles.rem(1)})` : 0,
        borderTopRightRadius: reversed ? 0 : `calc(${_radius} - ${styles.rem(1)})`
      },
      "&:disabled": {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : "transparent",
        borderColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]
      }
    },
    separator: {
      boxSizing: "border-box",
      textAlign: "left",
      width: "100%",
      padding: `${styles.rem(7)} ${styles.rem(12)}`
    },
    separatorLabel: {
      color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[5]
    }
  };
});

exports.default = useStyles;
//# sourceMappingURL=RenderList.styles.js.map
