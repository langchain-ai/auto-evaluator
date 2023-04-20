'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function useDisclosure(initialState = false, callbacks) {
  const { onOpen, onClose } = callbacks || {};
  const [opened, setOpened] = React.useState(initialState);
  const open = React.useCallback(() => {
    setOpened((isOpened) => {
      if (!isOpened) {
        onOpen == null ? void 0 : onOpen();
        return true;
      }
      return isOpened;
    });
  }, [onOpen]);
  const close = React.useCallback(() => {
    setOpened((isOpened) => {
      if (isOpened) {
        onClose == null ? void 0 : onClose();
        return false;
      }
      return isOpened;
    });
  }, [onClose]);
  const toggle = React.useCallback(() => {
    opened ? close() : open();
  }, [close, open, opened]);
  return [opened, { open, close, toggle }];
}

exports.useDisclosure = useDisclosure;
//# sourceMappingURL=use-disclosure.js.map
