import React, { forwardRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useId } from '@mantine/hooks';
import { useComponentDefaultProps } from '@mantine/styles';
import useStyles from './Textarea.styles.js';
import { extractSystemStyles } from '../Box/style-system-props/extract-system-styles/extract-system-styles.js';
import { Input } from '../Input/Input.js';

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
  autosize: false,
  size: "sm",
  __staticSelector: "Textarea"
};
const Textarea = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("Textarea", defaultProps, props), {
    autosize,
    maxRows,
    minRows,
    label,
    error,
    description,
    id,
    className,
    required,
    style,
    wrapperProps,
    classNames,
    styles,
    size,
    __staticSelector,
    sx,
    errorProps,
    descriptionProps,
    labelProps,
    inputWrapperOrder,
    inputContainer,
    unstyled,
    withAsterisk,
    variant
  } = _a, others = __objRest(_a, [
    "autosize",
    "maxRows",
    "minRows",
    "label",
    "error",
    "description",
    "id",
    "className",
    "required",
    "style",
    "wrapperProps",
    "classNames",
    "styles",
    "size",
    "__staticSelector",
    "sx",
    "errorProps",
    "descriptionProps",
    "labelProps",
    "inputWrapperOrder",
    "inputContainer",
    "unstyled",
    "withAsterisk",
    "variant"
  ]);
  const uuid = useId(id);
  const { classes, cx } = useStyles();
  const { systemStyles, rest } = extractSystemStyles(others);
  const sharedProps = __spreadValues({
    required,
    ref,
    error,
    id: uuid,
    classNames: __spreadProps(__spreadValues({}, classNames), { input: cx(classes.input, classNames == null ? void 0 : classNames.input) }),
    styles,
    __staticSelector,
    size,
    multiline: true,
    unstyled,
    variant
  }, rest);
  return /* @__PURE__ */ React.createElement(Input.Wrapper, __spreadValues(__spreadValues({
    label,
    error,
    id: uuid,
    description,
    required,
    style,
    className,
    classNames,
    styles,
    size,
    __staticSelector,
    sx,
    errorProps,
    labelProps,
    descriptionProps,
    inputContainer,
    inputWrapperOrder,
    unstyled,
    withAsterisk,
    variant
  }, systemStyles), wrapperProps), autosize ? /* @__PURE__ */ React.createElement(Input, __spreadProps(__spreadValues({}, sharedProps), {
    component: TextareaAutosize,
    maxRows,
    minRows
  })) : /* @__PURE__ */ React.createElement(Input, __spreadProps(__spreadValues({}, sharedProps), {
    component: "textarea",
    rows: minRows
  })));
});
Textarea.displayName = "@mantine/core/Textarea";

export { Textarea };
//# sourceMappingURL=Textarea.js.map
