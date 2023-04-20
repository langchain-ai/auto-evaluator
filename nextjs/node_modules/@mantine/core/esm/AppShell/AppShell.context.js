import { createContext, useContext } from 'react';

const AppShellContext = createContext({
  zIndex: 1e3,
  fixed: false,
  layout: "default"
});
const AppShellProvider = AppShellContext.Provider;
function useAppShellContext() {
  return useContext(AppShellContext);
}

export { AppShellProvider, useAppShellContext };
//# sourceMappingURL=AppShell.context.js.map
