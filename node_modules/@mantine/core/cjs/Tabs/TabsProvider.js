'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var utils = require('@mantine/utils');
var hooks = require('@mantine/hooks');
var Tabs_context = require('./Tabs.context.js');
var Tabs_errors = require('./Tabs.errors.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
  const uid = hooks.useId(id);
  const [_value, onChange] = hooks.useUncontrolled({
    value,
    defaultValue,
    finalValue: null,
    onChange: onTabChange
  });
  return /* @__PURE__ */ React__default.createElement(Tabs_context.TabsContextProvider, {
    value: {
      placement,
      value: _value,
      orientation,
      id: uid,
      loop,
      activateTabWithKeyboard,
      getTabId: utils.getSafeId(`${uid}-tab`, Tabs_errors.TABS_ERRORS.value),
      getPanelId: utils.getSafeId(`${uid}-panel`, Tabs_errors.TABS_ERRORS.value),
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

exports.TabsProvider = TabsProvider;
//# sourceMappingURL=TabsProvider.js.map
