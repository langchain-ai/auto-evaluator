'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var ModalRoot = require('./ModalRoot/ModalRoot.js');
var ModalContent = require('./ModalContent/ModalContent.js');
var ModalBase = require('../ModalBase/ModalBase.js');

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
const defaultProps = __spreadProps(__spreadValues({}, ModalBase.ModalBaseDefaultProps), {
  transitionProps: { duration: 200, transition: "pop" },
  withOverlay: true,
  withCloseButton: true
});
function Modal(props) {
  const _a = styles.useComponentDefaultProps("Modal", defaultProps, props), {
    title,
    withOverlay,
    overlayProps,
    withCloseButton,
    closeButtonProps,
    children
  } = _a, others = __objRest(_a, [
    "title",
    "withOverlay",
    "overlayProps",
    "withCloseButton",
    "closeButtonProps",
    "children"
  ]);
  const hasHeader = !!title || withCloseButton;
  return /* @__PURE__ */ React__default.createElement(ModalRoot.ModalRoot, __spreadValues({}, others), withOverlay && /* @__PURE__ */ React__default.createElement(ModalBase.ModalBase.Overlay, __spreadValues({}, overlayProps)), /* @__PURE__ */ React__default.createElement(ModalContent.ModalContent, null, hasHeader && /* @__PURE__ */ React__default.createElement(ModalBase.ModalBase.Header, null, title && /* @__PURE__ */ React__default.createElement(ModalBase.ModalBase.Title, null, title), withCloseButton && /* @__PURE__ */ React__default.createElement(ModalBase.ModalBase.CloseButton, __spreadValues({}, closeButtonProps))), /* @__PURE__ */ React__default.createElement(ModalBase.ModalBase.Body, null, children)));
}
Modal.Root = ModalRoot.ModalRoot;
Modal.CloseButton = ModalBase.ModalBase.CloseButton;
Modal.Overlay = ModalBase.ModalBase.Overlay;
Modal.Content = ModalContent.ModalContent;
Modal.Header = ModalBase.ModalBase.Header;
Modal.Title = ModalBase.ModalBase.Title;
Modal.Body = ModalBase.ModalBase.Body;
Modal.NativeScrollArea = ModalBase.ModalBase.NativeScrollArea;

exports.Modal = Modal;
//# sourceMappingURL=Modal.js.map
