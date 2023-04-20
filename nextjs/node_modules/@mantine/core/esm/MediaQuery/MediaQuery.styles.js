import { createStyles, getSize, em, getBreakpointValue } from '@mantine/styles';

var useStyles = createStyles((theme, { smallerThan, largerThan, query, styles }) => {
  const media = {};
  const minWidth = getSize({ size: largerThan, sizes: theme.breakpoints });
  const maxWidth = getSize({ size: smallerThan, sizes: theme.breakpoints });
  const _styles = typeof styles === "function" ? styles(theme) : styles;
  if (largerThan !== void 0 && smallerThan !== void 0) {
    media[`@media (min-width: ${em(minWidth)}) and (max-width: ${em(getBreakpointValue(maxWidth) - 1)})`] = _styles;
  } else {
    if (largerThan !== void 0) {
      media[`@media (min-width: ${getSize({ size: largerThan, sizes: theme.breakpoints })})`] = _styles;
    }
    if (smallerThan !== void 0) {
      media[`@media (max-width: ${em(getBreakpointValue(getSize({ size: smallerThan, sizes: theme.breakpoints })) - 1)})`] = _styles;
    }
  }
  if (query) {
    media[`@media ${query}`] = _styles;
  }
  return { media };
});

export default useStyles;
//# sourceMappingURL=MediaQuery.styles.js.map
