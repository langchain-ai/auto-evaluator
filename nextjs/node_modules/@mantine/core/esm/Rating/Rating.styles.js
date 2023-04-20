import { createStyles } from '@mantine/styles';

var useStyles = createStyles(() => ({
  root: {
    display: "flex",
    width: "max-content"
  },
  symbolGroup: {
    position: "relative",
    transition: "transform 100ms ease",
    '&[data-active="true"]': {
      zIndex: 1,
      transform: "scale(1.2)"
    }
  }
}));

export default useStyles;
//# sourceMappingURL=Rating.styles.js.map
