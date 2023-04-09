'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var utils = require('@mantine/utils');
var hooks = require('@mantine/hooks');
var Menu_context = require('../Menu.context.js');
var MenuItem_styles = require('./MenuItem.styles.js');
var Box = require('../../Box/Box.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
const defaultProps = {};
const _MenuItem = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("MenuItem", defaultProps, props), { children, className, color, closeMenuOnClick, icon, rightSection } = _a, others = __objRest(_a, ["children", "className", "color", "closeMenuOnClick", "icon", "rightSection"]);
  const ctx = Menu_context.useMenuContext();
  const { classes, cx, theme } = MenuItem_styles['default']({ radius: ctx.radius, color }, {
    name: "Menu",
    classNames: ctx.classNames,
    styles: ctx.styles,
    unstyled: ctx.unstyled,
    variant: ctx.variant
  });
  const itemRef = React.useRef();
  const itemIndex = ctx.getItemIndex(itemRef.current);
  const _others = others;
  const handleMouseLeave = utils.createEventHandler(_others.onMouseLeave, () => ctx.setHovered(-1));
  const handleMouseEnter = utils.createEventHandler(_others.onMouseEnter, () => ctx.setHovered(ctx.getItemIndex(itemRef.current)));
  const handleClick = utils.createEventHandler(_others.onClick, () => {
    if (typeof closeMenuOnClick === "boolean") {
      closeMenuOnClick && ctx.closeDropdownImmediately();
    } else {
      ctx.closeOnItemClick && ctx.closeDropdownImmediately();
    }
  });
  const handleFocus = utils.createEventHandler(_others.onFocus, () => ctx.setHovered(ctx.getItemIndex(itemRef.current)));
  return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadProps(__spreadValues({
    component: "button",
    type: "button"
  }, others), {
    tabIndex: -1,
    onFocus: handleFocus,
    className: cx(classes.item, className),
    ref: hooks.useMergedRef(itemRef, ref),
    role: "menuitem",
    "data-menu-item": true,
    "data-hovered": ctx.hovered === itemIndex ? true : void 0,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    onKeyDown: utils.createScopedKeydownHandler({
      siblingSelector: "[data-menu-item]",
      parentSelector: "[data-menu-dropdown]",
      activateOnFocus: false,
      loop: ctx.loop,
      dir: theme.dir,
      orientation: "vertical",
      onKeyDown: _others.onKeydown
    })
  }), icon && /* @__PURE__ */ React__default.createElement("div", {
    className: classes.itemIcon
  }, icon), children && /* @__PURE__ */ React__default.createElement("div", {
    className: classes.itemLabel
  }, children), rightSection && /* @__PURE__ */ React__default.createElement("div", {
    className: classes.itemRightSection
  }, rightSection));
});
_MenuItem.displayName = "@mantine/core/MenuItem";
const MenuItem = utils.createPolymorphicComponent(_MenuItem);

exports.MenuItem = MenuItem;
exports._MenuItem = _MenuItem;
//# sourceMappingURL=MenuItem.js.map
