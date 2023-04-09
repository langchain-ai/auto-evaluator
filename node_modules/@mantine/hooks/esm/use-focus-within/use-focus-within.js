import { useRef, useState, useEffect } from 'react';

function containsRelatedTarget(event) {
  if (event.currentTarget instanceof HTMLElement && event.relatedTarget instanceof HTMLElement) {
    return event.currentTarget.contains(event.relatedTarget);
  }
  return false;
}
function useFocusWithin({
  onBlur,
  onFocus
} = {}) {
  const ref = useRef();
  const [focused, _setFocused] = useState(false);
  const focusedRef = useRef(false);
  const setFocused = (value) => {
    _setFocused(value);
    focusedRef.current = value;
  };
  const handleFocusIn = (event) => {
    if (!focusedRef.current) {
      setFocused(true);
      onFocus == null ? void 0 : onFocus(event);
    }
  };
  const handleFocusOut = (event) => {
    if (focusedRef.current && !containsRelatedTarget(event)) {
      setFocused(false);
      onBlur == null ? void 0 : onBlur(event);
    }
  };
  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("focusin", handleFocusIn);
      ref.current.addEventListener("focusout", handleFocusOut);
      return () => {
        var _a, _b;
        (_a = ref.current) == null ? void 0 : _a.removeEventListener("focusin", handleFocusIn);
        (_b = ref.current) == null ? void 0 : _b.removeEventListener("focusout", handleFocusOut);
      };
    }
    return void 0;
  }, [handleFocusIn, handleFocusOut]);
  return { ref, focused };
}

export { useFocusWithin };
//# sourceMappingURL=use-focus-within.js.map
