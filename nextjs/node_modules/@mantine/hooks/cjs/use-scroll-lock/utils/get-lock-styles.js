'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var getScrollWidth = require('./get-scroll-width.js');

const getLockStyles = ({ disableBodyPadding }) => {
  const scrollWidth = disableBodyPadding ? null : getScrollWidth.getScrollWidth();
  const styles = `body {
        --removed-scroll-width: ${scrollWidth}px;
        touch-action: none;
        overflow: hidden !important;
        position: relative !important;
        ${scrollWidth ? "padding-right: var(--removed-scroll-width) !important;" : ""}
        `;
  return styles;
};

exports.getLockStyles = getLockStyles;
//# sourceMappingURL=get-lock-styles.js.map
