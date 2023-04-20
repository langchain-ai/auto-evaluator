import React from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { useAccordionContext } from '../Accordion.context.js';
import { useAccordionItemContext } from '../AccordionItem.context.js';
import useStyles from './AccordionPanel.styles.js';
import { Collapse } from '../../Collapse/Collapse.js';

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
function AccordionPanel(props) {
  const _a = useComponentDefaultProps("AccordionPanel", defaultProps, props), { children, className } = _a, others = __objRest(_a, ["children", "className"]);
  const ctx = useAccordionContext();
  const { value } = useAccordionItemContext();
  const { classNames, styles, unstyled } = useAccordionContext();
  const { classes, cx } = useStyles({ radius: ctx.radius }, { name: "Accordion", classNames, styles, unstyled, variant: ctx.variant });
  return /* @__PURE__ */ React.createElement(Collapse, __spreadProps(__spreadValues({}, others), {
    className: cx(classes.panel, className),
    in: ctx.isItemActive(value),
    transitionDuration: ctx.transitionDuration,
    role: "region",
    id: ctx.getRegionId(value),
    "aria-labelledby": ctx.getControlId(value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: classes.content
  }, children));
}
AccordionPanel.displayName = "@mantine/core/AccordionPanel";

export { AccordionPanel };
//# sourceMappingURL=AccordionPanel.js.map
