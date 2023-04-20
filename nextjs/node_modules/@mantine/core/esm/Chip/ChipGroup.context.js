import { useContext, createContext } from 'react';

const ChipGroupContext = createContext(null);
const ChipGroupProvider = ChipGroupContext.Provider;
const useChipGroup = () => useContext(ChipGroupContext);

export { ChipGroupProvider, useChipGroup };
//# sourceMappingURL=ChipGroup.context.js.map
