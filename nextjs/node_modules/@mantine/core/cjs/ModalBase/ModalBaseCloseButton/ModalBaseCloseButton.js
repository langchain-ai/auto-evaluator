'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var ModalBase_context = require('../ModalBase.context.js');
var ModalBaseCloseButton_styles = require('./ModalBaseCloseButton.styles.js');
var CloseButton = require('../../CloseButton/CloseButton.js');

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
const defaultProps = {
  size: "sm"
};
const ModalBaseCloseButton = React.forwardRef((props, ref) => {
  const ctx = ModalBase_context.useModalBaseContext();
  const _a = styles.useComponentDefaultProps(`${ctx.__staticSelector}CloseButton`, defaultProps, props), { className } = _a, others = __objRest(_a, ["className"]);
  const { classes, cx } = ModalBaseCloseButton_styles['default'](null, ctx.stylesApi);
  return /* @__PURE__ */ React__default.createElement(CloseButton.CloseButton, __spreadValues({
    className: cx(classes.close, className),
    ref,
    onClick: ctx.onClose
  }, others));
});

exports.ModalBaseCloseButton = ModalBaseCloseButton;
//# sourceMappingURL=ModalBaseCloseButton.js.map
