'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var utils = require('@mantine/utils');
var hooks = require('@mantine/hooks');
var Accordion_context = require('./Accordion.context.js');
var Accordion_errors = require('./Accordion.errors.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function AccordionProvider({
  children,
  multiple,
  value,
  defaultValue,
  onChange,
  id,
  loop,
  transitionDuration,
  disableChevronRotation,
  chevronPosition,
  chevronSize,
  order,
  chevron,
  variant,
  radius,
  classNames,
  styles,
  unstyled
}) {
  const uid = hooks.useId(id);
  const [_value, handleChange] = hooks.useUncontrolled({
    value,
    defaultValue,
    finalValue: multiple ? [] : null,
    onChange
  });
  const isItemActive = (itemValue) => Array.isArray(_value) ? _value.includes(itemValue) : itemValue === _value;
  const handleItemChange = (itemValue) => {
    const nextValue = Array.isArray(_value) ? _value.includes(itemValue) ? _value.filter((selectedValue) => selectedValue !== itemValue) : [..._value, itemValue] : itemValue === _value ? null : itemValue;
    handleChange(nextValue);
  };
  return /* @__PURE__ */ React__default.createElement(Accordion_context.AccordionContextProvider, {
    value: {
      isItemActive,
      onChange: handleItemChange,
      getControlId: utils.getSafeId(`${uid}-control`, Accordion_errors.ACCORDION_ERRORS.value),
      getRegionId: utils.getSafeId(`${uid}-panel`, Accordion_errors.ACCORDION_ERRORS.value),
      transitionDuration,
      disableChevronRotation,
      chevronPosition,
      chevronSize,
      order,
      chevron,
      loop,
      variant,
      radius,
      classNames,
      styles,
      unstyled
    }
  }, children);
}

exports.AccordionProvider = AccordionProvider;
//# sourceMappingURL=AccordionProvider.js.map
