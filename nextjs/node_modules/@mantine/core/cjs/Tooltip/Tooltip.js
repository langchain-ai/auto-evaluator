'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var utils = require('@mantine/utils');
var hooks = require('@mantine/hooks');
var styles = require('@mantine/styles');
var TooltipGroup = require('./TooltipGroup/TooltipGroup.js');
var TooltipFloating = require('./TooltipFloating/TooltipFloating.js');
var useTooltip = require('./use-tooltip.js');
var Tooltip_errors = require('./Tooltip.errors.js');
var Tooltip_styles = require('./Tooltip.styles.js');
var getFloatingPosition = require('../Floating/get-floating-position/get-floating-position.js');
var OptionalPortal = require('../Portal/OptionalPortal.js');
var Transition = require('../Transition/Transition.js');
var Box = require('../Box/Box.js');
var FloatingArrow = require('../Floating/FloatingArrow/FloatingArrow.js');

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
  zIndex: styles.getDefaultZIndex("popover"),
  positionDependencies: []
};
const _Tooltip = React.forwardRef((props, ref) => {
  var _b;
  const arrowRef = React.useRef(null);
  const _a = styles.useComponentDefaultProps("Tooltip", defaultProps, props), {
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
    styles: styles$1,
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
  const { classes, cx, theme } = Tooltip_styles['default']({ radius, color, width, multiline }, { name: "Tooltip", classNames, styles: styles$1, unstyled, variant });
  const tooltip = useTooltip.useTooltip({
    position: getFloatingPosition.getFloatingPosition(theme.dir, position),
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
  if (!utils.isElement(children)) {
    throw new Error(Tooltip_errors.TOOLTIP_ERRORS.children);
  }
  const targetRef = hooks.useMergedRef(tooltip.reference, children.ref, ref);
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(OptionalPortal.OptionalPortal, {
    withinPortal
  }, /* @__PURE__ */ React__default.createElement(Transition.Transition, __spreadProps(__spreadValues({
    keepMounted,
    mounted: !disabled && tooltip.opened
  }, transitionProps), {
    transition: transitionProps.transition || "fade",
    duration: tooltip.isGroupPhase ? 10 : (_b = transitionProps.duration) != null ? _b : 100
  }), (transitionStyles) => {
    var _a2, _b2;
    return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues(__spreadValues({}, others), tooltip.getFloatingProps({
      ref: tooltip.floating,
      className: classes.tooltip,
      style: __spreadProps(__spreadValues(__spreadValues({}, style), transitionStyles), {
        zIndex,
        top: (_a2 = tooltip.y) != null ? _a2 : 0,
        left: (_b2 = tooltip.x) != null ? _b2 : 0
      })
    })), label, /* @__PURE__ */ React__default.createElement(FloatingArrow.FloatingArrow, {
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
  })), React.cloneElement(children, tooltip.getReferenceProps(__spreadValues({
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
_Tooltip.Group = TooltipGroup.TooltipGroup;
_Tooltip.Floating = TooltipFloating.TooltipFloating;
_Tooltip.displayName = "@mantine/core/Tooltip";
const Tooltip = _Tooltip;

exports.Tooltip = Tooltip;
//# sourceMappingURL=Tooltip.js.map
