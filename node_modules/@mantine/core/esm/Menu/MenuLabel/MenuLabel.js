import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { useMenuContext } from '../Menu.context.js';
import useStyles from './MenuLabel.styles.js';
import { Text } from '../../Text/Text.js';

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
const MenuLabel = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("MenuLabel", defaultProps, props), { children, className } = _a, others = __objRest(_a, ["children", "className"]);
  const { classNames, styles, unstyled, variant } = useMenuContext();
  const { classes, cx } = useStyles(null, { name: "Menu", classNames, styles, unstyled, variant });
  return /* @__PURE__ */ React.createElement(Text, __spreadValues({
    className: cx(classes.label, className),
    ref
  }, others), children);
});
MenuLabel.displayName = "@mantine/core/MenuLabel";

export { MenuLabel };
//# sourceMappingURL=MenuLabel.js.map
