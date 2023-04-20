'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function useHover() {
  const [hovered, setHovered] = React.useState(false);
  const ref = React.useRef(null);
  const onMouseEnter = React.useCallback(() => setHovered(true), []);
  const onMouseLeave = React.useCallback(() => setHovered(false), []);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mouseenter", onMouseEnter);
      ref.current.addEventListener("mouseleave", onMouseLeave);
      return () => {
        var _a, _b;
        (_a = ref.current) == null ? void 0 : _a.removeEventListener("mouseenter", onMouseEnter);
        (_b = ref.current) == null ? void 0 : _b.removeEventListener("mouseleave", onMouseLeave);
      };
    }
    return void 0;
  }, []);
  return { ref, hovered };
}

exports.useHover = useHover;
//# sourceMappingURL=use-hover.js.map
