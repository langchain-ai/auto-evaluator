function createEventHandler(parentEventHandler, eventHandler) {
  return (event) => {
    parentEventHandler == null ? void 0 : parentEventHandler(event);
    eventHandler == null ? void 0 : eventHandler(event);
  };
}

export { createEventHandler };
//# sourceMappingURL=create-event-handler.js.map
