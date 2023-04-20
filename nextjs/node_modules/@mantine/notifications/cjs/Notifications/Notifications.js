'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactTransitionGroup = require('react-transition-group');
var core = require('@mantine/core');
var hooks = require('@mantine/hooks');
var events = require('../events.js');
var getPositionStyles = require('./get-position-styles/get-position-styles.js');
var getNotificationStateStyles = require('./get-notification-state-styles/get-notification-state-styles.js');
var NotificationContainer = require('../NotificationContainer/NotificationContainer.js');
var Notifications_styles = require('./Notifications.styles.js');
var useNotificationsState = require('./use-notifications-state/use-notifications-state.js');

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
    containerWidth = core.rem(440),
    notificationMaxHeight = core.rem(200),
    limit = 5,
    zIndex = core.getDefaultZIndex("overlay"),
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
  const forceUpdate = hooks.useForceUpdate();
  const refs = React.useRef({});
  const previousLength = React.useRef(0);
  const {
    notifications,
    showNotification,
    updateNotification,
    hideNotification,
    clean,
    cleanQueue
  } = useNotificationsState['default']({ limit });
  const { classes, cx, theme } = Notifications_styles['default']({ zIndex });
  const shouldReduceMotion = hooks.useReducedMotion();
  const reduceMotion = theme.respectReducedMotion ? shouldReduceMotion : false;
  const duration = reduceMotion ? 1 : transitionDuration;
  const positioning = (POSITIONS.includes(position) ? position : "bottom-right").split("-");
  hooks.useDidUpdate(() => {
    if (notifications.length > previousLength.current) {
      setTimeout(() => forceUpdate(), 0);
    }
    previousLength.current = notifications.length;
  }, [notifications]);
  events.useNotificationsEvents({
    show: showNotification,
    hide: hideNotification,
    update: updateNotification,
    clean,
    cleanQueue
  });
  const items = notifications.map((notification) => /* @__PURE__ */ React__default.createElement(reactTransitionGroup.Transition, {
    key: notification.id,
    timeout: duration,
    onEnter: () => refs.current[notification.id].offsetHeight,
    nodeRef: { current: refs.current[notification.id] }
  }, (state) => /* @__PURE__ */ React__default.createElement(NotificationContainer['default'], {
    innerRef: (node) => {
      refs.current[notification.id] = node;
    },
    notification,
    onHide: hideNotification,
    className: classes.notification,
    autoClose,
    sx: [
      __spreadValues({}, getNotificationStateStyles['default']({
        state,
        positioning,
        transitionDuration: duration,
        maxHeight: notificationMaxHeight
      })),
      ...Array.isArray(notification.sx) ? notification.sx : [notification.sx]
    ]
  })));
  return /* @__PURE__ */ React__default.createElement(core.Portal, {
    target
  }, /* @__PURE__ */ React__default.createElement(core.Box, __spreadValues({
    className: cx(classes.notifications, className),
    style,
    sx: __spreadValues({
      maxWidth: containerWidth
    }, getPositionStyles['default'](positioning, theme.spacing.md))
  }, others), /* @__PURE__ */ React__default.createElement(reactTransitionGroup.TransitionGroup, null, items)));
};
Notifications.displayName = "@mantine/notifications/Notifications";
Notifications.show = events.notifications.show;
Notifications.hide = events.notifications.hide;
Notifications.update = events.notifications.update;
Notifications.clean = events.notifications.clean;
Notifications.cleanQueue = events.notifications.cleanQueue;

exports.Notifications = Notifications;
//# sourceMappingURL=Notifications.js.map
