import { useContext, createContext } from 'react';

const SwitchGroupContext = createContext(null);
const SwitchGroupProvider = SwitchGroupContext.Provider;
const useSwitchGroupContext = () => useContext(SwitchGroupContext);

export { SwitchGroupProvider, useSwitchGroupContext };
//# sourceMappingURL=SwitchGroup.context.js.map
