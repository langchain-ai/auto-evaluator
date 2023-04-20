'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var useWindowEvent = require('../use-window-event/use-window-event.js');

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
function getConnection() {
  if (typeof navigator === "undefined") {
    return {};
  }
  const _navigator = navigator;
  const connection = _navigator.connection || _navigator.mozConnection || _navigator.webkitConnection;
  if (!connection) {
    return {};
  }
  return {
    downlink: connection == null ? void 0 : connection.downlink,
    downlinkMax: connection == null ? void 0 : connection.downlinkMax,
    effectiveType: connection == null ? void 0 : connection.effectiveType,
    rtt: connection == null ? void 0 : connection.rtt,
    saveData: connection == null ? void 0 : connection.saveData,
    type: connection == null ? void 0 : connection.type
  };
}
function useNetwork() {
  const [status, setStatus] = React.useState({
    online: true
  });
  const handleConnectionChange = React.useCallback(() => setStatus((current) => __spreadValues(__spreadValues({}, current), getConnection())), []);
  useWindowEvent.useWindowEvent("online", () => setStatus(__spreadValues({ online: true }, getConnection())));
  useWindowEvent.useWindowEvent("offline", () => setStatus(__spreadValues({ online: false }, getConnection())));
  React.useEffect(() => {
    const _navigator = navigator;
    if (_navigator.connection) {
      setStatus(__spreadValues({ online: _navigator.onLine }, getConnection()));
      _navigator.connection.addEventListener("change", handleConnectionChange);
      return () => _navigator.connection.removeEventListener("change", handleConnectionChange);
    }
    return void 0;
  }, []);
  return status;
}

exports.useNetwork = useNetwork;
//# sourceMappingURL=use-network.js.map
