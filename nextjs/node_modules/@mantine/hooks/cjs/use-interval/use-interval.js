'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function useInterval(fn, interval) {
  const [active, setActive] = React.useState(false);
  const intervalRef = React.useRef();
  const fnRef = React.useRef();
  React.useEffect(() => {
    fnRef.current = fn;
  }, [fn]);
  const start = () => {
    setActive((old) => {
      if (!old && !intervalRef.current) {
        intervalRef.current = window.setInterval(fnRef.current, interval);
      }
      return true;
    });
  };
  const stop = () => {
    setActive(false);
    window.clearInterval(intervalRef.current);
    intervalRef.current = void 0;
  };
  const toggle = () => {
    if (active) {
      stop();
    } else {
      start();
    }
  };
  return { start, stop, toggle, active };
}

exports.useInterval = useInterval;
//# sourceMappingURL=use-interval.js.map
