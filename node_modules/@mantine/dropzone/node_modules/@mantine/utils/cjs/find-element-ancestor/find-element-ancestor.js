'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function findElementAncestor(element, selector) {
  let _element = element;
  while ((_element = _element.parentElement) && !_element.matches(selector))
    ;
  return _element;
}

exports.findElementAncestor = findElementAncestor;
//# sourceMappingURL=find-element-ancestor.js.map
