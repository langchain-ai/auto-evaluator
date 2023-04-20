import { findElementAncestor } from '../find-element-ancestor/find-element-ancestor.js';

function getContextItemIndex(elementSelector, parentSelector, node) {
  var _a;
  if (!node) {
    return null;
  }
  return Array.from(((_a = findElementAncestor(node, parentSelector)) == null ? void 0 : _a.querySelectorAll(elementSelector)) || []).findIndex((element) => element === node);
}

export { getContextItemIndex };
//# sourceMappingURL=get-context-item-index.js.map
