'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function useHovered() {
  const [hovered, setHovered] = React.useState(-1);
  const resetHovered = () => setHovered(-1);
  return [hovered, { setHovered, resetHovered }];
}

exports.useHovered = useHovered;
//# sourceMappingURL=use-hovered.js.map
