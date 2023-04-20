import React from 'react';
import { SelectRightSection } from './SelectRightSection.js';

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
function getSelectRightSectionProps(_a) {
  var _b = _a, {
    styles,
    rightSection,
    rightSectionWidth,
    theme
  } = _b, props = __objRest(_b, [
    "styles",
    "rightSection",
    "rightSectionWidth",
    "theme"
  ]);
  if (rightSection) {
    return { rightSection, rightSectionWidth, styles };
  }
  const _styles = typeof styles === "function" ? styles(theme) : styles;
  return {
    rightSection: !props.readOnly && !(props.disabled && props.shouldClear) && /* @__PURE__ */ React.createElement(SelectRightSection, __spreadValues({}, props)),
    styles: __spreadProps(__spreadValues({}, _styles), {
      rightSection: __spreadProps(__spreadValues({}, _styles == null ? void 0 : _styles.rightSection), {
        pointerEvents: props.shouldClear ? void 0 : "none"
      })
    })
  };
}

export { getSelectRightSectionProps };
//# sourceMappingURL=get-select-right-section-props.js.map
