'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');

var useStyles = styles.createStyles((theme, { smallerThan, largerThan, query, styles: styles$1 }) => {
  const media = {};
  const minWidth = styles.getSize({ size: largerThan, sizes: theme.breakpoints });
  const maxWidth = styles.getSize({ size: smallerThan, sizes: theme.breakpoints });
  const _styles = typeof styles$1 === "function" ? styles$1(theme) : styles$1;
  if (largerThan !== void 0 && smallerThan !== void 0) {
    media[`@media (min-width: ${styles.em(minWidth)}) and (max-width: ${styles.em(styles.getBreakpointValue(maxWidth) - 1)})`] = _styles;
  } else {
    if (largerThan !== void 0) {
      media[`@media (min-width: ${styles.getSize({ size: largerThan, sizes: theme.breakpoints })})`] = _styles;
    }
    if (smallerThan !== void 0) {
      media[`@media (max-width: ${styles.em(styles.getBreakpointValue(styles.getSize({ size: smallerThan, sizes: theme.breakpoints })) - 1)})`] = _styles;
    }
  }
  if (query) {
    media[`@media ${query}`] = _styles;
  }
  return { media };
});

exports.default = useStyles;
//# sourceMappingURL=MediaQuery.styles.js.map
