import React from 'react';
import { Checkbox } from '../../Checkbox/Checkbox.js';

const DefaultItem = React.memo(({ data, selected, radius }) => /* @__PURE__ */ React.createElement(Checkbox, {
  checked: selected,
  onChange: () => {
  },
  label: data.label,
  tabIndex: -1,
  radius,
  sx: { pointerEvents: "none" }
}));

export { DefaultItem };
//# sourceMappingURL=DefaultItem.js.map
