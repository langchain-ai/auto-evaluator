'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var DrawerRoot = require('./DrawerRoot/DrawerRoot.js');
var DrawerContent = require('./DrawerContent/DrawerContent.js');
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
  withOverlay: true,
  withCloseButton: true
});
function Drawer(props) {
  const _a = styles.useComponentDefaultProps("Drawer", defaultProps, props), {
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
  return /* @__PURE__ */ React__default.createElement(DrawerRoot.DrawerRoot, __spreadValues({}, others), withOverlay && /* @__PURE__ */ React__default.createElement(ModalBase.ModalBase.Overlay, __spreadValues({}, overlayProps)), /* @__PURE__ */ React__default.createElement(DrawerContent.DrawerContent, null, hasHeader && /* @__PURE__ */ React__default.createElement(ModalBase.ModalBase.Header, null, title && /* @__PURE__ */ React__default.createElement(ModalBase.ModalBase.Title, null, title), withCloseButton && /* @__PURE__ */ React__default.createElement(ModalBase.ModalBase.CloseButton, __spreadValues({}, closeButtonProps))), /* @__PURE__ */ React__default.createElement(ModalBase.ModalBase.Body, null, children)));
}
Drawer.Root = DrawerRoot.DrawerRoot;
Drawer.CloseButton = ModalBase.ModalBase.CloseButton;
Drawer.Overlay = ModalBase.ModalBase.Overlay;
Drawer.Content = DrawerContent.DrawerContent;
Drawer.Header = ModalBase.ModalBase.Header;
Drawer.Title = ModalBase.ModalBase.Title;
Drawer.Body = ModalBase.ModalBase.Body;
Drawer.NativeScrollArea = ModalBase.ModalBase.NativeScrollArea;

exports.Drawer = Drawer;
//# sourceMappingURL=Drawer.js.map
