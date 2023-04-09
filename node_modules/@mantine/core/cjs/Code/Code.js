'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var Code_styles = require('./Code.styles.js');
var Box = require('../Box/Box.js');

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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps = {};
const Code = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("Code", defaultProps, props), { className, children, block, color, unstyled, variant } = _a, others = __objRest(_a, ["className", "children", "block", "color", "unstyled", "variant"]);
  const { classes, cx } = Code_styles['default']({ color }, { name: "Code", unstyled, variant });
  if (block) {
    return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues({
      component: "pre",
      dir: "ltr",
      className: cx(classes.root, classes.block, className),
      ref
    }, others), children);
  }
  return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues({
    component: "code",
    className: cx(classes.root, className),
    ref,
    dir: "ltr"
  }, others), children);
});
Code.displayName = "@mantine/core/Code";

exports.Code = Code;
//# sourceMappingURL=Code.js.map
