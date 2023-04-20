'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function filterFalsyChildren(children) {
  return React.Children.toArray(children).filter(Boolean);
}

exports.filterFalsyChildren = filterFalsyChildren;
//# sourceMappingURL=filter-falsy-children.js.map
