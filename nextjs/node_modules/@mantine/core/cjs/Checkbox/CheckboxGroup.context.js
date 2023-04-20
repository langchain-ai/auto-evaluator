'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

const CheckboxGroupContext = React.createContext(null);
const CheckboxGroupProvider = CheckboxGroupContext.Provider;
const useCheckboxGroupContext = () => React.useContext(CheckboxGroupContext);

exports.CheckboxGroupProvider = CheckboxGroupProvider;
exports.useCheckboxGroupContext = useCheckboxGroupContext;
//# sourceMappingURL=CheckboxGroup.context.js.map
