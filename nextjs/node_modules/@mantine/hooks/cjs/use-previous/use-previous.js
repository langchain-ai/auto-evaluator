'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

exports.usePrevious = usePrevious;
//# sourceMappingURL=use-previous.js.map
