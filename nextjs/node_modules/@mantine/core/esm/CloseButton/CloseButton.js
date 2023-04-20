import React, { forwardRef } from 'react';
import { rem, useComponentDefaultProps } from '@mantine/styles';
import { createPolymorphicComponent } from '@mantine/utils';
import { ActionIcon } from '../ActionIcon/ActionIcon.js';
import { CloseIcon } from './CloseIcon.js';

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
const iconSizes = {
  xs: rem(12),
  sm: rem(16),
  md: rem(20),
  lg: rem(28),
  xl: rem(34)
};
const defaultProps = {
  size: "sm"
};
const _CloseButton = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("CloseButton", defaultProps, props), { iconSize, size, children } = _a, others = __objRest(_a, ["iconSize", "size", "children"]);
  const _iconSize = rem(iconSize || iconSizes[size]);
  return /* @__PURE__ */ React.createElement(ActionIcon, __spreadValues({
    ref,
    __staticSelector: "CloseButton",
    size
  }, others), children || /* @__PURE__ */ React.createElement(CloseIcon, {
    width: _iconSize,
    height: _iconSize
  }));
});
_CloseButton.displayName = "@mantine/core/CloseButton";
const CloseButton = createPolymorphicComponent(_CloseButton);

export { CloseButton, _CloseButton };
//# sourceMappingURL=CloseButton.js.map
