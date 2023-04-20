import { useState, useCallback } from 'react';

function useDisclosure(initialState = false, callbacks) {
  const { onOpen, onClose } = callbacks || {};
  const [opened, setOpened] = useState(initialState);
  const open = useCallback(() => {
    setOpened((isOpened) => {
      if (!isOpened) {
        onOpen == null ? void 0 : onOpen();
        return true;
      }
      return isOpened;
    });
  }, [onOpen]);
  const close = useCallback(() => {
    setOpened((isOpened) => {
      if (isOpened) {
        onClose == null ? void 0 : onClose();
        return false;
      }
      return isOpened;
    });
  }, [onClose]);
  const toggle = useCallback(() => {
    opened ? close() : open();
  }, [close, open, opened]);
  return [opened, { open, close, toggle }];
}

export { useDisclosure };
//# sourceMappingURL=use-disclosure.js.map
