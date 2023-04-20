import { createStyles } from '@mantine/styles';

var useStyles = createStyles((_theme, { zIndex }) => ({
  inner: {
    position: "fixed",
    width: "100%",
    top: 0,
    bottom: 0,
    maxHeight: "100%",
    zIndex,
    pointerEvents: "none"
  },
  content: {
    pointerEvents: "all"
  }
}));

export default useStyles;
//# sourceMappingURL=ModalBaseContent.styles.js.map
