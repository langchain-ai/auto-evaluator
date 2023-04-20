'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function assignRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (typeof ref === "object" && ref !== null && "current" in ref) {
    ref.current = value;
  }
}

exports.assignRef = assignRef;
//# sourceMappingURL=assign-ref.js.map
