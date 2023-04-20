'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var AccordionProvider = require('./AccordionProvider.js');
var AccordionItem = require('./AccordionItem/AccordionItem.js');
var AccordionControl = require('./AccordionControl/AccordionControl.js');
var AccordionPanel = require('./AccordionPanel/AccordionPanel.js');
var ChevronIcon = require('./ChevronIcon.js');
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
  multiple: false,
  disableChevronRotation: false,
  transitionDuration: 200,
  chevronPosition: "right",
  variant: "default",
  chevronSize: 24,
  chevron: /* @__PURE__ */ React__default.createElement(ChevronIcon.ChevronIcon, null)
};
function Accordion(props) {
  const _a = styles.useComponentDefaultProps("Accordion", defaultProps, props), {
    id,
    loop,
    children,
    multiple,
    value,
    defaultValue,
    onChange,
    transitionDuration,
    disableChevronRotation,
    chevronPosition,
    chevronSize,
    order,
    chevron,
    classNames,
    styles: styles$1,
    unstyled,
    variant,
    radius
  } = _a, others = __objRest(_a, [
    "id",
    "loop",
    "children",
    "multiple",
    "value",
    "defaultValue",
    "onChange",
    "transitionDuration",
    "disableChevronRotation",
    "chevronPosition",
    "chevronSize",
    "order",
    "chevron",
    "classNames",
    "styles",
    "unstyled",
    "variant",
    "radius"
  ]);
  return /* @__PURE__ */ React__default.createElement(AccordionProvider.AccordionProvider, {
    id,
    multiple,
    value,
    defaultValue,
    onChange,
    loop,
    transitionDuration,
    disableChevronRotation,
    chevronPosition,
    chevronSize,
    order,
    chevron,
    variant,
    radius,
    classNames,
    styles: styles$1,
    unstyled
  }, /* @__PURE__ */ React__default.createElement(Box.Box, __spreadProps(__spreadValues({}, others), {
    "data-accordion": true
  }), children));
}
Accordion.Item = AccordionItem.AccordionItem;
Accordion.Control = AccordionControl.AccordionControl;
Accordion.Panel = AccordionPanel.AccordionPanel;
Accordion.displayName = "@mantine/core/Accordion";

exports.Accordion = Accordion;
//# sourceMappingURL=Accordion.js.map
