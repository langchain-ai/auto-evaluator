'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const getInputMode = (step, precision, os) => {
  if (Number.isInteger(step) && step >= 0 && precision === 0)
    return "numeric";
  if (!Number.isInteger(step) && step >= 0 && precision !== 0)
    return "decimal";
  if (Number.isInteger(step) && step < 0 && precision === 0) {
    if (os === "ios")
      return "text";
    return "decimal";
  }
  if (!Number.isInteger(step) && step < 0 && precision !== 0) {
    if (os === "ios")
      return "text";
    return "decimal";
  }
  return "numeric";
};

exports.getInputMode = getInputMode;
//# sourceMappingURL=get-input-mode.js.map
