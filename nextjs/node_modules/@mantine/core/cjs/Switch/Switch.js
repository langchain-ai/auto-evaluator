'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('@mantine/hooks');
var styles = require('@mantine/styles');
var SwitchGroup = require('./SwitchGroup/SwitchGroup.js');
var SwitchGroup_context = require('./SwitchGroup.context.js');
var Switch_styles = require('./Switch.styles.js');
var extractSystemStyles = require('../Box/style-system-props/extract-system-styles/extract-system-styles.js');
var InlineInput = require('../InlineInput/InlineInput.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
  offLabel: "",
  onLabel: "",
  size: "sm",
  radius: "xl",
  error: false
};
const Switch = React.forwardRef((props, ref) => {
  var _b;
  const _a = styles.useComponentDefaultProps("Switch", defaultProps, props), {
    className,
    color,
    label,
    offLabel,
    onLabel,
    id,
    style,
    size,
    radius,
    wrapperProps,
    children,
    unstyled,
    styles: styles$1,
    classNames,
    thumbIcon,
    sx,
    checked,
    defaultChecked,
    onChange,
    labelPosition,
    description,
    error,
    disabled,
    variant
  } = _a, others = __objRest(_a, [
    "className",
    "color",
    "label",
    "offLabel",
    "onLabel",
    "id",
    "style",
    "size",
    "radius",
    "wrapperProps",
    "children",
    "unstyled",
    "styles",
    "classNames",
    "thumbIcon",
    "sx",
    "checked",
    "defaultChecked",
    "onChange",
    "labelPosition",
    "description",
    "error",
    "disabled",
    "variant"
  ]);
  const ctx = SwitchGroup_context.useSwitchGroupContext();
  const _size = (ctx == null ? void 0 : ctx.size) || size;
  const { classes, cx } = Switch_styles['default']({ color, radius, labelPosition, error: !!error }, { name: "Switch", classNames, styles: styles$1, unstyled, size: _size, variant });
  const { systemStyles, rest } = extractSystemStyles.extractSystemStyles(others);
  const uuid = hooks.useId(id);
  const contextProps = ctx ? {
    checked: ctx.value.includes(rest.value),
    onChange: ctx.onChange
  } : {};
  const [_checked, handleChange] = hooks.useUncontrolled({
    value: (_b = contextProps.checked) != null ? _b : checked,
    defaultValue: defaultChecked,
    finalValue: false
  });
  return /* @__PURE__ */ React__default.createElement(InlineInput.InlineInput, __spreadValues(__spreadValues({
    className: cx(className, classes.root),
    sx,
    style,
    id: uuid,
    size: (ctx == null ? void 0 : ctx.size) || size,
    labelPosition,
    label,
    description,
    error,
    disabled,
    __staticSelector: "Switch",
    classNames,
    styles: styles$1,
    unstyled,
    "data-checked": contextProps.checked || void 0,
    variant
  }, systemStyles), wrapperProps), /* @__PURE__ */ React__default.createElement("input", __spreadProps(__spreadValues({}, rest), {
    disabled,
    checked: _checked,
    onChange: (event) => {
      ctx ? contextProps.onChange(event) : onChange == null ? void 0 : onChange(event);
      handleChange(event.currentTarget.checked);
    },
    id: uuid,
    ref,
    type: "checkbox",
    className: classes.input
  })), /* @__PURE__ */ React__default.createElement("label", {
    htmlFor: uuid,
    className: classes.track
  }, /* @__PURE__ */ React__default.createElement("div", {
    className: classes.thumb
  }, thumbIcon), /* @__PURE__ */ React__default.createElement("div", {
    className: classes.trackLabel
  }, _checked ? onLabel : offLabel)));
});
Switch.displayName = "@mantine/core/Switch";
Switch.Group = SwitchGroup.SwitchGroup;

exports.Switch = Switch;
//# sourceMappingURL=Switch.js.map
