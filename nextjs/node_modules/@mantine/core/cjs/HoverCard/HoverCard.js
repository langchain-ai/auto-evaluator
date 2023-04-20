'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var hooks = require('@mantine/hooks');
var HoverCard_context = require('./HoverCard.context.js');
var HoverCardDropdown = require('./HoverCardDropdown/HoverCardDropdown.js');
var HoverCardTarget = require('./HoverCardTarget/HoverCardTarget.js');
var useDelayedHover = require('../Floating/use-delayed-hover.js');
var Popover = require('../Popover/Popover.js');

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
  openDelay: 0,
  closeDelay: 150,
  initiallyOpened: false
};
function HoverCard(props) {
  const _a = styles.useComponentDefaultProps("HoverCard", defaultProps, props), { children, onOpen, onClose, openDelay, closeDelay, initiallyOpened } = _a, others = __objRest(_a, ["children", "onOpen", "onClose", "openDelay", "closeDelay", "initiallyOpened"]);
  const [opened, { open, close }] = hooks.useDisclosure(initiallyOpened, { onClose, onOpen });
  const { openDropdown, closeDropdown } = useDelayedHover.useDelayedHover({ open, close, openDelay, closeDelay });
  return /* @__PURE__ */ React__default.createElement(HoverCard_context.HoverCardContextProvider, {
    value: { openDropdown, closeDropdown }
  }, /* @__PURE__ */ React__default.createElement(Popover.Popover, __spreadValues({
    opened,
    __staticSelector: "HoverCard"
  }, others), children));
}
HoverCard.displayName = "@mantine/core/HoverCard";
HoverCard.Target = HoverCardTarget.HoverCardTarget;
HoverCard.Dropdown = HoverCardDropdown.HoverCardDropdown;

exports.HoverCard = HoverCard;
//# sourceMappingURL=HoverCard.js.map
