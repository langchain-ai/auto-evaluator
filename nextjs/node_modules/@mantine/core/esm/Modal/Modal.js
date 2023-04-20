import React from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { ModalRoot } from './ModalRoot/ModalRoot.js';
import { ModalContent } from './ModalContent/ModalContent.js';
import { ModalBase, ModalBaseDefaultProps } from '../ModalBase/ModalBase.js';

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
const defaultProps = __spreadProps(__spreadValues({}, ModalBaseDefaultProps), {
  transitionProps: { duration: 200, transition: "pop" },
  withOverlay: true,
  withCloseButton: true
});
function Modal(props) {
  const _a = useComponentDefaultProps("Modal", defaultProps, props), {
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
  return /* @__PURE__ */ React.createElement(ModalRoot, __spreadValues({}, others), withOverlay && /* @__PURE__ */ React.createElement(ModalBase.Overlay, __spreadValues({}, overlayProps)), /* @__PURE__ */ React.createElement(ModalContent, null, hasHeader && /* @__PURE__ */ React.createElement(ModalBase.Header, null, title && /* @__PURE__ */ React.createElement(ModalBase.Title, null, title), withCloseButton && /* @__PURE__ */ React.createElement(ModalBase.CloseButton, __spreadValues({}, closeButtonProps))), /* @__PURE__ */ React.createElement(ModalBase.Body, null, children)));
}
Modal.Root = ModalRoot;
Modal.CloseButton = ModalBase.CloseButton;
Modal.Overlay = ModalBase.Overlay;
Modal.Content = ModalContent;
Modal.Header = ModalBase.Header;
Modal.Title = ModalBase.Title;
Modal.Body = ModalBase.Body;
Modal.NativeScrollArea = ModalBase.NativeScrollArea;

export { Modal };
//# sourceMappingURL=Modal.js.map
