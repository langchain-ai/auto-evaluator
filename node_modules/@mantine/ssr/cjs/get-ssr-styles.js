'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getSSRStyles(html, server) {
  return server.constructStyleTagsFromChunks(server.extractCriticalToChunks(html));
}

exports.getSSRStyles = getSSRStyles;
//# sourceMappingURL=get-ssr-styles.js.map
