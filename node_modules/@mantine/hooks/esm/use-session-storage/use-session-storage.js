import { createStorage } from '../use-local-storage/create-storage.js';

function useSessionStorage(props) {
  return createStorage("sessionStorage", "use-session-storage")(props);
}

export { useSessionStorage };
//# sourceMappingURL=use-session-storage.js.map
