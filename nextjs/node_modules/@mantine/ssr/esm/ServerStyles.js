import React from 'react';
import htmlReactParser from 'html-react-parser';
import { getSSRStyles } from './get-ssr-styles.js';

function ServerStyles({ html, server }) {
  const styles = getSSRStyles(html, server);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, htmlReactParser(styles));
}

export { ServerStyles };
//# sourceMappingURL=ServerStyles.js.map
