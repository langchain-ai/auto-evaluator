import React from 'react';
import { useUncontrolled } from '@mantine/hooks';
import { useComponentDefaultProps } from '@mantine/styles';
import { ChipGroupProvider } from '../ChipGroup.context.js';

const defaultProps = {};
function ChipGroup(props) {
  const { value, defaultValue, onChange, multiple, children } = useComponentDefaultProps("ChipGroup", defaultProps, props);
  const [_value, setValue] = useUncontrolled({
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
  return /* @__PURE__ */ React.createElement(ChipGroupProvider, {
    value: { isChipSelected, onChange: handleChange, multiple }
  }, children);
}
ChipGroup.displayName = "@mantine/core/ChipGroup";

export { ChipGroup };
//# sourceMappingURL=ChipGroup.js.map
