import { createStyles, getSize, rem } from '@mantine/styles';

const sizes = {
  xs: rem(320),
  sm: rem(380),
  md: rem(440),
  lg: rem(620),
  xl: rem(780)
};
var useStyles = createStyles((theme, { yOffset, xOffset, centered, fullScreen }, { size }) => ({
  content: {
    flex: fullScreen ? "0 0 100%" : `0 0 ${getSize({ size, sizes })}`,
    maxWidth: "100%",
    maxHeight: fullScreen ? void 0 : `calc(100vh - (${rem(yOffset)} * 2))`,
    height: fullScreen ? "100vh" : void 0,
    borderRadius: fullScreen ? 0 : void 0,
    overflowY: "auto"
  },
  inner: {
    paddingTop: fullScreen ? 0 : yOffset,
    paddingBottom: fullScreen ? 0 : yOffset,
    paddingLeft: fullScreen ? 0 : xOffset,
    paddingRight: fullScreen ? 0 : xOffset,
    display: "flex",
    justifyContent: "center",
    alignItems: centered ? "center" : "flex-start"
  }
}));

export default useStyles;
//# sourceMappingURL=ModalRoot.styles.js.map
