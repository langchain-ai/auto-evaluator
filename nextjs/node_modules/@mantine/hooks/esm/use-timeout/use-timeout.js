import { useRef, useCallback, useEffect } from 'react';

function useTimeout(callback, delay, options = { autoInvoke: false }) {
  const callbackRef = useRef(null);
  const timeoutRef = useRef(null);
  const start = useCallback((...callbackParams) => {
    if (!timeoutRef.current) {
      timeoutRef.current = window.setTimeout(() => {
        callbackRef.current(callbackParams);
        timeoutRef.current = null;
      }, delay);
    }
  }, [delay]);
  const clear = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  useEffect(() => {
    if (options.autoInvoke) {
      start();
    }
    return clear;
  }, [clear, delay, options.autoInvoke, start]);
  return { start, clear };
}

export { useTimeout };
//# sourceMappingURL=use-timeout.js.map
