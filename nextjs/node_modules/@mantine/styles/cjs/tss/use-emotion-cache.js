'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var defaultEmotionCache = require('./default-emotion-cache.js');
var MantineProvider = require('../theme/MantineProvider.js');

function useEmotionCache() {
  const cache = MantineProvider.useMantineEmotionCache();
  return cache || defaultEmotionCache.defaultMantineEmotionCache;
}

exports.useEmotionCache = useEmotionCache;
//# sourceMappingURL=use-emotion-cache.js.map
