import React from 'react';
import { useHovered, getContextItemIndex } from '@mantine/utils';
import { useUncontrolled, useDidUpdate } from '@mantine/hooks';
import { useComponentDefaultProps } from '@mantine/styles';
import { MenuDivider } from './MenuDivider/MenuDivider.js';
import { MenuDropdown } from './MenuDropdown/MenuDropdown.js';
import { MenuItem } from './MenuItem/MenuItem.js';
import { MenuLabel } from './MenuLabel/MenuLabel.js';
import { MenuTarget } from './MenuTarget/MenuTarget.js';
import { MenuContextProvider } from './Menu.context.js';
import useStyles from './Menu.styles.js';
import { useDelayedHover } from '../Floating/use-delayed-hover.js';
import { Popover } from '../Popover/Popover.js';

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
  const _a = useComponentDefaultProps("Menu", defaultProps, props), {
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
    styles,
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
  const { classes, cx } = useStyles();
  const [hovered, { setHovered, resetHovered }] = useHovered();
  const [_opened, setOpened] = useUncontrolled({
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
  const { openDropdown, closeDropdown } = useDelayedHover({ open, close, closeDelay, openDelay });
  const getItemIndex = (node) => getContextItemIndex("[data-menu-item]", "[data-menu-dropdown]", node);
  useDidUpdate(() => {
    resetHovered();
  }, [_opened]);
  return /* @__PURE__ */ React.createElement(MenuContextProvider, {
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
      styles,
      unstyled,
      variant
    }
  }, /* @__PURE__ */ React.createElement(Popover, __spreadProps(__spreadValues({}, others), {
    radius,
    opened: _opened,
    onChange: setOpened,
    defaultOpened,
    trapFocus: trigger === "click",
    closeOnEscape: closeOnEscape && trigger === "click",
    __staticSelector: "Menu",
    classNames: __spreadProps(__spreadValues({}, classNames), { dropdown: cx(classes.dropdown, classNames == null ? void 0 : classNames.dropdown) }),
    styles,
    unstyled,
    onClose: close,
    onOpen: open,
    variant
  }), children));
}
Menu.displayName = "@mantine/core/Menu";
Menu.Item = MenuItem;
Menu.Label = MenuLabel;
Menu.Dropdown = MenuDropdown;
Menu.Target = MenuTarget;
Menu.Divider = MenuDivider;

export { Menu };
//# sourceMappingURL=Menu.js.map
