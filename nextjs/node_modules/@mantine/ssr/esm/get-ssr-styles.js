function getSSRStyles(html, server) {
  return server.constructStyleTagsFromChunks(server.extractCriticalToChunks(html));
}

export { getSSRStyles };
//# sourceMappingURL=get-ssr-styles.js.map
