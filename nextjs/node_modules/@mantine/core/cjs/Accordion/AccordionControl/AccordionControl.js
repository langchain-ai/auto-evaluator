'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var utils = require('@mantine/utils');
var Accordion_context = require('../Accordion.context.js');
var AccordionItem_context = require('../AccordionItem.context.js');
var AccordionControl_styles = require('./AccordionControl.styles.js');
var UnstyledButton = require('../../UnstyledButton/UnstyledButton.js');

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
const defaultProps = {};
const AccordionControl = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("AccordionControl", defaultProps, props), { disabled, onKeyDown, onClick, chevron, children, className, icon } = _a, others = __objRest(_a, ["disabled", "onKeyDown", "onClick", "chevron", "children", "className", "icon"]);
  const ctx = Accordion_context.useAccordionContext();
  const { value } = AccordionItem_context.useAccordionItemContext();
  const { classes, cx } = AccordionControl_styles['default']({
    transitionDuration: ctx.transitionDuration,
    chevronPosition: ctx.chevronPosition,
    chevronSize: ctx.chevronSize,
    radius: ctx.radius
  }, {
    name: "Accordion",
    classNames: ctx.classNames,
    styles: ctx.styles,
    unstyled: ctx.unstyled,
    variant: ctx.variant
  });
  const isActive = ctx.isItemActive(value);
  const shouldWrapWithHeading = typeof ctx.order === "number";
  const Heading = `h${ctx.order}`;
  const content = /* @__PURE__ */ React__default.createElement(UnstyledButton.UnstyledButton, __spreadProps(__spreadValues({}, others), {
    ref,
    "data-accordion-control": true,
    disabled,
    className: cx(classes.control, className),
    onClick: (event) => {
      onClick == null ? void 0 : onClick(event);
      ctx.onChange(value);
    },
    type: "button",
    "data-active": isActive || void 0,
    "aria-expanded": isActive,
    "aria-controls": ctx.getRegionId(value),
    id: ctx.getControlId(value),
    unstyled: ctx.unstyled,
    onKeyDown: utils.createScopedKeydownHandler({
      siblingSelector: "[data-accordion-control]",
      parentSelector: "[data-accordion]",
      activateOnFocus: false,
      loop: ctx.loop,
      orientation: "vertical",
      onKeyDown
    })
  }), /* @__PURE__ */ React__default.createElement("span", {
    className: classes.chevron,
    "data-rotate": !ctx.disableChevronRotation && isActive || void 0
  }, chevron || ctx.chevron), /* @__PURE__ */ React__default.createElement("span", {
    className: classes.label
  }, children), icon && /* @__PURE__ */ React__default.createElement("span", {
    className: classes.icon
  }, icon));
  return shouldWrapWithHeading ? /* @__PURE__ */ React__default.createElement(Heading, {
    className: classes.itemTitle
  }, content) : content;
});
AccordionControl.displayName = "@mantine/core/AccordionControl";

exports.AccordionControl = AccordionControl;
//# sourceMappingURL=AccordionControl.js.map
