import React, { forwardRef } from 'react';
import { useComponentDefaultProps, getSize } from '@mantine/styles';
import useStyles from './Step.styles.js';
import { UnstyledButton } from '../../UnstyledButton/UnstyledButton.js';
import { Transition } from '../../Transition/Transition.js';
import { Loader } from '../../Loader/Loader.js';
import { CheckboxIcon } from '../../Checkbox/CheckboxIcon.js';
import { Text } from '../../Text/Text.js';

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
    return /* @__PURE__ */ React.createElement(Fragment, {
      step
    });
  }
  return Fragment;
};
const Step = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("StepperStep", defaultProps, props), {
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
    styles,
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
  const { classes, cx } = useStyles({ color, iconSize, radius, allowStepClick, iconPosition, orientation }, { name: __staticSelector, classNames, styles, unstyled, variant, size });
  const _iconSize = getSize({ size, sizes: defaultIconSizes });
  const _icon = state === "stepCompleted" ? null : state === "stepProgress" ? progressIcon : icon;
  const dataAttributes = {
    "data-progress": state === "stepProgress" || void 0,
    "data-completed": state === "stepCompleted" || void 0
  };
  return /* @__PURE__ */ React.createElement(UnstyledButton, __spreadValues(__spreadValues({
    className: cx(classes.step, className),
    tabIndex: allowStepClick ? 0 : -1,
    ref
  }, dataAttributes), others), withIcon && /* @__PURE__ */ React.createElement("div", {
    className: classes.stepWrapper
  }, /* @__PURE__ */ React.createElement("div", __spreadValues({
    className: classes.stepIcon
  }, dataAttributes), /* @__PURE__ */ React.createElement(Transition, {
    mounted: state === "stepCompleted",
    transition: "pop",
    duration: 200
  }, (transitionStyles) => /* @__PURE__ */ React.createElement("div", {
    className: classes.stepCompletedIcon,
    style: transitionStyles
  }, loading ? /* @__PURE__ */ React.createElement(Loader, {
    color: "#fff",
    size: _iconSize,
    className: classes.stepLoader
  }) : getStepFragment(completedIcon, step) || /* @__PURE__ */ React.createElement(CheckboxIcon, {
    indeterminate: false,
    width: _iconSize,
    height: _iconSize
  }))), state !== "stepCompleted" ? loading ? /* @__PURE__ */ React.createElement(Loader, {
    size: _iconSize,
    color
  }) : getStepFragment(_icon || icon, step) : null), orientation === "vertical" && /* @__PURE__ */ React.createElement("div", {
    className: cx(classes.verticalSeparator, {
      [classes.verticalSeparatorActive]: state === "stepCompleted"
    })
  })), (label || description) && /* @__PURE__ */ React.createElement("div", {
    className: classes.stepBody
  }, label && /* @__PURE__ */ React.createElement(Text, {
    className: classes.stepLabel
  }, getStepFragment(label, step)), description && /* @__PURE__ */ React.createElement(Text, {
    className: classes.stepDescription,
    color: "dimmed"
  }, getStepFragment(description, step))));
});
Step.displayName = "@mantine/core/Step";

export { Step };
//# sourceMappingURL=Step.js.map
