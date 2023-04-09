import React, { forwardRef } from 'react';
import { useId } from '@mantine/hooks';
import { useComponentDefaultProps } from '@mantine/styles';
import { RadioIcon } from './RadioIcon.js';
import { useRadioGroupContext } from './RadioGroup.context.js';
import { RadioGroup } from './RadioGroup/RadioGroup.js';
import useStyles from './Radio.styles.js';
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
  icon: RadioIcon,
  transitionDuration: 100,
  size: "sm",
  labelPosition: "right"
};
const Radio = forwardRef((props, ref) => {
  var _b, _c;
  const _a = useComponentDefaultProps("Radio", defaultProps, props), {
    className,
    style,
    id,
    label,
    size,
    title,
    disabled,
    color,
    classNames,
    styles,
    sx,
    icon: Icon,
    transitionDuration,
    wrapperProps,
    unstyled,
    labelPosition,
    description,
    error,
    variant
  } = _a, others = __objRest(_a, [
    "className",
    "style",
    "id",
    "label",
    "size",
    "title",
    "disabled",
    "color",
    "classNames",
    "styles",
    "sx",
    "icon",
    "transitionDuration",
    "wrapperProps",
    "unstyled",
    "labelPosition",
    "description",
    "error",
    "variant"
  ]);
  const ctx = useRadioGroupContext();
  const contextSize = (_b = ctx == null ? void 0 : ctx.size) != null ? _b : size;
  const componentSize = props.size ? size : contextSize;
  const { classes } = useStyles({ color, transitionDuration, labelPosition, error: !!error }, { name: "Radio", classNames, styles, unstyled, variant, size: componentSize });
  const { systemStyles, rest } = extractSystemStyles(others);
  const uuid = useId(id);
  const contextProps = ctx ? {
    checked: ctx.value === rest.value,
    name: (_c = rest.name) != null ? _c : ctx.name,
    onChange: ctx.onChange
  } : {};
  return /* @__PURE__ */ React.createElement(InlineInput, __spreadValues(__spreadValues({
    className,
    sx,
    style,
    id: uuid,
    size: componentSize,
    labelPosition,
    label,
    description,
    error,
    disabled,
    __staticSelector: "Radio",
    classNames,
    styles,
    unstyled,
    "data-checked": contextProps.checked || void 0,
    variant
  }, systemStyles), wrapperProps), /* @__PURE__ */ React.createElement("div", {
    className: classes.inner
  }, /* @__PURE__ */ React.createElement("input", __spreadValues(__spreadValues({
    ref,
    className: classes.radio,
    type: "radio",
    id: uuid,
    disabled
  }, rest), contextProps)), /* @__PURE__ */ React.createElement(Icon, {
    className: classes.icon,
    "aria-hidden": true
  })));
});
Radio.displayName = "@mantine/core/Radio";
Radio.Group = RadioGroup;

export { Radio };
//# sourceMappingURL=Radio.js.map
