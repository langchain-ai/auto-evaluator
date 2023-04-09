'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var Burger_styles = require('./Burger.styles.js');
var UnstyledButton = require('../UnstyledButton/UnstyledButton.js');

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
const defaultProps = {
  size: "md",
  transitionDuration: 300
};
const Burger = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("Burger", defaultProps, props), {
    className,
    opened,
    color,
    size,
    classNames,
    styles: styles$1,
    transitionDuration,
    variant
  } = _a, others = __objRest(_a, [
    "className",
    "opened",
    "color",
    "size",
    "classNames",
    "styles",
    "transitionDuration",
    "variant"
  ]);
  const { classes, cx } = Burger_styles['default']({ color, transitionDuration }, { classNames, styles: styles$1, name: "Burger", variant, size });
  return /* @__PURE__ */ React__default.createElement(UnstyledButton.UnstyledButton, __spreadValues({
    className: cx(classes.root, className),
    ref
  }, others), /* @__PURE__ */ React__default.createElement("div", {
    "data-opened": opened || void 0,
    className: classes.burger
  }));
});
Burger.displayName = "@mantine/core/Burger";

exports.Burger = Burger;
//# sourceMappingURL=Burger.js.map
