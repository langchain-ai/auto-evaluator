'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var Checkbox = require('../../Checkbox/Checkbox.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const DefaultItem = React__default.memo(({ data, selected, radius }) => /* @__PURE__ */ React__default.createElement(Checkbox.Checkbox, {
  checked: selected,
  onChange: () => {
  },
  label: data.label,
  tabIndex: -1,
  radius,
  sx: { pointerEvents: "none" }
}));

exports.DefaultItem = DefaultItem;
//# sourceMappingURL=DefaultItem.js.map
