'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var htmlReactParser = require('html-react-parser');
var getSsrStyles = require('./get-ssr-styles.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var htmlReactParser__default = /*#__PURE__*/_interopDefaultLegacy(htmlReactParser);

function ServerStyles({ html, server }) {
  const styles = getSsrStyles.getSSRStyles(html, server);
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, htmlReactParser__default(styles));
}

exports.ServerStyles = ServerStyles;
//# sourceMappingURL=ServerStyles.js.map
