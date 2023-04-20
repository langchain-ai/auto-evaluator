'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var useMediaQuery = require('../use-media-query/use-media-query.js');

function useColorScheme(initialValue, options) {
  return useMediaQuery.useMediaQuery("(prefers-color-scheme: dark)", initialValue === "dark", options) ? "dark" : "light";
}

exports.useColorScheme = useColorScheme;
//# sourceMappingURL=use-color-scheme.js.map
