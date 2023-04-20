'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const getScrollStart = ({ axis, parent }) => {
  if (!parent && typeof document === "undefined") {
    return 0;
  }
  const method = axis === "y" ? "scrollTop" : "scrollLeft";
  if (parent) {
    return parent[method];
  }
  const { body, documentElement } = document;
  return body[method] + documentElement[method];
};

exports.getScrollStart = getScrollStart;
//# sourceMappingURL=get-scroll-start.js.map
