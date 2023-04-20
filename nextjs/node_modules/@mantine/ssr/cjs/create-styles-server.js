'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var createEmotionServer = require('@emotion/server/create-instance');
var styles = require('@mantine/styles');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var createEmotionServer__default = /*#__PURE__*/_interopDefaultLegacy(createEmotionServer);

function createStylesServer(cache) {
  return createEmotionServer__default(cache || styles.defaultMantineEmotionCache);
}

exports.createStylesServer = createStylesServer;
//# sourceMappingURL=create-styles-server.js.map
