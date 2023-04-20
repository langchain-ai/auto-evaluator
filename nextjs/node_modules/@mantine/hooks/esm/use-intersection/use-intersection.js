import { useState, useRef, useCallback } from 'react';

function useIntersection(options) {
  const [entry, setEntry] = useState(null);
  const observer = useRef();
  const ref = useCallback((element) => {
    if (observer.current) {
      observer.current.disconnect();
      observer.current = null;
    }
    if (element === null) {
      setEntry(null);
      return;
    }
    observer.current = new IntersectionObserver(([_entry]) => {
      setEntry(_entry);
    }, options);
    observer.current.observe(element);
  }, [options == null ? void 0 : options.rootMargin, options == null ? void 0 : options.root, options == null ? void 0 : options.threshold]);
  return { ref, entry };
}

export { useIntersection };
//# sourceMappingURL=use-intersection.js.map
