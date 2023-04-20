'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

const InputWrapperContext = React.createContext({
  offsetBottom: false,
  offsetTop: false,
  describedBy: void 0
});
const InputWrapperProvider = InputWrapperContext.Provider;
const useInputWrapperContext = () => React.useContext(InputWrapperContext);

exports.InputWrapperProvider = InputWrapperProvider;
exports.useInputWrapperContext = useInputWrapperContext;
//# sourceMappingURL=InputWrapper.context.js.map
