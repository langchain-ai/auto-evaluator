'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var StarSymbol = require('../StarSymbol/StarSymbol.js');
var RatingItem_styles = require('./RatingItem.styles.js');
var Box = require('../../Box/Box.js');

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
function RatingItem(_a) {
  var _b = _a, {
    size,
    getSymbolLabel,
    emptyIcon,
    fullIcon,
    full,
    active,
    value,
    readOnly,
    fractionValue,
    classNames,
    styles,
    unstyled,
    color,
    id,
    variant,
    onChange
  } = _b, others = __objRest(_b, [
    "size",
    "getSymbolLabel",
    "emptyIcon",
    "fullIcon",
    "full",
    "active",
    "value",
    "readOnly",
    "fractionValue",
    "classNames",
    "styles",
    "unstyled",
    "color",
    "id",
    "variant",
    "onChange"
  ]);
  const { classes } = RatingItem_styles['default'](null, {
    name: "Rating",
    classNames,
    styles,
    unstyled,
    size,
    variant
  });
  const _fullIcon = typeof fullIcon === "function" ? fullIcon(value) : fullIcon;
  const _emptyIcon = typeof emptyIcon === "function" ? emptyIcon(value) : emptyIcon;
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, !readOnly && /* @__PURE__ */ React__default.createElement("input", __spreadValues({
    onKeyDown: (event) => event.key === " " && onChange(value),
    className: classes.input,
    id,
    type: "radio",
    "data-active": active,
    "aria-label": getSymbolLabel(value),
    value,
    onChange
  }, others)), /* @__PURE__ */ React__default.createElement(Box.Box, {
    component: readOnly ? "div" : "label",
    className: classes.label,
    "data-read-only": readOnly || void 0,
    htmlFor: id,
    sx: fractionValue === 1 ? void 0 : { zIndex: active ? 2 : 0 },
    onClick: () => onChange(value)
  }, /* @__PURE__ */ React__default.createElement(Box.Box, {
    className: classes.symbolBody,
    sx: fractionValue === 1 ? void 0 : { clipPath: `inset(0 ${active ? 100 - fractionValue * 100 : 100}% 0 0)` }
  }, full ? _fullIcon || /* @__PURE__ */ React__default.createElement(StarSymbol.StarSymbol, {
    color,
    size,
    type: "full"
  }) : _emptyIcon || /* @__PURE__ */ React__default.createElement(StarSymbol.StarSymbol, {
    color,
    size,
    type: "empty"
  }))));
}
RatingItem.displayName = "@mantine/core/RatingItem";

exports.RatingItem = RatingItem;
//# sourceMappingURL=RatingItem.js.map
