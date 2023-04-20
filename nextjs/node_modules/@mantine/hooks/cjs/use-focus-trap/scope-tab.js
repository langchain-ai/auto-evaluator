'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tabbable = require('./tabbable.js');

function scopeTab(node, event) {
  const tabbable$1 = tabbable.findTabbableDescendants(node);
  if (!tabbable$1.length) {
    event.preventDefault();
    return;
  }
  const finalTabbable = tabbable$1[event.shiftKey ? 0 : tabbable$1.length - 1];
  const root = node.getRootNode();
  const leavingFinalTabbable = finalTabbable === root.activeElement || node === root.activeElement;
  if (!leavingFinalTabbable) {
    return;
  }
  event.preventDefault();
  const target = tabbable$1[event.shiftKey ? tabbable$1.length - 1 : 0];
  if (target) {
    target.focus();
  }
}

exports.scopeTab = scopeTab;
//# sourceMappingURL=scope-tab.js.map
