import { createStyles } from '@mantine/styles';

var useStyles = createStyles((_theme, { orientation }) => ({
  panel: {
    flex: orientation === "vertical" ? 1 : void 0
  }
}));

export default useStyles;
//# sourceMappingURL=TabsPanel.styles.js.map
