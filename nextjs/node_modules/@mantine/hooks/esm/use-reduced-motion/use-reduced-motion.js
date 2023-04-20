import { useMediaQuery } from '../use-media-query/use-media-query.js';

function useReducedMotion(initialValue, options) {
  return useMediaQuery("(prefers-reduced-motion: reduce)", initialValue, options);
}

export { useReducedMotion };
//# sourceMappingURL=use-reduced-motion.js.map
