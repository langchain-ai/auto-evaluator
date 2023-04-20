import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import useStyles from './Progress.styles.js';
import { Tooltip } from '../Tooltip/Tooltip.js';
import { Box } from '../Box/Box.js';
import { Text } from '../Text/Text.js';

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
function getCumulativeSections(sections) {
  return sections.reduce((acc, section) => {
    acc.sections.push(__spreadProps(__spreadValues({}, section), { accumulated: acc.accumulated }));
    acc.accumulated += section.value;
    return acc;
  }, { accumulated: 0, sections: [] }).sections;
}
const defaultProps = {
  size: "md",
  radius: "sm",
  striped: false,
  animate: false,
  label: ""
};
const Progress = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("Progress", defaultProps, props), {
    className,
    value,
    color,
    size,
    radius,
    striped,
    animate,
    label,
    "aria-label": ariaLabel,
    classNames,
    styles,
    sections,
    unstyled,
    variant
  } = _a, others = __objRest(_a, [
    "className",
    "value",
    "color",
    "size",
    "radius",
    "striped",
    "animate",
    "label",
    "aria-label",
    "classNames",
    "styles",
    "sections",
    "unstyled",
    "variant"
  ]);
  const { classes, cx, theme } = useStyles({ color, radius }, { name: "Progress", classNames, styles, unstyled, variant, size });
  const segments = Array.isArray(sections) ? getCumulativeSections(sections).map((_b, index) => {
    var _c = _b, {
      tooltip,
      accumulated,
      value: sectionValue,
      label: sectionLabel,
      color: sectionColor
    } = _c, sectionProps = __objRest(_c, [
      "tooltip",
      "accumulated",
      "value",
      "label",
      "color"
    ]);
    return /* @__PURE__ */ React.createElement(Tooltip.Floating, {
      label: tooltip,
      disabled: !tooltip,
      key: index
    }, /* @__PURE__ */ React.createElement(Box, __spreadProps(__spreadValues({}, sectionProps), {
      className: cx(classes.bar, sectionProps.className),
      "data-striped": striped || animate || void 0,
      "data-animate": animate || void 0,
      sx: {
        width: `${sectionValue}%`,
        left: `${accumulated}%`,
        backgroundColor: theme.fn.variant({
          variant: "filled",
          primaryFallback: false,
          color: sectionColor || theme.primaryColor
        }).background
      }
    }), sectionLabel && /* @__PURE__ */ React.createElement(Text, {
      className: classes.label
    }, sectionLabel)));
  }) : null;
  return /* @__PURE__ */ React.createElement(Box, __spreadValues({
    className: cx(classes.root, className),
    ref
  }, others), segments || /* @__PURE__ */ React.createElement("div", {
    role: "progressbar",
    "aria-valuemax": 100,
    "aria-valuemin": 0,
    "aria-valuenow": value,
    "aria-label": ariaLabel,
    className: classes.bar,
    style: { width: `${value}%` },
    "data-striped": striped || animate || void 0,
    "data-animate": animate || void 0
  }, label ? /* @__PURE__ */ React.createElement(Text, {
    className: classes.label
  }, label) : ""));
});
Progress.displayName = "@mantine/core/Progress";

export { Progress };
//# sourceMappingURL=Progress.js.map
