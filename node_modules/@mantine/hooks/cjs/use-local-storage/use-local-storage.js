'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var createStorage = require('./create-storage.js');

function useLocalStorage(props) {
  return createStorage.createStorage("localStorage", "use-local-storage")(props);
}

exports.useLocalStorage = useLocalStorage;
//# sourceMappingURL=use-local-storage.js.map
