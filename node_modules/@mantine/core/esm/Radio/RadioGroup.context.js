import { useContext, createContext } from 'react';

const RadioGroupContext = createContext(null);
const RadioGroupProvider = RadioGroupContext.Provider;
const useRadioGroupContext = () => useContext(RadioGroupContext);

export { RadioGroupProvider, useRadioGroupContext };
//# sourceMappingURL=RadioGroup.context.js.map
