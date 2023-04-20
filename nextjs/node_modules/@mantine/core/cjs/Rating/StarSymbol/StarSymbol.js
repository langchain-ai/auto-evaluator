'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var StarIcon = require('./StarIcon.js');
var StarSymbol_styles = require('./StarSymbol.styles.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function StarSymbol({ size, type, color }) {
  const { classes } = StarSymbol_styles['default']({ type, color }, { name: "Rating", size });
  return /* @__PURE__ */ React__default.createElement(StarIcon.StarIcon, {
    className: classes.icon
  });
}
StarSymbol.displayName = "@mantine/core/StarSymbol";

exports.StarSymbol = StarSymbol;
//# sourceMappingURL=StarSymbol.js.map
