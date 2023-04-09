'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

const SwitchGroupContext = React.createContext(null);
const SwitchGroupProvider = SwitchGroupContext.Provider;
const useSwitchGroupContext = () => React.useContext(SwitchGroupContext);

exports.SwitchGroupProvider = SwitchGroupProvider;
exports.useSwitchGroupContext = useSwitchGroupContext;
//# sourceMappingURL=SwitchGroup.context.js.map
