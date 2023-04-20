import { useContext, createContext } from 'react';

const CheckboxGroupContext = createContext(null);
const CheckboxGroupProvider = CheckboxGroupContext.Provider;
const useCheckboxGroupContext = () => useContext(CheckboxGroupContext);

export { CheckboxGroupProvider, useCheckboxGroupContext };
//# sourceMappingURL=CheckboxGroup.context.js.map
