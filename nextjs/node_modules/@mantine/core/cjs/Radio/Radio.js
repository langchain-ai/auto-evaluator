'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('@mantine/hooks');
var styles = require('@mantine/styles');
var RadioIcon = require('./RadioIcon.js');
var RadioGroup_context = require('./RadioGroup.context.js');
var RadioGroup = require('./RadioGroup/RadioGroup.js');
var Radio_styles = require('./Radio.styles.js');
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
  icon: RadioIcon.RadioIcon,
  transitionDuration: 100,
  size: "sm",
  labelPosition: "right"
};
const Radio = React.forwardRef((props, ref) => {
  var _b, _c;
  const _a = styles.useComponentDefaultProps("Radio", defaultProps, props), {
    className,
    style,
    id,
    label,
    size,
    title,
    disabled,
    color,
    classNames,
    styles: styles$1,
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
  const ctx = RadioGroup_context.useRadioGroupContext();
  const contextSize = (_b = ctx == null ? void 0 : ctx.size) != null ? _b : size;
  const componentSize = props.size ? size : contextSize;
  const { classes } = Radio_styles['default']({ color, transitionDuration, labelPosition, error: !!error }, { name: "Radio", classNames, styles: styles$1, unstyled, variant, size: componentSize });
  const { systemStyles, rest } = extractSystemStyles.extractSystemStyles(others);
  const uuid = hooks.useId(id);
  const contextProps = ctx ? {
    checked: ctx.value === rest.value,
    name: (_c = rest.name) != null ? _c : ctx.name,
    onChange: ctx.onChange
  } : {};
  return /* @__PURE__ */ React__default.createElement(InlineInput.InlineInput, __spreadValues(__spreadValues({
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
    styles: styles$1,
    unstyled,
    "data-checked": contextProps.checked || void 0,
    variant
  }, systemStyles), wrapperProps), /* @__PURE__ */ React__default.createElement("div", {
    className: classes.inner
  }, /* @__PURE__ */ React__default.createElement("input", __spreadValues(__spreadValues({
    ref,
    className: classes.radio,
    type: "radio",
    id: uuid,
    disabled
  }, rest), contextProps)), /* @__PURE__ */ React__default.createElement(Icon, {
    className: classes.icon,
    "aria-hidden": true
  })));
});
Radio.displayName = "@mantine/core/Radio";
Radio.Group = RadioGroup.RadioGroup;

exports.Radio = Radio;
//# sourceMappingURL=Radio.js.map
