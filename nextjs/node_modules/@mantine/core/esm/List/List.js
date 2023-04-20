import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { ListItem } from './ListItem/ListItem.js';
import { ListProvider } from './List.context.js';
import useStyles from './List.styles.js';
import { Box } from '../Box/Box.js';

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
  type: "unordered",
  size: "md",
  spacing: 0
};
const List = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("List", defaultProps, props), {
    children,
    type,
    size,
    listStyleType,
    withPadding,
    center,
    spacing,
    icon,
    className,
    styles,
    classNames,
    unstyled,
    variant
  } = _a, others = __objRest(_a, [
    "children",
    "type",
    "size",
    "listStyleType",
    "withPadding",
    "center",
    "spacing",
    "icon",
    "className",
    "styles",
    "classNames",
    "unstyled",
    "variant"
  ]);
  const { classes, cx } = useStyles({ withPadding, listStyleType, center, spacing }, { classNames, styles, name: "List", unstyled, size, variant });
  return /* @__PURE__ */ React.createElement(ListProvider, {
    value: {
      spacing,
      center,
      icon,
      listStyleType,
      size,
      withPadding,
      classNames,
      styles,
      unstyled,
      variant
    }
  }, /* @__PURE__ */ React.createElement(Box, __spreadValues({
    component: type === "unordered" ? "ul" : "ol",
    className: cx(classes.root, className),
    ref
  }, others), children));
});
List.Item = ListItem;
List.displayName = "@mantine/core/List";

export { List };
//# sourceMappingURL=List.js.map
