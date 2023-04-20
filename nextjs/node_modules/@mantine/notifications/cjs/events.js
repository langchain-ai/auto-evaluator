'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@mantine/utils');

const [useNotificationsEvents, createEvent] = utils.createUseExternalEvents("mantine-notifications");
const showNotification = createEvent("show");
const hideNotification = createEvent("hide");
const cleanNotifications = createEvent("clean");
const cleanNotificationsQueue = createEvent("cleanQueue");
const updateNotification = createEvent("update");
const notifications = {
  show: showNotification,
  hide: hideNotification,
  clean: cleanNotifications,
  cleanQueue: cleanNotificationsQueue,
  update: updateNotification
};

exports.cleanNotifications = cleanNotifications;
exports.cleanNotificationsQueue = cleanNotificationsQueue;
exports.createEvent = createEvent;
exports.hideNotification = hideNotification;
exports.notifications = notifications;
exports.showNotification = showNotification;
exports.updateNotification = updateNotification;
exports.useNotificationsEvents = useNotificationsEvents;
//# sourceMappingURL=events.js.map
