'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function useEventListener(type, listener, options) {
  const ref = React.useRef();
  React.useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener(type, listener, options);
      return () => {
        var _a;
        return (_a = ref.current) == null ? void 0 : _a.removeEventListener(type, listener, options);
      };
    }
    return void 0;
  }, [listener, options]);
  return ref;
}

exports.useEventListener = useEventListener;
//# sourceMappingURL=use-event-listener.js.map
