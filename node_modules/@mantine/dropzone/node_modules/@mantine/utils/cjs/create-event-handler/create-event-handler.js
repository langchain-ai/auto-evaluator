'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function createEventHandler(parentEventHandler, eventHandler) {
  return (event) => {
    parentEventHandler == null ? void 0 : parentEventHandler(event);
    eventHandler == null ? void 0 : eventHandler(event);
  };
}

exports.createEventHandler = createEventHandler;
//# sourceMappingURL=create-event-handler.js.map
