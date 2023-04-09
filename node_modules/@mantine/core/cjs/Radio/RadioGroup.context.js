'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

const RadioGroupContext = React.createContext(null);
const RadioGroupProvider = RadioGroupContext.Provider;
const useRadioGroupContext = () => React.useContext(RadioGroupContext);

exports.RadioGroupProvider = RadioGroupProvider;
exports.useRadioGroupContext = useRadioGroupContext;
//# sourceMappingURL=RadioGroup.context.js.map
