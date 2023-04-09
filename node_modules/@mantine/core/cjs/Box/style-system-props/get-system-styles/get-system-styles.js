'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var getResponsiveValue = require('../get-responsive-value/get-responsive-value.js');
var valueGetters = require('../value-getters/value-getters.js');
var systemProps = require('../system-props/system-props.js');

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
function getSystemStyles(systemStyles, theme, systemProps$1 = systemProps.SYSTEM_PROPS) {
  const styles = Object.keys(systemProps$1).reduce((acc, systemProp) => {
    if (systemProp in systemStyles && systemStyles[systemProp] !== void 0) {
      acc.push(getResponsiveValue.getResponsiveValue({
        value: systemStyles[systemProp],
        getValue: valueGetters.valueGetters[systemProps$1[systemProp].type],
        property: systemProps$1[systemProp].property,
        theme
      }));
    }
    return acc;
  }, []);
  return styles.reduce((acc, stylesPartial) => {
    Object.keys(stylesPartial).forEach((property) => {
      if (typeof stylesPartial[property] === "object" && stylesPartial[property] !== null) {
        if (!(property in acc)) {
          acc[property] = stylesPartial[property];
        } else {
          acc[property] = __spreadValues(__spreadValues({}, acc[property]), stylesPartial[property]);
        }
      } else {
        acc[property] = stylesPartial[property];
      }
    });
    return acc;
  }, {});
}

exports.getSystemStyles = getSystemStyles;
//# sourceMappingURL=get-system-styles.js.map
