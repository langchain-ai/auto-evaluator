'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var findElementAncestor = require('../find-element-ancestor/find-element-ancestor.js');

function getContextItemIndex(elementSelector, parentSelector, node) {
  var _a;
  if (!node) {
    return null;
  }
  return Array.from(((_a = findElementAncestor.findElementAncestor(node, parentSelector)) == null ? void 0 : _a.querySelectorAll(elementSelector)) || []).findIndex((element) => element === node);
}

exports.getContextItemIndex = getContextItemIndex;
//# sourceMappingURL=get-context-item-index.js.map
