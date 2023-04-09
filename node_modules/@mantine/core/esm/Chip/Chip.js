import React, { forwardRef } from 'react';
import { useId, useUncontrolled } from '@mantine/hooks';
import { useComponentDefaultProps } from '@mantine/styles';
import { ChipGroup } from './ChipGroup/ChipGroup.js';
import { useChipGroup } from './ChipGroup.context.js';
import useStyles from './Chip.styles.js';
import { extractSystemStyles } from '../Box/style-system-props/extract-system-styles/extract-system-styles.js';
import { Box } from '../Box/Box.js';
import { CheckIcon } from '../Checkbox/CheckboxIcon.js';

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
  type: "checkbox",
  size: "sm",
  radius: "xl",
  variant: "outline"
};
const Chip = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("Chip", defaultProps, props), {
    radius,
    type,
    size,
    variant,
    disabled,
    id,
    color,
    children,
    className,
    classNames,
    style,
    styles,
    checked,
    defaultChecked,
    onChange,
    sx,
    wrapperProps,
    value,
    unstyled
  } = _a, others = __objRest(_a, [
    "radius",
    "type",
    "size",
    "variant",
    "disabled",
    "id",
    "color",
    "children",
    "className",
    "classNames",
    "style",
    "styles",
    "checked",
    "defaultChecked",
    "onChange",
    "sx",
    "wrapperProps",
    "value",
    "unstyled"
  ]);
  const ctx = useChipGroup();
  const uuid = useId(id);
  const { systemStyles, rest } = extractSystemStyles(others);
  const { classes, cx } = useStyles({ radius, color }, { classNames, styles, unstyled, name: "Chip", variant, size });
  const [_value, setValue] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange
  });
  const contextProps = ctx ? {
    checked: ctx.isChipSelected(value),
    onChange: ctx.onChange,
    type: ctx.multiple ? "checkbox" : "radio"
  } : {};
  const _checked = contextProps.checked || _value;
  return /* @__PURE__ */ React.createElement(Box, __spreadValues(__spreadValues({
    className: cx(classes.root, className),
    style,
    sx
  }, systemStyles), wrapperProps), /* @__PURE__ */ React.createElement("input", __spreadValues(__spreadValues({
    type,
    className: classes.input,
    checked: _checked,
    onChange: (event) => setValue(event.currentTarget.checked),
    id: uuid,
    disabled,
    ref,
    value
  }, contextProps), rest)), /* @__PURE__ */ React.createElement("label", {
    htmlFor: uuid,
    "data-checked": _checked || void 0,
    "data-disabled": disabled || void 0,
    className: classes.label
  }, _checked && /* @__PURE__ */ React.createElement("span", {
    className: classes.iconWrapper
  }, /* @__PURE__ */ React.createElement(CheckIcon, {
    className: classes.checkIcon
  })), children));
});
Chip.displayName = "@mantine/core/Chip";
Chip.Group = ChipGroup;

export { Chip };
//# sourceMappingURL=Chip.js.map
