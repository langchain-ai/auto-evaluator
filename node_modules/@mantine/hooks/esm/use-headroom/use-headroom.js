import { useRef } from 'react';
import { useWindowScroll } from '../use-window-scroll/use-window-scroll.js';
import { useIsomorphicEffect } from '../use-isomorphic-effect/use-isomorphic-effect.js';

const isFixed = (current, fixedAt) => current <= fixedAt;
const isPinned = (current, previous) => current <= previous;
const isReleased = (current, previous, fixedAt) => !isPinned(current, previous) && !isFixed(current, fixedAt);
function useHeadroom({ fixedAt = 0, onPin, onFix, onRelease } = {}) {
  const scrollRef = useRef(0);
  const [{ y: scrollPosition }] = useWindowScroll();
  useIsomorphicEffect(() => {
    if (isPinned(scrollPosition, scrollRef.current)) {
      onPin == null ? void 0 : onPin();
    }
  }, [scrollPosition, onPin]);
  useIsomorphicEffect(() => {
    if (isFixed(scrollPosition, fixedAt)) {
      onFix == null ? void 0 : onFix();
    }
  }, [scrollPosition, fixedAt, onFix]);
  useIsomorphicEffect(() => {
    if (isReleased(scrollPosition, scrollRef.current, fixedAt)) {
      onRelease == null ? void 0 : onRelease();
    }
  }, [scrollPosition, onRelease]);
  useIsomorphicEffect(() => {
    scrollRef.current = window.scrollY;
  }, [scrollPosition]);
  if (isPinned(scrollPosition, scrollRef.current)) {
    return true;
  }
  if (isFixed(scrollPosition, fixedAt)) {
    return true;
  }
  return false;
}

export { isFixed, isPinned, isReleased, useHeadroom };
//# sourceMappingURL=use-headroom.js.map
