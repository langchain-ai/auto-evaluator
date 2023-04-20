import { useMediaQuery } from '../use-media-query/use-media-query.js';

function useColorScheme(initialValue, options) {
  return useMediaQuery("(prefers-color-scheme: dark)", initialValue === "dark", options) ? "dark" : "light";
}

export { useColorScheme };
//# sourceMappingURL=use-color-scheme.js.map
