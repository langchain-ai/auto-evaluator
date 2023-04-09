import { useState, useRef, useEffect } from 'react';

function useInterval(fn, interval) {
  const [active, setActive] = useState(false);
  const intervalRef = useRef();
  const fnRef = useRef();
  useEffect(() => {
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

export { useInterval };
//# sourceMappingURL=use-interval.js.map
