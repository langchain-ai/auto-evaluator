import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { useListContext } from '../List.context.js';
import useStyles from './ListItem.styles.js';
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
const defaultProps = {};
const ListItem = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("ListItem", defaultProps, props), { className, children, icon } = _a, others = __objRest(_a, ["className", "children", "icon"]);
  const {
    icon: ctxIcon,
    spacing,
    center,
    listStyleType,
    size,
    withPadding,
    classNames,
    styles,
    unstyled,
    variant
  } = useListContext();
  const _icon = icon || ctxIcon;
  const { classes, cx } = useStyles({ withPadding, listStyleType, center, spacing }, { classNames, styles, unstyled, name: "List", variant, size });
  return /* @__PURE__ */ React.createElement(Box, __spreadValues({
    component: "li",
    className: cx(classes.item, className),
    "data-with-icon": !!_icon || void 0,
    ref
  }, others), /* @__PURE__ */ React.createElement("div", {
    className: classes.itemWrapper
  }, _icon && /* @__PURE__ */ React.createElement("span", {
    className: classes.itemIcon
  }, _icon), /* @__PURE__ */ React.createElement("span", null, children)));
});
ListItem.displayName = "@mantine/core/ListItem";

export { ListItem };
//# sourceMappingURL=ListItem.js.map
