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
function useSetState(initialState) {
  const [state, _setState] = React.useState(initialState);
  const setState = React.useCallback((statePartial) => _setState((current) => __spreadValues(__spreadValues({}, current), typeof statePartial === "function" ? statePartial(current) : statePartial)), []);
  return [state, setState];
}

exports.useSetState = useSetState;
//# sourceMappingURL=use-set-state.js.map
