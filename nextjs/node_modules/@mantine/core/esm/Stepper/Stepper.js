import React, { forwardRef, Children, cloneElement } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { Step } from './Step/Step.js';
import { StepCompleted } from './StepCompleted/StepCompleted.js';
import useStyles from './Stepper.styles.js';
import { Box } from '../Box/Box.js';

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
  contentPadding: "md",
  size: "md",
  radius: "xl",
  orientation: "horizontal",
  iconPosition: "left",
  allowNextStepsSelect: true
};
const Stepper = forwardRef((props, ref) => {
  var _b, _c, _d;
  const _a = useComponentDefaultProps("Stepper", defaultProps, props), {
    className,
    children,
    onStepClick,
    active,
    icon,
    completedIcon,
    progressIcon,
    color,
    iconSize,
    contentPadding,
    size,
    radius,
    orientation,
    breakpoint,
    iconPosition,
    allowNextStepsSelect,
    classNames,
    styles,
    unstyled,
    variant
  } = _a, others = __objRest(_a, [
    "className",
    "children",
    "onStepClick",
    "active",
    "icon",
    "completedIcon",
    "progressIcon",
    "color",
    "iconSize",
    "contentPadding",
    "size",
    "radius",
    "orientation",
    "breakpoint",
    "iconPosition",
    "allowNextStepsSelect",
    "classNames",
    "styles",
    "unstyled",
    "variant"
  ]);
  const { classes, cx } = useStyles({ contentPadding, color, orientation, iconPosition, iconSize, breakpoint }, { name: "Stepper", classNames, styles, unstyled, variant, size });
  const convertedChildren = Children.toArray(children);
  const _children = convertedChildren.filter((child) => child.type !== StepCompleted);
  const completedStep = convertedChildren.find((item) => item.type === StepCompleted);
  const items = _children.reduce((acc, item, index) => {
    const state = active === index ? "stepProgress" : active > index ? "stepCompleted" : "stepInactive";
    const shouldAllowSelect = () => {
      if (typeof onStepClick !== "function") {
        return false;
      }
      if (typeof item.props.allowStepSelect === "boolean") {
        return item.props.allowStepSelect;
      }
      return state === "stepCompleted" || allowNextStepsSelect;
    };
    const isStepSelectionEnabled = shouldAllowSelect();
    acc.push(cloneElement(item, {
      __staticSelector: "Stepper",
      icon: item.props.icon || icon || index + 1,
      key: index,
      step: index,
      variant,
      state,
      onClick: () => isStepSelectionEnabled && onStepClick(index),
      allowStepClick: isStepSelectionEnabled,
      completedIcon: item.props.completedIcon || completedIcon,
      progressIcon: item.props.progressIcon || progressIcon,
      color: item.props.color || color,
      iconSize,
      size,
      radius,
      classNames,
      styles,
      iconPosition: item.props.iconPosition || iconPosition,
      orientation,
      unstyled
    }));
    if (orientation === "horizontal" && index !== _children.length - 1) {
      acc.push(/* @__PURE__ */ React.createElement("div", {
        className: cx(classes.separator, { [classes.separatorActive]: index < active }),
        key: `separator-${index}`
      }));
    }
    return acc;
  }, []);
  const stepContent = (_c = (_b = _children[active]) == null ? void 0 : _b.props) == null ? void 0 : _c.children;
  const completedContent = (_d = completedStep == null ? void 0 : completedStep.props) == null ? void 0 : _d.children;
  const content = active > _children.length - 1 ? completedContent : stepContent;
  return /* @__PURE__ */ React.createElement(Box, __spreadValues({
    className: cx(classes.root, className),
    ref
  }, others), /* @__PURE__ */ React.createElement("div", {
    className: classes.steps
  }, items), content && /* @__PURE__ */ React.createElement("div", {
    className: classes.content
  }, content));
});
Stepper.Step = Step;
Stepper.Completed = StepCompleted;
Stepper.displayName = "@mantine/core/Stepper";

export { Stepper };
//# sourceMappingURL=Stepper.js.map
