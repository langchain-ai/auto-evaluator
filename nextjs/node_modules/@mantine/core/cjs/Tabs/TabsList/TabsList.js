'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var Tabs_context = require('../Tabs.context.js');
var TabsList_styles = require('./TabsList.styles.js');
var Box = require('../../Box/Box.js');

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
  grow: false,
  position: "left"
};
const TabsList = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("TabsList", defaultProps, props), { children, className, grow, position } = _a, others = __objRest(_a, ["children", "className", "grow", "position"]);
  const { orientation, variant, color, radius, inverted, placement, classNames, styles: styles$1, unstyled } = Tabs_context.useTabsContext();
  const { classes, cx } = TabsList_styles['default']({ orientation, grow, color, position, radius, inverted, placement }, { name: "Tabs", unstyled, classNames, styles: styles$1, variant });
  return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadProps(__spreadValues({}, others), {
    className: cx(classes.tabsList, className),
    ref,
    role: "tablist",
    "aria-orientation": orientation
  }), children);
});
TabsList.displayName = "@mantine/core/TabsList";

exports.TabsList = TabsList;
//# sourceMappingURL=TabsList.js.map
