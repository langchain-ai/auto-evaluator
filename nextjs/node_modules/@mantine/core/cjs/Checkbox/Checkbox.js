'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var hooks = require('@mantine/hooks');
var CheckboxGroup_context = require('./CheckboxGroup.context.js');
var CheckboxGroup = require('./CheckboxGroup/CheckboxGroup.js');
var CheckboxIcon = require('./CheckboxIcon.js');
var Checkbox_styles = require('./Checkbox.styles.js');
var extractSystemStyles = require('../Box/style-system-props/extract-system-styles/extract-system-styles.js');
var InlineInput = require('../InlineInput/InlineInput.js');

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
  size: "sm",
  transitionDuration: 100,
  icon: CheckboxIcon.CheckboxIcon,
  labelPosition: "right"
};
const Checkbox = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("Checkbox", defaultProps, props), {
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
    styles: styles$1,
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
  const ctx = CheckboxGroup_context.useCheckboxGroupContext();
  const uuid = hooks.useId(id);
  const { systemStyles, rest } = extractSystemStyles.extractSystemStyles(others);
  const { classes } = Checkbox_styles['default']({
    radius,
    color,
    transitionDuration,
    labelPosition,
    error: !!error,
    indeterminate
  }, { name: "Checkbox", classNames, styles: styles$1, unstyled, variant, size: (ctx == null ? void 0 : ctx.size) || size });
  const contextProps = ctx ? {
    checked: ctx.value.includes(rest.value),
    onChange: ctx.onChange
  } : {};
  return /* @__PURE__ */ React__default.createElement(InlineInput.InlineInput, __spreadValues(__spreadValues({
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
    styles: styles$1,
    unstyled,
    "data-checked": contextProps.checked || void 0,
    variant
  }, systemStyles), wrapperProps), /* @__PURE__ */ React__default.createElement("div", {
    className: classes.inner
  }, /* @__PURE__ */ React__default.createElement("input", __spreadValues(__spreadValues({
    id: uuid,
    ref,
    type: "checkbox",
    className: classes.input,
    checked,
    disabled
  }, rest), contextProps)), /* @__PURE__ */ React__default.createElement(Icon, {
    indeterminate,
    className: classes.icon
  })));
});
Checkbox.displayName = "@mantine/core/Checkbox";
Checkbox.Group = CheckboxGroup.CheckboxGroup;

exports.Checkbox = Checkbox;
//# sourceMappingURL=Checkbox.js.map
