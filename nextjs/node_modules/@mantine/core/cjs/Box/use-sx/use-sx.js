'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styles = require('@mantine/styles');
var getSystemStyles = require('../style-system-props/get-system-styles/get-system-styles.js');

function extractSx(sx, theme) {
  return typeof sx === "function" ? sx(theme) : sx;
}
function useSx(sx, systemProps, className) {
  const theme = styles.useMantineTheme();
  const { css, cx } = styles.useCss();
  if (Array.isArray(sx)) {
    return cx(className, css(getSystemStyles.getSystemStyles(systemProps, theme)), sx.map((partial) => css(extractSx(partial, theme))));
  }
  return cx(className, css(extractSx(sx, theme)), css(getSystemStyles.getSystemStyles(systemProps, theme)));
}

exports.useSx = useSx;
//# sourceMappingURL=use-sx.js.map
