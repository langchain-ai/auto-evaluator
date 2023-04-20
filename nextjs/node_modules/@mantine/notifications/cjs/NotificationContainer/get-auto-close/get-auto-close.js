'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getAutoClose(autoClose, notificationAutoClose) {
  if (typeof notificationAutoClose === "number") {
    return notificationAutoClose;
  }
  if (notificationAutoClose === false || autoClose === false) {
    return false;
  }
  return autoClose;
}

exports.default = getAutoClose;
//# sourceMappingURL=get-auto-close.js.map
