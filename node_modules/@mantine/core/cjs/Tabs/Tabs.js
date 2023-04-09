'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var TabsList = require('./TabsList/TabsList.js');
var TabsPanel = require('./TabsPanel/TabsPanel.js');
var Tab = require('./Tab/Tab.js');
var TabsProvider = require('./TabsProvider.js');
var Tabs_styles = require('./Tabs.styles.js');
var Box = require('../Box/Box.js');

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
  orientation: "horizontal",
  loop: true,
  activateTabWithKeyboard: true,
  allowTabDeactivation: false,
  unstyled: false,
  inverted: false,
  variant: "default",
  placement: "left"
};
const Tabs = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("Tabs", defaultProps, props), {
    defaultValue,
    value,
    orientation,
    loop,
    activateTabWithKeyboard,
    allowTabDeactivation,
    children,
    id,
    onTabChange,
    variant,
    color,
    className,
    unstyled,
    classNames,
    styles: styles$1,
    radius,
    inverted,
    keepMounted,
    placement
  } = _a, others = __objRest(_a, [
    "defaultValue",
    "value",
    "orientation",
    "loop",
    "activateTabWithKeyboard",
    "allowTabDeactivation",
    "children",
    "id",
    "onTabChange",
    "variant",
    "color",
    "className",
    "unstyled",
    "classNames",
    "styles",
    "radius",
    "inverted",
    "keepMounted",
    "placement"
  ]);
  const { classes, cx } = Tabs_styles['default']({ orientation, color, radius, inverted, placement }, { unstyled, name: "Tabs", classNames, styles: styles$1, variant });
  return /* @__PURE__ */ React__default.createElement(TabsProvider.TabsProvider, {
    activateTabWithKeyboard,
    defaultValue,
    orientation,
    onTabChange,
    value,
    id,
    loop,
    allowTabDeactivation,
    color,
    variant,
    radius,
    inverted,
    keepMounted,
    placement,
    classNames,
    styles: styles$1,
    unstyled
  }, /* @__PURE__ */ React__default.createElement(Box.Box, __spreadProps(__spreadValues({}, others), {
    className: cx(classes.root, className),
    id,
    ref
  }), children));
});
Tabs.List = TabsList.TabsList;
Tabs.Tab = Tab.Tab;
Tabs.Panel = TabsPanel.TabsPanel;
Tabs.displayName = "@mantine/core/Tabs";

exports.Tabs = Tabs;
//# sourceMappingURL=Tabs.js.map
