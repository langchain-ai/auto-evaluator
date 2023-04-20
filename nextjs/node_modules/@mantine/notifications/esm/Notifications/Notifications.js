import React, { useRef } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { rem, getDefaultZIndex, Portal, Box } from '@mantine/core';
import { useForceUpdate, useReducedMotion, useDidUpdate } from '@mantine/hooks';
import { useNotificationsEvents, notifications } from '../events.js';
import getPositionStyles from './get-position-styles/get-position-styles.js';
import getNotificationStateStyles from './get-notification-state-styles/get-notification-state-styles.js';
import NotificationContainer from '../NotificationContainer/NotificationContainer.js';
import useStyles from './Notifications.styles.js';
import useNotificationsState from './use-notifications-state/use-notifications-state.js';

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
const POSITIONS = [
  "top-left",
  "top-right",
  "top-center",
  "bottom-left",
  "bottom-right",
  "bottom-center"
];
const Notifications = (_a) => {
  var _b = _a, {
    className,
    position = "bottom-right",
    autoClose = 4e3,
    transitionDuration = 250,
    containerWidth = rem(440),
    notificationMaxHeight = rem(200),
    limit = 5,
    zIndex = getDefaultZIndex("overlay"),
    style,
    children,
    target
  } = _b, others = __objRest(_b, [
    "className",
    "position",
    "autoClose",
    "transitionDuration",
    "containerWidth",
    "notificationMaxHeight",
    "limit",
    "zIndex",
    "style",
    "children",
    "target"
  ]);
  const forceUpdate = useForceUpdate();
  const refs = useRef({});
  const previousLength = useRef(0);
  const {
    notifications,
    showNotification,
    updateNotification,
    hideNotification,
    clean,
    cleanQueue
  } = useNotificationsState({ limit });
  const { classes, cx, theme } = useStyles({ zIndex });
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = theme.respectReducedMotion ? shouldReduceMotion : false;
  const duration = reduceMotion ? 1 : transitionDuration;
  const positioning = (POSITIONS.includes(position) ? position : "bottom-right").split("-");
  useDidUpdate(() => {
    if (notifications.length > previousLength.current) {
      setTimeout(() => forceUpdate(), 0);
    }
    previousLength.current = notifications.length;
  }, [notifications]);
  useNotificationsEvents({
    show: showNotification,
    hide: hideNotification,
    update: updateNotification,
    clean,
    cleanQueue
  });
  const items = notifications.map((notification) => /* @__PURE__ */ React.createElement(Transition, {
    key: notification.id,
    timeout: duration,
    onEnter: () => refs.current[notification.id].offsetHeight,
    nodeRef: { current: refs.current[notification.id] }
  }, (state) => /* @__PURE__ */ React.createElement(NotificationContainer, {
    innerRef: (node) => {
      refs.current[notification.id] = node;
    },
    notification,
    onHide: hideNotification,
    className: classes.notification,
    autoClose,
    sx: [
      __spreadValues({}, getNotificationStateStyles({
        state,
        positioning,
        transitionDuration: duration,
        maxHeight: notificationMaxHeight
      })),
      ...Array.isArray(notification.sx) ? notification.sx : [notification.sx]
    ]
  })));
  return /* @__PURE__ */ React.createElement(Portal, {
    target
  }, /* @__PURE__ */ React.createElement(Box, __spreadValues({
    className: cx(classes.notifications, className),
    style,
    sx: __spreadValues({
      maxWidth: containerWidth
    }, getPositionStyles(positioning, theme.spacing.md))
  }, others), /* @__PURE__ */ React.createElement(TransitionGroup, null, items)));
};
Notifications.displayName = "@mantine/notifications/Notifications";
Notifications.show = notifications.show;
Notifications.hide = notifications.hide;
Notifications.update = notifications.update;
Notifications.clean = notifications.clean;
Notifications.cleanQueue = notifications.cleanQueue;

export { Notifications };
//# sourceMappingURL=Notifications.js.map
