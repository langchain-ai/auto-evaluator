'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function injectStyles(tag, css) {
  if (tag.styleSheet) {
    tag.styleSheet.cssText = css;
  } else {
    tag.appendChild(document.createTextNode(css));
  }
}

exports.injectStyles = injectStyles;
//# sourceMappingURL=inject-style-tag.js.map
