import React, { useRef } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { createEventHandler } from '@mantine/utils';
import { useMenuContext } from '../Menu.context.js';
import { Popover } from '../../Popover/Popover.js';

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
  const _a = useComponentDefaultProps("MenuDropdown", defaultProps, props), { children, onMouseEnter, onMouseLeave } = _a, others = __objRest(_a, ["children", "onMouseEnter", "onMouseLeave"]);
  const wrapperRef = useRef();
  const ctx = useMenuContext();
  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      wrapperRef.current.querySelectorAll("[data-menu-item]")[0].focus();
    }
  };
  const handleMouseEnter = createEventHandler(onMouseEnter, () => ctx.trigger === "hover" && ctx.openDropdown());
  const handleMouseLeave = createEventHandler(onMouseLeave, () => ctx.trigger === "hover" && ctx.closeDropdown());
  return /* @__PURE__ */ React.createElement(Popover.Dropdown, __spreadValues({
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    role: "menu",
    "aria-orientation": "vertical"
  }, others), /* @__PURE__ */ React.createElement("div", {
    tabIndex: -1,
    "data-menu-dropdown": true,
    "data-autofocus": true,
    onKeyDown: handleKeyDown,
    ref: wrapperRef,
    style: { outline: 0 }
  }, children));
}
MenuDropdown.displayName = "@mantine/core/MenuDropdown";

export { MenuDropdown };
//# sourceMappingURL=MenuDropdown.js.map
