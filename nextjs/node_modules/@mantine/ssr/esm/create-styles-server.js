import createEmotionServer from '@emotion/server/create-instance';
import { defaultMantineEmotionCache } from '@mantine/styles';

function createStylesServer(cache) {
  return createEmotionServer(cache || defaultMantineEmotionCache);
}

export { createStylesServer };
//# sourceMappingURL=create-styles-server.js.map
