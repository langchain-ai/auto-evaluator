import { createStyles } from '@mantine/styles';

var useStyles = createStyles((theme, { transitionDuration }) => ({
  control: {},
  root: {
    position: "relative"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    transitionProperty: "max-height",
    transitionTimingFunction: theme.transitionTimingFunction,
    transitionDuration: `${transitionDuration}ms`,
    "@media (prefers-reduced-motion)": {
      transitionDuration: theme.respectReducedMotion ? "0ms" : void 0
    }
  }
}));

export default useStyles;
//# sourceMappingURL=Spoiler.styles.js.map
