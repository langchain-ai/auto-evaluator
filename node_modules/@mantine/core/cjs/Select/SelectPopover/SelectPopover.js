'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var SelectScrollArea = require('../SelectScrollArea/SelectScrollArea.js');
var SelectPopover_styles = require('./SelectPopover.styles.js');
var Popover = require('../../Popover/Popover.js');
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
function SelectPopoverDropdown(_a) {
  var _b = _a, {
    children,
    component = "div",
    maxHeight = 220,
    direction = "column",
    id,
    innerRef,
    __staticSelector,
    styles: styles$1,
    classNames,
    unstyled
  } = _b, others = __objRest(_b, [
    "children",
    "component",
    "maxHeight",
    "direction",
    "id",
    "innerRef",
    "__staticSelector",
    "styles",
    "classNames",
    "unstyled"
  ]);
  const { classes } = SelectPopover_styles['default'](null, { name: __staticSelector, styles: styles$1, classNames, unstyled });
  return /* @__PURE__ */ React__default.createElement(Popover.Popover.Dropdown, __spreadValues({
    p: 0,
    onMouseDown: (event) => event.preventDefault()
  }, others), /* @__PURE__ */ React__default.createElement("div", {
    style: { maxHeight: styles.rem(maxHeight), display: "flex" }
  }, /* @__PURE__ */ React__default.createElement(Box.Box, {
    component: component || "div",
    id: `${id}-items`,
    "aria-labelledby": `${id}-label`,
    role: "listbox",
    onMouseDown: (event) => event.preventDefault(),
    style: { flex: 1, overflowY: component !== SelectScrollArea.SelectScrollArea ? "auto" : void 0 },
    "data-combobox-popover": true,
    tabIndex: -1,
    ref: innerRef
  }, /* @__PURE__ */ React__default.createElement("div", {
    className: classes.itemsWrapper,
    style: { flexDirection: direction }
  }, children))));
}
function SelectPopover({
  opened,
  transitionProps = { transition: "fade", duration: 0 },
  shadow,
  withinPortal,
  portalProps,
  children,
  __staticSelector,
  onDirectionChange,
  switchDirectionOnFlip,
  zIndex,
  dropdownPosition,
  positionDependencies = [],
  classNames,
  styles,
  unstyled,
  readOnly,
  variant
}) {
  return /* @__PURE__ */ React__default.createElement(Popover.Popover, {
    unstyled,
    classNames,
    styles,
    width: "target",
    withRoles: false,
    opened,
    middlewares: { flip: dropdownPosition === "flip", shift: false },
    position: dropdownPosition === "flip" ? "bottom" : dropdownPosition,
    positionDependencies,
    zIndex,
    __staticSelector,
    withinPortal,
    portalProps,
    transitionProps,
    shadow,
    disabled: readOnly,
    onPositionChange: (nextPosition) => switchDirectionOnFlip && (onDirectionChange == null ? void 0 : onDirectionChange(nextPosition === "top" ? "column-reverse" : "column")),
    variant
  }, children);
}
SelectPopover.Target = Popover.Popover.Target;
SelectPopover.Dropdown = SelectPopoverDropdown;

exports.SelectPopover = SelectPopover;
//# sourceMappingURL=SelectPopover.js.map
