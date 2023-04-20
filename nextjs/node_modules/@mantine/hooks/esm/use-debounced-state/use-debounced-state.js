import { useState, useRef, useEffect } from 'react';

function useDebouncedState(defaultValue, wait, options = { leading: false }) {
  const [value, setValue] = useState(defaultValue);
  const timeoutRef = useRef(null);
  const leadingRef = useRef(true);
  const clearTimeout = () => window.clearTimeout(timeoutRef.current);
  useEffect(() => clearTimeout, []);
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

export { useDebouncedState };
//# sourceMappingURL=use-debounced-state.js.map
