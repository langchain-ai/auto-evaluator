'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

const ChipGroupContext = React.createContext(null);
const ChipGroupProvider = ChipGroupContext.Provider;
const useChipGroup = () => React.useContext(ChipGroupContext);

exports.ChipGroupProvider = ChipGroupProvider;
exports.useChipGroup = useChipGroup;
//# sourceMappingURL=ChipGroup.context.js.map
