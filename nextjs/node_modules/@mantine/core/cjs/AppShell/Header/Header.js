'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var VerticalSection = require('../VerticalSection/VerticalSection.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const defaultProps = {
  fixed: false,
  position: { top: 0, left: 0, right: 0 }
};
const Header = React.forwardRef((props, ref) => {
  const _props = styles.useComponentDefaultProps("Header", defaultProps, props);
  return /* @__PURE__ */ React__default.createElement(VerticalSection.VerticalSection, __spreadProps(__spreadValues({
    section: "header",
    __staticSelector: "Header"
  }, _props), {
    ref
  }));
});
Header.displayName = "@mantine/core/Header";

exports.Header = Header;
//# sourceMappingURL=Header.js.map
