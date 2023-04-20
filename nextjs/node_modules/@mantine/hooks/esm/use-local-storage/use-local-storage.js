import { createStorage } from './create-storage.js';

function useLocalStorage(props) {
  return createStorage("localStorage", "use-local-storage")(props);
}

export { useLocalStorage };
//# sourceMappingURL=use-local-storage.js.map
