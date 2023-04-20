import React, { useRef, useEffect } from 'react';
import { Notification } from '@mantine/core';
import getAutoClose from './get-auto-close/get-auto-close.js';

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
function NotificationContainer(_a) {
  var _b = _a, {
    notification,
    autoClose,
    onHide,
    innerRef
  } = _b, others = __objRest(_b, [
    "notification",
    "autoClose",
    "onHide",
    "innerRef"
  ]);
  const _a2 = notification, { autoClose: notificationAutoClose, message } = _a2, notificationProps = __objRest(_a2, ["autoClose", "message"]);
  const autoCloseTimeout = getAutoClose(autoClose, notificationAutoClose);
  const hideTimeout = useRef();
  const handleHide = () => {
    onHide(notification.id);
    window.clearTimeout(hideTimeout.current);
  };
  const cancelDelayedHide = () => {
    clearTimeout(hideTimeout.current);
  };
  const handleDelayedHide = () => {
    if (typeof autoCloseTimeout === "number") {
      hideTimeout.current = window.setTimeout(handleHide, autoCloseTimeout);
    }
  };
  useEffect(() => {
    if (typeof notification.onOpen === "function") {
      notification.onOpen(notification);
    }
  }, []);
  useEffect(() => {
    handleDelayedHide();
    return cancelDelayedHide;
  }, [autoClose, notification.autoClose]);
  return /* @__PURE__ */ React.createElement(Notification, __spreadProps(__spreadValues(__spreadValues({}, notificationProps), others), {
    onClose: handleHide,
    onMouseEnter: cancelDelayedHide,
    onMouseLeave: handleDelayedHide,
    ref: innerRef
  }), message);
}
NotificationContainer.displayName = "@mantine/notifications/NotificationContainer";

export default NotificationContainer;
//# sourceMappingURL=NotificationContainer.js.map
