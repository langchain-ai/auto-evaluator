'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function usePageLeave(onPageLeave) {
  React.useEffect(() => {
    document.documentElement.addEventListener("mouseleave", onPageLeave);
    return () => document.documentElement.removeEventListener("mouseleave", onPageLeave);
  }, []);
}

exports.usePageLeave = usePageLeave;
//# sourceMappingURL=use-page-leave.js.map
