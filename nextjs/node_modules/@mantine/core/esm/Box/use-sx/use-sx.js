import { useMantineTheme, useCss } from '@mantine/styles';
import { getSystemStyles } from '../style-system-props/get-system-styles/get-system-styles.js';

function extractSx(sx, theme) {
  return typeof sx === "function" ? sx(theme) : sx;
}
function useSx(sx, systemProps, className) {
  const theme = useMantineTheme();
  const { css, cx } = useCss();
  if (Array.isArray(sx)) {
    return cx(className, css(getSystemStyles(systemProps, theme)), sx.map((partial) => css(extractSx(partial, theme))));
  }
  return cx(className, css(extractSx(sx, theme)), css(getSystemStyles(systemProps, theme)));
}

export { useSx };
//# sourceMappingURL=use-sx.js.map
