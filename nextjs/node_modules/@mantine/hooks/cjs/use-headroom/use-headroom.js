'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var useWindowScroll = require('../use-window-scroll/use-window-scroll.js');
var useIsomorphicEffect = require('../use-isomorphic-effect/use-isomorphic-effect.js');

const isFixed = (current, fixedAt) => current <= fixedAt;
const isPinned = (current, previous) => current <= previous;
const isReleased = (current, previous, fixedAt) => !isPinned(current, previous) && !isFixed(current, fixedAt);
function useHeadroom({ fixedAt = 0, onPin, onFix, onRelease } = {}) {
  const scrollRef = React.useRef(0);
  const [{ y: scrollPosition }] = useWindowScroll.useWindowScroll();
  useIsomorphicEffect.useIsomorphicEffect(() => {
    if (isPinned(scrollPosition, scrollRef.current)) {
      onPin == null ? void 0 : onPin();
    }
  }, [scrollPosition, onPin]);
  useIsomorphicEffect.useIsomorphicEffect(() => {
    if (isFixed(scrollPosition, fixedAt)) {
      onFix == null ? void 0 : onFix();
    }
  }, [scrollPosition, fixedAt, onFix]);
  useIsomorphicEffect.useIsomorphicEffect(() => {
    if (isReleased(scrollPosition, scrollRef.current, fixedAt)) {
      onRelease == null ? void 0 : onRelease();
    }
  }, [scrollPosition, onRelease]);
  useIsomorphicEffect.useIsomorphicEffect(() => {
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

exports.isFixed = isFixed;
exports.isPinned = isPinned;
exports.isReleased = isReleased;
exports.useHeadroom = useHeadroom;
//# sourceMappingURL=use-headroom.js.map
