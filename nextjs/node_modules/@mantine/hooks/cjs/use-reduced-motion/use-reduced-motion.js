'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var useMediaQuery = require('../use-media-query/use-media-query.js');

function useReducedMotion(initialValue, options) {
  return useMediaQuery.useMediaQuery("(prefers-reduced-motion: reduce)", initialValue, options);
}

exports.useReducedMotion = useReducedMotion;
//# sourceMappingURL=use-reduced-motion.js.map
