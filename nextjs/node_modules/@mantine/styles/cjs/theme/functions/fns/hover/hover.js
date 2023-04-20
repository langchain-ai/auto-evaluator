'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function hover(hoverStyle) {
  return {
    "@media (hover: hover)": {
      "&:hover": hoverStyle
    },
    "@media (hover: none)": {
      "&:active": hoverStyle
    }
  };
}

exports.hover = hover;
//# sourceMappingURL=hover.js.map
