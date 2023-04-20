'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var utils = require('@mantine/utils');
var hooks = require('@mantine/hooks');

function FocusTrap({
  children,
  active = true,
  refProp = "ref"
}) {
  const focusTrapRef = hooks.useFocusTrap(active);
  const ref = hooks.useMergedRef(focusTrapRef, children == null ? void 0 : children.ref);
  if (!utils.isElement(children)) {
    return children;
  }
  return React.cloneElement(children, { [refProp]: ref });
}
FocusTrap.displayName = "@mantine/core/FocusTrap";

exports.FocusTrap = FocusTrap;
//# sourceMappingURL=FocusTrap.js.map
