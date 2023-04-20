'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

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
const DEFAULT_EVENTS = [
  "keypress",
  "mousemove",
  "touchmove",
  "click",
  "scroll"
];
const DEFAULT_OPTIONS = {
  events: DEFAULT_EVENTS,
  initialState: true
};
function useIdle(timeout, options) {
  const { events, initialState } = __spreadValues(__spreadValues({}, DEFAULT_OPTIONS), options);
  const [idle, setIdle] = React.useState(initialState);
  const timer = React.useRef();
  React.useEffect(() => {
    const handleEvents = () => {
      setIdle(false);
      if (timer.current) {
        window.clearTimeout(timer.current);
      }
      timer.current = window.setTimeout(() => {
        setIdle(true);
      }, timeout);
    };
    events.forEach((event) => document.addEventListener(event, handleEvents));
    return () => {
      events.forEach((event) => document.removeEventListener(event, handleEvents));
    };
  }, [timeout]);
  return idle;
}

exports.useIdle = useIdle;
//# sourceMappingURL=use-idle.js.map
