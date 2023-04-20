import { useState, useRef, useEffect } from 'react';
import { getLockStyles } from './utils/get-lock-styles.js';
import { injectStyles } from './utils/inject-style-tag.js';
import { insertStyleTag } from './utils/insert-style-tag.js';
import { makeStyleTag } from './utils/make-style-tag.js';

function useScrollLock(lock, options = {
  disableBodyPadding: false
}) {
  const [scrollLocked, setScrollLocked] = useState(lock || false);
  const scrollTop = useRef(0);
  const { disableBodyPadding } = options;
  const stylesheet = useRef(null);
  const lockScroll = () => {
    scrollTop.current = window.scrollY;
    const styles = getLockStyles({ disableBodyPadding });
    const sheet = makeStyleTag();
    injectStyles(sheet, styles);
    insertStyleTag(sheet);
    stylesheet.current = sheet;
  };
  const unlockScroll = () => {
    if (!(stylesheet == null ? void 0 : stylesheet.current))
      return;
    stylesheet.current.parentNode.removeChild(stylesheet.current);
    stylesheet.current = null;
  };
  useEffect(() => {
    if (scrollLocked) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return unlockScroll;
  }, [scrollLocked]);
  useEffect(() => {
    if (lock !== void 0) {
      setScrollLocked(lock);
    }
  }, [lock]);
  useEffect(() => {
    if (lock === void 0 && typeof window !== "undefined") {
      window.document.body.style.overflow === "hidden" && setScrollLocked(true);
    }
  }, [setScrollLocked]);
  return [scrollLocked, setScrollLocked];
}

export { useScrollLock };
//# sourceMappingURL=use-scroll-lock.js.map
