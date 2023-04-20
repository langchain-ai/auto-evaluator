'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var assignRef = require('../utils/assign-ref/assign-ref.js');

function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => assignRef.assignRef(ref, node));
  };
}
function useMergedRef(...refs) {
  return React.useCallback(mergeRefs(...refs), refs);
}

exports.mergeRefs = mergeRefs;
exports.useMergedRef = useMergedRef;
//# sourceMappingURL=use-merged-ref.js.map
