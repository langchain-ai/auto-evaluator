'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var PaginationRoot = require('./PaginationRoot/PaginationRoot.js');
var PaginationItems = require('./PaginationItems/PaginationItems.js');
var PaginationControl = require('./PaginationControl/PaginationControl.js');
var PaginationDots = require('./PaginationDots/PaginationDots.js');
var PaginationEdges = require('./PaginationEdges/PaginationEdges.js');
var Group = require('../Group/Group.js');

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
  withControls: true,
  siblings: 1,
  boundaries: 1
};
function Pagination(props) {
  const _a = styles.useComponentDefaultProps("Pagination", defaultProps, props), {
    withEdges,
    withControls,
    classNames,
    styles: styles$1,
    unstyled,
    variant,
    size,
    total,
    value,
    defaultValue,
    onChange,
    disabled,
    siblings,
    boundaries,
    color,
    radius,
    onNextPage,
    onPreviousPage,
    onFirstPage,
    onLastPage,
    getItemProps,
    getControlProps,
    spacing,
    nextIcon,
    previousIcon,
    lastIcon,
    firstIcon,
    dotsIcon
  } = _a, others = __objRest(_a, [
    "withEdges",
    "withControls",
    "classNames",
    "styles",
    "unstyled",
    "variant",
    "size",
    "total",
    "value",
    "defaultValue",
    "onChange",
    "disabled",
    "siblings",
    "boundaries",
    "color",
    "radius",
    "onNextPage",
    "onPreviousPage",
    "onFirstPage",
    "onLastPage",
    "getItemProps",
    "getControlProps",
    "spacing",
    "nextIcon",
    "previousIcon",
    "lastIcon",
    "firstIcon",
    "dotsIcon"
  ]);
  const theme = styles.useMantineTheme();
  if (total <= 0) {
    return null;
  }
  return /* @__PURE__ */ React__default.createElement(PaginationRoot.PaginationRoot, {
    classNames,
    styles: styles$1,
    unstyled,
    variant,
    size,
    total,
    value,
    defaultValue,
    onChange,
    disabled,
    siblings,
    boundaries,
    color,
    radius,
    onNextPage,
    onPreviousPage,
    onFirstPage,
    onLastPage,
    getItemProps
  }, /* @__PURE__ */ React__default.createElement(Group.Group, __spreadValues({
    spacing: spacing != null ? spacing : `calc(${styles.getSize({ size, sizes: theme.spacing })} / 2)`
  }, others), withEdges && /* @__PURE__ */ React__default.createElement(PaginationEdges.PaginationFirst, __spreadValues({
    icon: firstIcon
  }, getControlProps == null ? void 0 : getControlProps("first"))), withControls && /* @__PURE__ */ React__default.createElement(PaginationEdges.PaginationPrevious, __spreadValues({
    icon: previousIcon
  }, getControlProps == null ? void 0 : getControlProps("previous"))), /* @__PURE__ */ React__default.createElement(PaginationItems.PaginationItems, {
    dotsIcon
  }), withControls && /* @__PURE__ */ React__default.createElement(PaginationEdges.PaginationNext, __spreadValues({
    icon: nextIcon
  }, getControlProps == null ? void 0 : getControlProps("next"))), withEdges && /* @__PURE__ */ React__default.createElement(PaginationEdges.PaginationLast, __spreadValues({
    icon: lastIcon
  }, getControlProps == null ? void 0 : getControlProps("last")))));
}
Pagination.displayName = "@mantine/core/Pagination";
Pagination.Root = PaginationRoot.PaginationRoot;
Pagination.Items = PaginationItems.PaginationItems;
Pagination.Control = PaginationControl.PaginationControl;
Pagination.Dots = PaginationDots.PaginationDots;
Pagination.Next = PaginationEdges.PaginationNext;
Pagination.Previous = PaginationEdges.PaginationPrevious;
Pagination.Last = PaginationEdges.PaginationLast;
Pagination.First = PaginationEdges.PaginationFirst;

exports.Pagination = Pagination;
//# sourceMappingURL=Pagination.js.map
