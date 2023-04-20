import { useQueue, randomId } from '@mantine/hooks';

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
function useNotificationsState({ limit }) {
  const { state, queue, update, cleanQueue } = useQueue({
    initialValues: [],
    limit
  });
  const showNotification = (notification) => {
    const id = notification.id || randomId();
    update((notifications) => {
      if (notification.id && notifications.some((n) => n.id === notification.id)) {
        return notifications;
      }
      return [...notifications, __spreadProps(__spreadValues({}, notification), { id })];
    });
    return id;
  };
  const updateNotification = (notification) => update((notifications) => {
    const index = notifications.findIndex((n) => n.id === notification.id);
    if (index === -1) {
      return notifications;
    }
    const newNotifications = [...notifications];
    newNotifications[index] = notification;
    return newNotifications;
  });
  const hideNotification = (id) => update((notifications) => notifications.filter((notification) => {
    if (notification.id === id) {
      typeof notification.onClose === "function" && notification.onClose(notification);
      return false;
    }
    return true;
  }));
  const clean = () => update(() => []);
  return {
    notifications: state,
    queue,
    showNotification,
    updateNotification,
    hideNotification,
    cleanQueue,
    clean
  };
}

export default useNotificationsState;
//# sourceMappingURL=use-notifications-state.js.map
