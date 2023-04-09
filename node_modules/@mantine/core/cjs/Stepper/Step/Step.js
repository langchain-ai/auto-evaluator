'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var Step_styles = require('./Step.styles.js');
var UnstyledButton = require('../../UnstyledButton/UnstyledButton.js');
var Transition = require('../../Transition/Transition.js');
var Loader = require('../../Loader/Loader.js');
var CheckboxIcon = require('../../Checkbox/CheckboxIcon.js');
var Text = require('../../Text/Text.js');

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
const defaultIconSizes = {
  xs: 16,
  sm: 18,
  md: 20,
  lg: 22,
  xl: 24
};
const defaultProps = {
  withIcon: true,
  size: "md",
  radius: "xl",
  allowStepClick: true,
  iconPosition: "left",
  __staticSelector: "Step"
};
const getStepFragment = (Fragment, step) => {
  if (typeof Fragment === "function") {
    return /* @__PURE__ */ React__default.createElement(Fragment, {
      step
    });
  }
  return Fragment;
};
const Step = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("StepperStep", defaultProps, props), {
    className,
    step,
    state,
    color,
    icon,
    completedIcon,
    progressIcon,
    label,
    description,
    withIcon,
    iconSize,
    size,
    radius,
    loading,
    allowStepClick,
    allowStepSelect,
    iconPosition,
    __staticSelector,
    classNames,
    styles: styles$1,
    unstyled,
    orientation,
    variant
  } = _a, others = __objRest(_a, [
    "className",
    "step",
    "state",
    "color",
    "icon",
    "completedIcon",
    "progressIcon",
    "label",
    "description",
    "withIcon",
    "iconSize",
    "size",
    "radius",
    "loading",
    "allowStepClick",
    "allowStepSelect",
    "iconPosition",
    "__staticSelector",
    "classNames",
    "styles",
    "unstyled",
    "orientation",
    "variant"
  ]);
  const { classes, cx } = Step_styles['default']({ color, iconSize, radius, allowStepClick, iconPosition, orientation }, { name: __staticSelector, classNames, styles: styles$1, unstyled, variant, size });
  const _iconSize = styles.getSize({ size, sizes: defaultIconSizes });
  const _icon = state === "stepCompleted" ? null : state === "stepProgress" ? progressIcon : icon;
  const dataAttributes = {
    "data-progress": state === "stepProgress" || void 0,
    "data-completed": state === "stepCompleted" || void 0
  };
  return /* @__PURE__ */ React__default.createElement(UnstyledButton.UnstyledButton, __spreadValues(__spreadValues({
    className: cx(classes.step, className),
    tabIndex: allowStepClick ? 0 : -1,
    ref
  }, dataAttributes), others), withIcon && /* @__PURE__ */ React__default.createElement("div", {
    className: classes.stepWrapper
  }, /* @__PURE__ */ React__default.createElement("div", __spreadValues({
    className: classes.stepIcon
  }, dataAttributes), /* @__PURE__ */ React__default.createElement(Transition.Transition, {
    mounted: state === "stepCompleted",
    transition: "pop",
    duration: 200
  }, (transitionStyles) => /* @__PURE__ */ React__default.createElement("div", {
    className: classes.stepCompletedIcon,
    style: transitionStyles
  }, loading ? /* @__PURE__ */ React__default.createElement(Loader.Loader, {
    color: "#fff",
    size: _iconSize,
    className: classes.stepLoader
  }) : getStepFragment(completedIcon, step) || /* @__PURE__ */ React__default.createElement(CheckboxIcon.CheckboxIcon, {
    indeterminate: false,
    width: _iconSize,
    height: _iconSize
  }))), state !== "stepCompleted" ? loading ? /* @__PURE__ */ React__default.createElement(Loader.Loader, {
    size: _iconSize,
    color
  }) : getStepFragment(_icon || icon, step) : null), orientation === "vertical" && /* @__PURE__ */ React__default.createElement("div", {
    className: cx(classes.verticalSeparator, {
      [classes.verticalSeparatorActive]: state === "stepCompleted"
    })
  })), (label || description) && /* @__PURE__ */ React__default.createElement("div", {
    className: classes.stepBody
  }, label && /* @__PURE__ */ React__default.createElement(Text.Text, {
    className: classes.stepLabel
  }, getStepFragment(label, step)), description && /* @__PURE__ */ React__default.createElement(Text.Text, {
    className: classes.stepDescription,
    color: "dimmed"
  }, getStepFragment(description, step))));
});
Step.displayName = "@mantine/core/Step";

exports.Step = Step;
//# sourceMappingURL=Step.js.map
