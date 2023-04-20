import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { useId } from '@mantine/hooks';
import { useCheckboxGroupContext } from './CheckboxGroup.context.js';
import { CheckboxGroup } from './CheckboxGroup/CheckboxGroup.js';
import { CheckboxIcon } from './CheckboxIcon.js';
import useStyles from './Checkbox.styles.js';
import { extractSystemStyles } from '../Box/style-system-props/extract-system-styles/extract-system-styles.js';
import { InlineInput } from '../InlineInput/InlineInput.js';

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
  size: "sm",
  transitionDuration: 100,
  icon: CheckboxIcon,
  labelPosition: "right"
};
const Checkbox = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("Checkbox", defaultProps, props), {
    className,
    style,
    sx,
    checked,
    disabled,
    color,
    label,
    indeterminate,
    id,
    size,
    radius,
    wrapperProps,
    children,
    classNames,
    styles,
    transitionDuration,
    icon: Icon,
    unstyled,
    labelPosition,
    description,
    error,
    variant
  } = _a, others = __objRest(_a, [
    "className",
    "style",
    "sx",
    "checked",
    "disabled",
    "color",
    "label",
    "indeterminate",
    "id",
    "size",
    "radius",
    "wrapperProps",
    "children",
    "classNames",
    "styles",
    "transitionDuration",
    "icon",
    "unstyled",
    "labelPosition",
    "description",
    "error",
    "variant"
  ]);
  const ctx = useCheckboxGroupContext();
  const uuid = useId(id);
  const { systemStyles, rest } = extractSystemStyles(others);
  const { classes } = useStyles({
    radius,
    color,
    transitionDuration,
    labelPosition,
    error: !!error,
    indeterminate
  }, { name: "Checkbox", classNames, styles, unstyled, variant, size: (ctx == null ? void 0 : ctx.size) || size });
  const contextProps = ctx ? {
    checked: ctx.value.includes(rest.value),
    onChange: ctx.onChange
  } : {};
  return /* @__PURE__ */ React.createElement(InlineInput, __spreadValues(__spreadValues({
    className,
    sx,
    style,
    id: uuid,
    size: (ctx == null ? void 0 : ctx.size) || size,
    labelPosition,
    label,
    description,
    error,
    disabled,
    __staticSelector: "Checkbox",
    classNames,
    styles,
    unstyled,
    "data-checked": contextProps.checked || void 0,
    variant
  }, systemStyles), wrapperProps), /* @__PURE__ */ React.createElement("div", {
    className: classes.inner
  }, /* @__PURE__ */ React.createElement("input", __spreadValues(__spreadValues({
    id: uuid,
    ref,
    type: "checkbox",
    className: classes.input,
    checked,
    disabled
  }, rest), contextProps)), /* @__PURE__ */ React.createElement(Icon, {
    indeterminate,
    className: classes.icon
  })));
});
Checkbox.displayName = "@mantine/core/Checkbox";
Checkbox.Group = CheckboxGroup;

export { Checkbox };
//# sourceMappingURL=Checkbox.js.map
