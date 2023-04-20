import React from 'react';
import { getSafeId } from '@mantine/utils';
import { useId, useUncontrolled } from '@mantine/hooks';
import { TabsContextProvider } from './Tabs.context.js';
import { TABS_ERRORS } from './Tabs.errors.js';

function TabsProvider({
  defaultValue,
  value,
  onTabChange,
  orientation,
  children,
  loop,
  id,
  activateTabWithKeyboard,
  allowTabDeactivation,
  variant,
  color,
  radius,
  inverted,
  placement,
  keepMounted = true,
  classNames,
  styles,
  unstyled
}) {
  const uid = useId(id);
  const [_value, onChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: null,
    onChange: onTabChange
  });
  return /* @__PURE__ */ React.createElement(TabsContextProvider, {
    value: {
      placement,
      value: _value,
      orientation,
      id: uid,
      loop,
      activateTabWithKeyboard,
      getTabId: getSafeId(`${uid}-tab`, TABS_ERRORS.value),
      getPanelId: getSafeId(`${uid}-panel`, TABS_ERRORS.value),
      onTabChange: onChange,
      allowTabDeactivation,
      variant,
      color,
      radius,
      inverted,
      keepMounted,
      classNames,
      styles,
      unstyled
    }
  }, children);
}
TabsProvider.displayName = "@mantine/core/TabsProvider";

export { TabsProvider };
//# sourceMappingURL=TabsProvider.js.map
