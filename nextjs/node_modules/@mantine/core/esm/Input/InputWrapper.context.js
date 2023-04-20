import { useContext, createContext } from 'react';

const InputWrapperContext = createContext({
  offsetBottom: false,
  offsetTop: false,
  describedBy: void 0
});
const InputWrapperProvider = InputWrapperContext.Provider;
const useInputWrapperContext = () => useContext(InputWrapperContext);

export { InputWrapperProvider, useInputWrapperContext };
//# sourceMappingURL=InputWrapper.context.js.map
