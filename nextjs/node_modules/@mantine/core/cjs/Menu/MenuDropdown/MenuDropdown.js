'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var utils = require('@mantine/utils');
var Menu_context = require('../Menu.context.js');
var Popover = require('../../Popover/Popover.js');

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
const defaultProps = {};
function MenuDropdown(props) {
  const _a = styles.useComponentDefaultProps("MenuDropdown", defaultProps, props), { children, onMouseEnter, onMouseLeave } = _a, others = __objRest(_a, ["children", "onMouseEnter", "onMouseLeave"]);
  const wrapperRef = React.useRef();
  const ctx = Menu_context.useMenuContext();
  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      wrapperRef.current.querySelectorAll("[data-menu-item]")[0].focus();
    }
  };
  const handleMouseEnter = utils.createEventHandler(onMouseEnter, () => ctx.trigger === "hover" && ctx.openDropdown());
  const handleMouseLeave = utils.createEventHandler(onMouseLeave, () => ctx.trigger === "hover" && ctx.closeDropdown());
  return /* @__PURE__ */ React__default.createElement(Popover.Popover.Dropdown, __spreadValues({
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    role: "menu",
    "aria-orientation": "vertical"
  }, others), /* @__PURE__ */ React__default.createElement("div", {
    tabIndex: -1,
    "data-menu-dropdown": true,
    "data-autofocus": true,
    onKeyDown: handleKeyDown,
    ref: wrapperRef,
    style: { outline: 0 }
  }, children));
}
MenuDropdown.displayName = "@mantine/core/MenuDropdown";

exports.MenuDropdown = MenuDropdown;
//# sourceMappingURL=MenuDropdown.js.map
