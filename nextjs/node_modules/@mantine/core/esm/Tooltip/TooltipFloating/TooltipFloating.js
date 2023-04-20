import React, { cloneElement } from 'react';
import { isElement } from '@mantine/utils';
import { useMergedRef } from '@mantine/hooks';
import { getDefaultZIndex, useComponentDefaultProps } from '@mantine/styles';
import useStyles from '../Tooltip.styles.js';
import { TOOLTIP_ERRORS } from '../Tooltip.errors.js';
import { useFloatingTooltip } from './use-floating-tooltip.js';
import { OptionalPortal } from '../../Portal/OptionalPortal.js';
import { Box } from '../../Box/Box.js';

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
  refProp: "ref",
  withinPortal: true,
  offset: 10,
  position: "right",
  zIndex: getDefaultZIndex("popover")
};
function TooltipFloating(props) {
  var _b;
  const _a = useComponentDefaultProps("TooltipFloating", defaultProps, props), {
    children,
    refProp,
    withinPortal,
    style,
    className,
    classNames,
    styles,
    unstyled,
    radius,
    color,
    label,
    offset,
    position,
    multiline,
    width,
    zIndex,
    disabled,
    variant
  } = _a, others = __objRest(_a, [
    "children",
    "refProp",
    "withinPortal",
    "style",
    "className",
    "classNames",
    "styles",
    "unstyled",
    "radius",
    "color",
    "label",
    "offset",
    "position",
    "multiline",
    "width",
    "zIndex",
    "disabled",
    "variant"
  ]);
  const { handleMouseMove, x, y, opened, boundaryRef, floating, setOpened } = useFloatingTooltip({
    offset,
    position
  });
  const { classes, cx } = useStyles({ radius, color, multiline, width }, { name: "TooltipFloating", classNames, styles, unstyled, variant });
  if (!isElement(children)) {
    throw new Error(TOOLTIP_ERRORS.children);
  }
  const targetRef = useMergedRef(boundaryRef, children.ref);
  const onMouseEnter = (event) => {
    var _a2, _b2;
    (_b2 = (_a2 = children.props).onMouseEnter) == null ? void 0 : _b2.call(_a2, event);
    handleMouseMove(event);
    setOpened(true);
  };
  const onMouseLeave = (event) => {
    var _a2, _b2;
    (_b2 = (_a2 = children.props).onMouseLeave) == null ? void 0 : _b2.call(_a2, event);
    setOpened(false);
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(OptionalPortal, {
    withinPortal
  }, /* @__PURE__ */ React.createElement(Box, __spreadProps(__spreadValues({}, others), {
    ref: floating,
    className: cx(classes.tooltip, className),
    style: __spreadProps(__spreadValues({}, style), {
      zIndex,
      display: !disabled && opened ? "block" : "none",
      top: y != null ? y : "",
      left: (_b = Math.round(x)) != null ? _b : ""
    })
  }), label)), cloneElement(children, __spreadProps(__spreadValues({}, children.props), {
    [refProp]: targetRef,
    onMouseEnter,
    onMouseLeave
  })));
}
TooltipFloating.displayName = "@mantine/core/TooltipFloating";

export { TooltipFloating };
//# sourceMappingURL=TooltipFloating.js.map
