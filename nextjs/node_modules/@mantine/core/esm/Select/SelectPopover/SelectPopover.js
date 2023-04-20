import React from 'react';
import { rem } from '@mantine/styles';
import { SelectScrollArea } from '../SelectScrollArea/SelectScrollArea.js';
import useStyles from './SelectPopover.styles.js';
import { Popover } from '../../Popover/Popover.js';
import { Box } from '../../Box/Box.js';

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
    styles,
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
  const { classes } = useStyles(null, { name: __staticSelector, styles, classNames, unstyled });
  return /* @__PURE__ */ React.createElement(Popover.Dropdown, __spreadValues({
    p: 0,
    onMouseDown: (event) => event.preventDefault()
  }, others), /* @__PURE__ */ React.createElement("div", {
    style: { maxHeight: rem(maxHeight), display: "flex" }
  }, /* @__PURE__ */ React.createElement(Box, {
    component: component || "div",
    id: `${id}-items`,
    "aria-labelledby": `${id}-label`,
    role: "listbox",
    onMouseDown: (event) => event.preventDefault(),
    style: { flex: 1, overflowY: component !== SelectScrollArea ? "auto" : void 0 },
    "data-combobox-popover": true,
    tabIndex: -1,
    ref: innerRef
  }, /* @__PURE__ */ React.createElement("div", {
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
  return /* @__PURE__ */ React.createElement(Popover, {
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
SelectPopover.Target = Popover.Target;
SelectPopover.Dropdown = SelectPopoverDropdown;

export { SelectPopover };
//# sourceMappingURL=SelectPopover.js.map
