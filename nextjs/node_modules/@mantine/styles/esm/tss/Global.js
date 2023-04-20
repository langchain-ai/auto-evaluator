import React from 'react';
import { Global as Global$1, css } from '@emotion/react';
import { useMantineTheme } from '../theme/MantineProvider.js';

function Global({ styles }) {
  const theme = useMantineTheme();
  return /* @__PURE__ */ React.createElement(Global$1, {
    styles: css(typeof styles === "function" ? styles(theme) : styles)
  });
}

export { Global };
//# sourceMappingURL=Global.js.map
