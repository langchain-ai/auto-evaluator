import React from 'react';
import { getSafeId } from '@mantine/utils';
import { useId, useUncontrolled } from '@mantine/hooks';
import { AccordionContextProvider } from './Accordion.context.js';
import { ACCORDION_ERRORS } from './Accordion.errors.js';

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
  const uid = useId(id);
  const [_value, handleChange] = useUncontrolled({
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
  return /* @__PURE__ */ React.createElement(AccordionContextProvider, {
    value: {
      isItemActive,
      onChange: handleItemChange,
      getControlId: getSafeId(`${uid}-control`, ACCORDION_ERRORS.value),
      getRegionId: getSafeId(`${uid}-panel`, ACCORDION_ERRORS.value),
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

export { AccordionProvider };
//# sourceMappingURL=AccordionProvider.js.map
