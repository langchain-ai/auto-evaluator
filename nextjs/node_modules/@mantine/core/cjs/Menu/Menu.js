'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var utils = require('@mantine/utils');
var hooks = require('@mantine/hooks');
var styles = require('@mantine/styles');
var MenuDivider = require('./MenuDivider/MenuDivider.js');
var MenuDropdown = require('./MenuDropdown/MenuDropdown.js');
var MenuItem = require('./MenuItem/MenuItem.js');
var MenuLabel = require('./MenuLabel/MenuLabel.js');
var MenuTarget = require('./MenuTarget/MenuTarget.js');
var Menu_context = require('./Menu.context.js');
var Menu_styles = require('./Menu.styles.js');
var useDelayedHover = require('../Floating/use-delayed-hover.js');
var Popover = require('../Popover/Popover.js');

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
const defaultProps = {
  closeOnItemClick: true,
  loop: true,
  trigger: "click",
  openDelay: 0,
  closeDelay: 100
};
function Menu(props) {
  const _a = styles.useComponentDefaultProps("Menu", defaultProps, props), {
    children,
    onOpen,
    onClose,
    opened,
    defaultOpened,
    onChange,
    closeOnItemClick,
    loop,
    closeOnEscape,
    trigger,
    openDelay,
    closeDelay,
    classNames,
    styles: styles$1,
    unstyled,
    radius,
    variant
  } = _a, others = __objRest(_a, [
    "children",
    "onOpen",
    "onClose",
    "opened",
    "defaultOpened",
    "onChange",
    "closeOnItemClick",
    "loop",
    "closeOnEscape",
    "trigger",
    "openDelay",
    "closeDelay",
    "classNames",
    "styles",
    "unstyled",
    "radius",
    "variant"
  ]);
  const { classes, cx } = Menu_styles['default']();
  const [hovered, { setHovered, resetHovered }] = utils.useHovered();
  const [_opened, setOpened] = hooks.useUncontrolled({
    value: opened,
    defaultValue: defaultOpened,
    finalValue: false,
    onChange
  });
  const close = () => {
    setOpened(false);
    _opened && (onClose == null ? void 0 : onClose());
  };
  const open = () => {
    setOpened(true);
    !_opened && (onOpen == null ? void 0 : onOpen());
  };
  const toggleDropdown = () => _opened ? close() : open();
  const { openDropdown, closeDropdown } = useDelayedHover.useDelayedHover({ open, close, closeDelay, openDelay });
  const getItemIndex = (node) => utils.getContextItemIndex("[data-menu-item]", "[data-menu-dropdown]", node);
  hooks.useDidUpdate(() => {
    resetHovered();
  }, [_opened]);
  return /* @__PURE__ */ React__default.createElement(Menu_context.MenuContextProvider, {
    value: {
      opened: _opened,
      toggleDropdown,
      getItemIndex,
      hovered,
      setHovered,
      closeOnItemClick,
      closeDropdown: trigger === "click" ? close : closeDropdown,
      openDropdown: trigger === "click" ? open : openDropdown,
      closeDropdownImmediately: close,
      loop,
      trigger,
      radius,
      classNames,
      styles: styles$1,
      unstyled,
      variant
    }
  }, /* @__PURE__ */ React__default.createElement(Popover.Popover, __spreadProps(__spreadValues({}, others), {
    radius,
    opened: _opened,
    onChange: setOpened,
    defaultOpened,
    trapFocus: trigger === "click",
    closeOnEscape: closeOnEscape && trigger === "click",
    __staticSelector: "Menu",
    classNames: __spreadProps(__spreadValues({}, classNames), { dropdown: cx(classes.dropdown, classNames == null ? void 0 : classNames.dropdown) }),
    styles: styles$1,
    unstyled,
    onClose: close,
    onOpen: open,
    variant
  }), children));
}
Menu.displayName = "@mantine/core/Menu";
Menu.Item = MenuItem.MenuItem;
Menu.Label = MenuLabel.MenuLabel;
Menu.Dropdown = MenuDropdown.MenuDropdown;
Menu.Target = MenuTarget.MenuTarget;
Menu.Divider = MenuDivider.MenuDivider;

exports.Menu = Menu;
//# sourceMappingURL=Menu.js.map
