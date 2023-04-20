'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('@mantine/hooks');
var styles = require('@mantine/styles');
var ChipGroup = require('./ChipGroup/ChipGroup.js');
var ChipGroup_context = require('./ChipGroup.context.js');
var Chip_styles = require('./Chip.styles.js');
var extractSystemStyles = require('../Box/style-system-props/extract-system-styles/extract-system-styles.js');
var Box = require('../Box/Box.js');
var CheckboxIcon = require('../Checkbox/CheckboxIcon.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
const Chip = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("Chip", defaultProps, props), {
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
    styles: styles$1,
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
  const ctx = ChipGroup_context.useChipGroup();
  const uuid = hooks.useId(id);
  const { systemStyles, rest } = extractSystemStyles.extractSystemStyles(others);
  const { classes, cx } = Chip_styles['default']({ radius, color }, { classNames, styles: styles$1, unstyled, name: "Chip", variant, size });
  const [_value, setValue] = hooks.useUncontrolled({
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
  return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues(__spreadValues({
    className: cx(classes.root, className),
    style,
    sx
  }, systemStyles), wrapperProps), /* @__PURE__ */ React__default.createElement("input", __spreadValues(__spreadValues({
    type,
    className: classes.input,
    checked: _checked,
    onChange: (event) => setValue(event.currentTarget.checked),
    id: uuid,
    disabled,
    ref,
    value
  }, contextProps), rest)), /* @__PURE__ */ React__default.createElement("label", {
    htmlFor: uuid,
    "data-checked": _checked || void 0,
    "data-disabled": disabled || void 0,
    className: classes.label
  }, _checked && /* @__PURE__ */ React__default.createElement("span", {
    className: classes.iconWrapper
  }, /* @__PURE__ */ React__default.createElement(CheckboxIcon.CheckIcon, {
    className: classes.checkIcon
  })), children));
});
Chip.displayName = "@mantine/core/Chip";
Chip.Group = ChipGroup.ChipGroup;

exports.Chip = Chip;
//# sourceMappingURL=Chip.js.map
