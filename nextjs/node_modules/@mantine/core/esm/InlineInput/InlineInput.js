import React, { forwardRef } from 'react';
import useStyles from './InlineInput.styles.js';
import { Box } from '../Box/Box.js';
import { Input } from '../Input/Input.js';

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
const InlineInput = forwardRef((_a, ref) => {
  var _b = _a, {
    __staticSelector,
    className,
    classNames,
    styles,
    unstyled,
    children,
    label,
    description,
    id,
    disabled,
    error,
    size,
    labelPosition,
    variant
  } = _b, others = __objRest(_b, [
    "__staticSelector",
    "className",
    "classNames",
    "styles",
    "unstyled",
    "children",
    "label",
    "description",
    "id",
    "disabled",
    "error",
    "size",
    "labelPosition",
    "variant"
  ]);
  const { classes, cx } = useStyles({ labelPosition }, { name: __staticSelector, styles, classNames, unstyled, variant, size });
  return /* @__PURE__ */ React.createElement(Box, __spreadValues({
    className: cx(classes.root, className),
    ref
  }, others), /* @__PURE__ */ React.createElement("div", {
    className: cx(classes.body)
  }, children, /* @__PURE__ */ React.createElement("div", {
    className: classes.labelWrapper
  }, label && /* @__PURE__ */ React.createElement("label", {
    className: classes.label,
    "data-disabled": disabled || void 0,
    htmlFor: id
  }, label), description && /* @__PURE__ */ React.createElement(Input.Description, {
    className: classes.description
  }, description), error && error !== "boolean" && /* @__PURE__ */ React.createElement(Input.Error, {
    className: classes.error
  }, error))));
});
InlineInput.displayName = "@mantine/core/InlineInput";

export { InlineInput };
//# sourceMappingURL=InlineInput.js.map
