'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('@mantine/hooks');
var styles = require('@mantine/styles');
var ChipGroup_context = require('../ChipGroup.context.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const defaultProps = {};
function ChipGroup(props) {
  const { value, defaultValue, onChange, multiple, children } = styles.useComponentDefaultProps("ChipGroup", defaultProps, props);
  const [_value, setValue] = hooks.useUncontrolled({
    value,
    defaultValue,
    finalValue: multiple ? [] : null,
    onChange
  });
  const isChipSelected = (val) => Array.isArray(_value) ? _value.includes(val) : val === _value;
  const handleChange = (event) => {
    const val = event.currentTarget.value;
    if (Array.isArray(_value)) {
      setValue(_value.includes(val) ? _value.filter((v) => v !== val) : [..._value, val]);
    } else {
      setValue(val);
    }
  };
  return /* @__PURE__ */ React__default.createElement(ChipGroup_context.ChipGroupProvider, {
    value: { isChipSelected, onChange: handleChange, multiple }
  }, children);
}
ChipGroup.displayName = "@mantine/core/ChipGroup";

exports.ChipGroup = ChipGroup;
//# sourceMappingURL=ChipGroup.js.map
