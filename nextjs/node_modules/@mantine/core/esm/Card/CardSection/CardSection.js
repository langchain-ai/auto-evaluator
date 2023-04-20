import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { createPolymorphicComponent } from '@mantine/utils';
import { useCardPadding } from '../Card.context.js';
import useStyles from './CardSection.styles.js';
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
const defaultProps = {
  withBorder: false,
  inheritPadding: false
};
const _CardSection = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("CardSection", defaultProps, props), { className, withBorder, inheritPadding, unstyled, variant } = _a, others = __objRest(_a, ["className", "withBorder", "inheritPadding", "unstyled", "variant"]);
  const { classes, cx } = useStyles({ padding: useCardPadding(), withBorder, inheritPadding }, { name: "Card", unstyled, variant });
  return /* @__PURE__ */ React.createElement(Box, __spreadValues({
    className: cx(classes.cardSection, className),
    ref
  }, others));
});
_CardSection.displayName = "@mantine/core/CardSection";
const CardSection = createPolymorphicComponent(_CardSection);

export { CardSection, _CardSection };
//# sourceMappingURL=CardSection.js.map
