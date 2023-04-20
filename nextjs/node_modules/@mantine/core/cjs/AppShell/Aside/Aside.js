'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var HorizontalSection = require('../HorizontalSection/HorizontalSection.js');
var Section = require('../HorizontalSection/Section/Section.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __defProp = Object.defineProperty;
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
const defaultProps = {
  fixed: false,
  position: { top: 0, right: 0 },
  hiddenBreakpoint: "md",
  hidden: false
};
const Aside = React.forwardRef((props, ref) => {
  const _props = styles.useComponentDefaultProps("Aside", defaultProps, props);
  return /* @__PURE__ */ React__default.createElement(HorizontalSection.HorizontalSection, __spreadValues({
    section: "aside",
    __staticSelector: "Aside",
    ref
  }, _props));
});
Aside.Section = Section.Section;
Aside.displayName = "@mantine/core/Aside";

exports.Aside = Aside;
//# sourceMappingURL=Aside.js.map
