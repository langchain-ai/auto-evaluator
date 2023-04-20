import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { createPolymorphicComponent } from '@mantine/utils';
import useStyles from './UnstyledButton.styles.js';
import { Box } from '../Box/Box.js';

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
const _UnstyledButton = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("UnstyledButton", {}, props), {
    className,
    component = "button",
    unstyled,
    variant
  } = _a, others = __objRest(_a, [
    "className",
    "component",
    "unstyled",
    "variant"
  ]);
  const { classes, cx } = useStyles(null, { name: "UnstyledButton", unstyled, variant });
  return /* @__PURE__ */ React.createElement(Box, __spreadValues({
    component,
    ref,
    className: cx(classes.root, className),
    type: component === "button" ? "button" : void 0
  }, others));
});
_UnstyledButton.displayName = "@mantine/core/UnstyledButton";
const UnstyledButton = createPolymorphicComponent(_UnstyledButton);

export { UnstyledButton, _UnstyledButton };
//# sourceMappingURL=UnstyledButton.js.map
