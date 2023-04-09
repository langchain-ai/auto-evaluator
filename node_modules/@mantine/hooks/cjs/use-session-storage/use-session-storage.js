'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var createStorage = require('../use-local-storage/create-storage.js');

function useSessionStorage(props) {
  return createStorage.createStorage("sessionStorage", "use-session-storage")(props);
}

exports.useSessionStorage = useSessionStorage;
//# sourceMappingURL=use-session-storage.js.map
