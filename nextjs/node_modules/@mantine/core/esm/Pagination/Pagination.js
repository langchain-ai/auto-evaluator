import React from 'react';
import { useComponentDefaultProps, useMantineTheme, getSize } from '@mantine/styles';
import { PaginationRoot } from './PaginationRoot/PaginationRoot.js';
import { PaginationItems } from './PaginationItems/PaginationItems.js';
import { PaginationControl } from './PaginationControl/PaginationControl.js';
import { PaginationDots } from './PaginationDots/PaginationDots.js';
import { PaginationFirst, PaginationPrevious, PaginationNext, PaginationLast } from './PaginationEdges/PaginationEdges.js';
import { Group } from '../Group/Group.js';

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
  const _a = useComponentDefaultProps("Pagination", defaultProps, props), {
    withEdges,
    withControls,
    classNames,
    styles,
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
  const theme = useMantineTheme();
  if (total <= 0) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(PaginationRoot, {
    classNames,
    styles,
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
  }, /* @__PURE__ */ React.createElement(Group, __spreadValues({
    spacing: spacing != null ? spacing : `calc(${getSize({ size, sizes: theme.spacing })} / 2)`
  }, others), withEdges && /* @__PURE__ */ React.createElement(PaginationFirst, __spreadValues({
    icon: firstIcon
  }, getControlProps == null ? void 0 : getControlProps("first"))), withControls && /* @__PURE__ */ React.createElement(PaginationPrevious, __spreadValues({
    icon: previousIcon
  }, getControlProps == null ? void 0 : getControlProps("previous"))), /* @__PURE__ */ React.createElement(PaginationItems, {
    dotsIcon
  }), withControls && /* @__PURE__ */ React.createElement(PaginationNext, __spreadValues({
    icon: nextIcon
  }, getControlProps == null ? void 0 : getControlProps("next"))), withEdges && /* @__PURE__ */ React.createElement(PaginationLast, __spreadValues({
    icon: lastIcon
  }, getControlProps == null ? void 0 : getControlProps("last")))));
}
Pagination.displayName = "@mantine/core/Pagination";
Pagination.Root = PaginationRoot;
Pagination.Items = PaginationItems;
Pagination.Control = PaginationControl;
Pagination.Dots = PaginationDots;
Pagination.Next = PaginationNext;
Pagination.Previous = PaginationPrevious;
Pagination.Last = PaginationLast;
Pagination.First = PaginationFirst;

export { Pagination };
//# sourceMappingURL=Pagination.js.map
