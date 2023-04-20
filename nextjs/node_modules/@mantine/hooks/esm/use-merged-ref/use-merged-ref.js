import { useCallback } from 'react';
import { assignRef } from '../utils/assign-ref/assign-ref.js';

function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => assignRef(ref, node));
  };
}
function useMergedRef(...refs) {
  return useCallback(mergeRefs(...refs), refs);
}

export { mergeRefs, useMergedRef };
//# sourceMappingURL=use-merged-ref.js.map
