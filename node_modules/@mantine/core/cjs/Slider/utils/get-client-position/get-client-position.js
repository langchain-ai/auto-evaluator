'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getClientPosition(event) {
  if ("TouchEvent" in window && event instanceof window.TouchEvent) {
    const touch = event.touches[0];
    return touch.clientX;
  }
  return event.clientX;
}

exports.getClientPosition = getClientPosition;
//# sourceMappingURL=get-client-position.js.map
