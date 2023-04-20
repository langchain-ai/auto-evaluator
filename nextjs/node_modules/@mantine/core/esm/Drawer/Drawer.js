import React from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { DrawerRoot } from './DrawerRoot/DrawerRoot.js';
import { DrawerContent } from './DrawerContent/DrawerContent.js';
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
  withOverlay: true,
  withCloseButton: true
});
function Drawer(props) {
  const _a = useComponentDefaultProps("Drawer", defaultProps, props), {
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
  return /* @__PURE__ */ React.createElement(DrawerRoot, __spreadValues({}, others), withOverlay && /* @__PURE__ */ React.createElement(ModalBase.Overlay, __spreadValues({}, overlayProps)), /* @__PURE__ */ React.createElement(DrawerContent, null, hasHeader && /* @__PURE__ */ React.createElement(ModalBase.Header, null, title && /* @__PURE__ */ React.createElement(ModalBase.Title, null, title), withCloseButton && /* @__PURE__ */ React.createElement(ModalBase.CloseButton, __spreadValues({}, closeButtonProps))), /* @__PURE__ */ React.createElement(ModalBase.Body, null, children)));
}
Drawer.Root = DrawerRoot;
Drawer.CloseButton = ModalBase.CloseButton;
Drawer.Overlay = ModalBase.Overlay;
Drawer.Content = DrawerContent;
Drawer.Header = ModalBase.Header;
Drawer.Title = ModalBase.Title;
Drawer.Body = ModalBase.Body;
Drawer.NativeScrollArea = ModalBase.NativeScrollArea;

export { Drawer };
//# sourceMappingURL=Drawer.js.map
