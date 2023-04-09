import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { AccordionItemContextProvider } from '../AccordionItem.context.js';
import useStyles from './AccordionItem.styles.js';
import { useAccordionContext } from '../Accordion.context.js';
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
const AccordionItem = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("AccordionItem", defaultProps, props), { children, className, value } = _a, others = __objRest(_a, ["children", "className", "value"]);
  const ctx = useAccordionContext();
  const { classes, cx } = useStyles({ radius: ctx.radius }, {
    name: "Accordion",
    classNames: ctx.classNames,
    styles: ctx.styles,
    unstyled: ctx.unstyled,
    variant: ctx.variant
  });
  return /* @__PURE__ */ React.createElement(AccordionItemContextProvider, {
    value: { value }
  }, /* @__PURE__ */ React.createElement(Box, __spreadValues({
    ref,
    className: cx(classes.item, className),
    "data-active": ctx.isItemActive(value) || void 0
  }, others), children));
});
AccordionItem.displayName = "@mantine/core/AccordionItem";

export { AccordionItem };
//# sourceMappingURL=AccordionItem.js.map
