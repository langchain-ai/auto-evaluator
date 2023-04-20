'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var tabbable = require('./tabbable.js');
var scopeTab = require('./scope-tab.js');
var createAriaHider = require('./create-aria-hider.js');

function useFocusTrap(active = true) {
  const ref = React.useRef();
  const restoreAria = React.useRef(null);
  const focusNode = (node) => {
    let focusElement = node.querySelector("[data-autofocus]");
    if (!focusElement) {
      const children = Array.from(node.querySelectorAll(tabbable.FOCUS_SELECTOR));
      focusElement = children.find(tabbable.tabbable) || children.find(tabbable.focusable) || null;
      if (!focusElement && tabbable.focusable(node))
        focusElement = node;
    }
    if (focusElement) {
      focusElement.focus({ preventScroll: true });
    } else if (process.env.NODE_ENV === "development") {
      console.warn("[@mantine/hooks/use-focus-trap] Failed to find focusable element within provided node", node);
    }
  };
  const setRef = React.useCallback((node) => {
    if (!active) {
      return;
    }
    if (node === null) {
      if (restoreAria.current) {
        restoreAria.current();
        restoreAria.current = null;
      }
      return;
    }
    restoreAria.current = createAriaHider.createAriaHider(node);
    if (ref.current === node) {
      return;
    }
    if (node) {
      setTimeout(() => {
        if (node.getRootNode()) {
          focusNode(node);
        } else if (process.env.NODE_ENV === "development") {
          console.warn("[@mantine/hooks/use-focus-trap] Ref node is not part of the dom", node);
        }
      });
      ref.current = node;
    } else {
      ref.current = null;
    }
  }, [active]);
  React.useEffect(() => {
    if (!active) {
      return void 0;
    }
    ref.current && setTimeout(() => focusNode(ref.current));
    const handleKeyDown = (event) => {
      if (event.key === "Tab" && ref.current) {
        scopeTab.scopeTab(ref.current, event);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (restoreAria.current) {
        restoreAria.current();
      }
    };
  }, [active]);
  return setRef;
}

exports.useFocusTrap = useFocusTrap;
//# sourceMappingURL=use-focus-trap.js.map
