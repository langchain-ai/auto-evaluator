'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var react = require('@emotion/react');
var MantineProvider = require('../theme/MantineProvider.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Global({ styles }) {
  const theme = MantineProvider.useMantineTheme();
  return /* @__PURE__ */ React__default.createElement(react.Global, {
    styles: react.css(typeof styles === "function" ? styles(theme) : styles)
  });
}

exports.Global = Global;
//# sourceMappingURL=Global.js.map
