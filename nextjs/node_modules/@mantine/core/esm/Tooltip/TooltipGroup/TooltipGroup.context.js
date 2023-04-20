import { useContext, createContext } from 'react';

const TooltipGroupContext = createContext(false);
const TooltipGroupProvider = TooltipGroupContext.Provider;
const useTooltipGroupContext = () => useContext(TooltipGroupContext);

export { TooltipGroupProvider, useTooltipGroupContext };
//# sourceMappingURL=TooltipGroup.context.js.map
