'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var List_context = require('../List.context.js');
var ListItem_styles = require('./ListItem.styles.js');
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
const defaultProps = {};
const ListItem = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("ListItem", defaultProps, props), { className, children, icon } = _a, others = __objRest(_a, ["className", "children", "icon"]);
  const {
    icon: ctxIcon,
    spacing,
    center,
    listStyleType,
    size,
    withPadding,
    classNames,
    styles: styles$1,
    unstyled,
    variant
  } = List_context.useListContext();
  const _icon = icon || ctxIcon;
  const { classes, cx } = ListItem_styles['default']({ withPadding, listStyleType, center, spacing }, { classNames, styles: styles$1, unstyled, name: "List", variant, size });
  return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues({
    component: "li",
    className: cx(classes.item, className),
    "data-with-icon": !!_icon || void 0,
    ref
  }, others), /* @__PURE__ */ React__default.createElement("div", {
    className: classes.itemWrapper
  }, _icon && /* @__PURE__ */ React__default.createElement("span", {
    className: classes.itemIcon
  }, _icon), /* @__PURE__ */ React__default.createElement("span", null, children)));
});
ListItem.displayName = "@mantine/core/ListItem";

exports.ListItem = ListItem;
//# sourceMappingURL=ListItem.js.map
