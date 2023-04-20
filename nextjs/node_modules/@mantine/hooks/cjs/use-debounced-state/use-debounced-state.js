'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function useDebouncedState(defaultValue, wait, options = { leading: false }) {
  const [value, setValue] = React.useState(defaultValue);
  const timeoutRef = React.useRef(null);
  const leadingRef = React.useRef(true);
  const clearTimeout = () => window.clearTimeout(timeoutRef.current);
  React.useEffect(() => clearTimeout, []);
  const debouncedSetValue = (newValue) => {
    clearTimeout();
    if (leadingRef.current && options.leading) {
      setValue(newValue);
    } else {
      timeoutRef.current = window.setTimeout(() => {
        leadingRef.current = true;
        setValue(newValue);
      }, wait);
    }
    leadingRef.current = false;
  };
  return [value, debouncedSetValue];
}

exports.useDebouncedState = useDebouncedState;
//# sourceMappingURL=use-debounced-state.js.map
