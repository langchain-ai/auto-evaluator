import React, { forwardRef, useRef, cloneElement } from 'react';
import { isElement } from '@mantine/utils';
import { useMergedRef } from '@mantine/hooks';
import { getDefaultZIndex, useComponentDefaultProps } from '@mantine/styles';
import { TooltipGroup } from './TooltipGroup/TooltipGroup.js';
import { TooltipFloating } from './TooltipFloating/TooltipFloating.js';
import { useTooltip } from './use-tooltip.js';
import { TOOLTIP_ERRORS } from './Tooltip.errors.js';
import useStyles from './Tooltip.styles.js';
import { getFloatingPosition } from '../Floating/get-floating-position/get-floating-position.js';
import { OptionalPortal } from '../Portal/OptionalPortal.js';
import { Transition } from '../Transition/Transition.js';
import { Box } from '../Box/Box.js';
import { FloatingArrow } from '../Floating/FloatingArrow/FloatingArrow.js';

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
  position: "top",
  refProp: "ref",
  withinPortal: false,
  inline: false,
  arrowSize: 4,
  arrowOffset: 5,
  arrowRadius: 0,
  arrowPosition: "side",
  offset: 5,
  transitionProps: { duration: 100, transition: "fade" },
  width: "auto",
  events: { hover: true, focus: false, touch: false },
  zIndex: getDefaultZIndex("popover"),
  positionDependencies: []
};
const _Tooltip = forwardRef((props, ref) => {
  var _b;
  const arrowRef = useRef(null);
  const _a = useComponentDefaultProps("Tooltip", defaultProps, props), {
    children,
    position,
    refProp,
    label,
    openDelay,
    closeDelay,
    onPositionChange,
    opened,
    withinPortal,
    radius,
    color,
    classNames,
    styles,
    unstyled,
    style,
    className,
    withArrow,
    arrowSize,
    arrowOffset,
    arrowRadius,
    arrowPosition,
    offset,
    transitionProps,
    multiline,
    width,
    events,
    zIndex,
    disabled,
    positionDependencies,
    onClick,
    onMouseEnter,
    onMouseLeave,
    inline,
    variant,
    keepMounted
  } = _a, others = __objRest(_a, [
    "children",
    "position",
    "refProp",
    "label",
    "openDelay",
    "closeDelay",
    "onPositionChange",
    "opened",
    "withinPortal",
    "radius",
    "color",
    "classNames",
    "styles",
    "unstyled",
    "style",
    "className",
    "withArrow",
    "arrowSize",
    "arrowOffset",
    "arrowRadius",
    "arrowPosition",
    "offset",
    "transitionProps",
    "multiline",
    "width",
    "events",
    "zIndex",
    "disabled",
    "positionDependencies",
    "onClick",
    "onMouseEnter",
    "onMouseLeave",
    "inline",
    "variant",
    "keepMounted"
  ]);
  const { classes, cx, theme } = useStyles({ radius, color, width, multiline }, { name: "Tooltip", classNames, styles, unstyled, variant });
  const tooltip = useTooltip({
    position: getFloatingPosition(theme.dir, position),
    closeDelay,
    openDelay,
    onPositionChange,
    opened,
    events,
    arrowRef,
    arrowOffset,
    offset: offset + (withArrow ? arrowSize / 2 : 0),
    positionDependencies: [...positionDependencies, children],
    inline
  });
  if (!isElement(children)) {
    throw new Error(TOOLTIP_ERRORS.children);
  }
  const targetRef = useMergedRef(tooltip.reference, children.ref, ref);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(OptionalPortal, {
    withinPortal
  }, /* @__PURE__ */ React.createElement(Transition, __spreadProps(__spreadValues({
    keepMounted,
    mounted: !disabled && tooltip.opened
  }, transitionProps), {
    transition: transitionProps.transition || "fade",
    duration: tooltip.isGroupPhase ? 10 : (_b = transitionProps.duration) != null ? _b : 100
  }), (transitionStyles) => {
    var _a2, _b2;
    return /* @__PURE__ */ React.createElement(Box, __spreadValues(__spreadValues({}, others), tooltip.getFloatingProps({
      ref: tooltip.floating,
      className: classes.tooltip,
      style: __spreadProps(__spreadValues(__spreadValues({}, style), transitionStyles), {
        zIndex,
        top: (_a2 = tooltip.y) != null ? _a2 : 0,
        left: (_b2 = tooltip.x) != null ? _b2 : 0
      })
    })), label, /* @__PURE__ */ React.createElement(FloatingArrow, {
      ref: arrowRef,
      arrowX: tooltip.arrowX,
      arrowY: tooltip.arrowY,
      visible: withArrow,
      position: tooltip.placement,
      arrowSize,
      arrowOffset,
      arrowRadius,
      arrowPosition,
      className: classes.arrow
    }));
  })), cloneElement(children, tooltip.getReferenceProps(__spreadValues({
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove: props.onMouseMove,
    onPointerDown: props.onPointerDown,
    onPointerEnter: props.onPointerEnter,
    [refProp]: targetRef,
    className: cx(className, children.props.className)
  }, children.props))));
});
_Tooltip.Group = TooltipGroup;
_Tooltip.Floating = TooltipFloating;
_Tooltip.displayName = "@mantine/core/Tooltip";
const Tooltip = _Tooltip;

export { Tooltip };
//# sourceMappingURL=Tooltip.js.map
