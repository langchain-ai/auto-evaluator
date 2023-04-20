'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

const TooltipGroupContext = React.createContext(false);
const TooltipGroupProvider = TooltipGroupContext.Provider;
const useTooltipGroupContext = () => React.useContext(TooltipGroupContext);

exports.TooltipGroupProvider = TooltipGroupProvider;
exports.useTooltipGroupContext = useTooltipGroupContext;
//# sourceMappingURL=TooltipGroup.context.js.map
