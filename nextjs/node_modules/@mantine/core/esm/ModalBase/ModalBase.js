import React, { useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { useId, useWindowEvent, useFocusReturn } from '@mantine/hooks';
import { getDefaultZIndex, useComponentDefaultProps } from '@mantine/styles';
import { ModalBaseProvider } from './ModalBase.context.js';
import { ModalBaseCloseButton } from './ModalBaseCloseButton/ModalBaseCloseButton.js';
import { ModalBaseOverlay } from './ModalBaseOverlay/ModalBaseOverlay.js';
import { ModalBaseContent } from './ModalBaseContent/ModalBaseContent.js';
import { ModalBaseHeader } from './ModalBaseHeader/ModalBaseHeader.js';
import { ModalBaseTitle } from './ModalBaseTitle/ModalBaseTitle.js';
import { ModalBaseBody } from './ModalBaseBody/ModalBaseBody.js';
import { NativeScrollArea } from './NativeScrollArea/NativeScrollArea.js';
import { useLockScroll } from './use-lock-scroll.js';
import useStyles from './ModalBase.styles.js';
import { OptionalPortal } from '../Portal/OptionalPortal.js';

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
const ModalBaseDefaultProps = {
  closeOnClickOutside: true,
  withinPortal: true,
  lockScroll: true,
  trapFocus: true,
  returnFocus: true,
  closeOnEscape: true,
  keepMounted: false,
  zIndex: getDefaultZIndex("modal"),
  padding: "md",
  size: "md",
  shadow: "xl"
};
function ModalBase(props) {
  const _a = useComponentDefaultProps("ModalBase", ModalBaseDefaultProps, props), {
    opened,
    onClose,
    children,
    closeOnClickOutside,
    __staticSelector,
    transitionProps,
    withinPortal,
    portalProps,
    keepMounted,
    target,
    zIndex,
    lockScroll,
    trapFocus,
    closeOnEscape,
    returnFocus,
    padding,
    shadow,
    id,
    size,
    variant,
    classNames,
    unstyled,
    styles,
    className
  } = _a, others = __objRest(_a, [
    "opened",
    "onClose",
    "children",
    "closeOnClickOutside",
    "__staticSelector",
    "transitionProps",
    "withinPortal",
    "portalProps",
    "keepMounted",
    "target",
    "zIndex",
    "lockScroll",
    "trapFocus",
    "closeOnEscape",
    "returnFocus",
    "padding",
    "shadow",
    "id",
    "size",
    "variant",
    "classNames",
    "unstyled",
    "styles",
    "className"
  ]);
  const { classes, cx } = useStyles(null, {
    name: __staticSelector,
    classNames,
    styles,
    unstyled,
    variant,
    size
  });
  const _id = useId(id);
  const [titleMounted, setTitleMounted] = useState(false);
  const [bodyMounted, setBodyMounted] = useState(false);
  const transitionDuration = typeof (transitionProps == null ? void 0 : transitionProps.duration) === "number" ? transitionProps == null ? void 0 : transitionProps.duration : 200;
  const shouldLockScroll = useLockScroll({ opened, transitionDuration });
  useWindowEvent("keydown", (event) => {
    if (!trapFocus && event.key === "Escape" && closeOnEscape) {
      onClose();
    }
  });
  useFocusReturn({ opened, shouldReturnFocus: trapFocus && returnFocus });
  return /* @__PURE__ */ React.createElement(OptionalPortal, __spreadValues({
    withinPortal,
    target
  }, portalProps), /* @__PURE__ */ React.createElement(ModalBaseProvider, {
    value: {
      __staticSelector,
      opened,
      onClose,
      closeOnClickOutside,
      transitionProps: __spreadProps(__spreadValues({}, transitionProps), { duration: transitionDuration, keepMounted }),
      zIndex,
      padding,
      id: _id,
      getTitleId: () => `${_id}-title`,
      getBodyId: () => `${_id}-body`,
      titleMounted,
      bodyMounted,
      setTitleMounted,
      setBodyMounted,
      trapFocus,
      closeOnEscape,
      shadow,
      stylesApi: {
        name: __staticSelector,
        size,
        variant,
        classNames,
        styles,
        unstyled
      }
    }
  }, /* @__PURE__ */ React.createElement(RemoveScroll, {
    enabled: shouldLockScroll && lockScroll
  }, /* @__PURE__ */ React.createElement("div", __spreadValues({
    className: cx(classes.root, className)
  }, others), children))));
}
ModalBase.CloseButton = ModalBaseCloseButton;
ModalBase.Overlay = ModalBaseOverlay;
ModalBase.Content = ModalBaseContent;
ModalBase.Header = ModalBaseHeader;
ModalBase.Title = ModalBaseTitle;
ModalBase.Body = ModalBaseBody;
ModalBase.NativeScrollArea = NativeScrollArea;

export { ModalBase, ModalBaseDefaultProps };
//# sourceMappingURL=ModalBase.js.map
