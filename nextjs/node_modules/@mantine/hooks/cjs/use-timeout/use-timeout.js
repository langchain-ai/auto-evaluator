'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function useTimeout(callback, delay, options = { autoInvoke: false }) {
  const callbackRef = React.useRef(null);
  const timeoutRef = React.useRef(null);
  const start = React.useCallback((...callbackParams) => {
    if (!timeoutRef.current) {
      timeoutRef.current = window.setTimeout(() => {
        callbackRef.current(callbackParams);
        timeoutRef.current = null;
      }, delay);
    }
  }, [delay]);
  const clear = React.useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);
  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  React.useEffect(() => {
    if (options.autoInvoke) {
      start();
    }
    return clear;
  }, [clear, delay, options.autoInvoke, start]);
  return { start, clear };
}

exports.useTimeout = useTimeout;
//# sourceMappingURL=use-timeout.js.map
