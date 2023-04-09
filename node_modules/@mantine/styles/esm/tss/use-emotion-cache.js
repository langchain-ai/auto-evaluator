import { defaultMantineEmotionCache } from './default-emotion-cache.js';
import { useMantineEmotionCache } from '../theme/MantineProvider.js';

function useEmotionCache() {
  const cache = useMantineEmotionCache();
  return cache || defaultMantineEmotionCache;
}

export { useEmotionCache };
//# sourceMappingURL=use-emotion-cache.js.map
