'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var utils = require('@mantine/utils');
var hooks = require('@mantine/hooks');
var styles = require('@mantine/styles');
var Tooltip_styles = require('../Tooltip.styles.js');
var Tooltip_errors = require('../Tooltip.errors.js');
var useFloatingTooltip = require('./use-floating-tooltip.js');
var OptionalPortal = require('../../Portal/OptionalPortal.js');
var Box = require('../../Box/Box.js');

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
  refProp: "ref",
  withinPortal: true,
  offset: 10,
  position: "right",
  zIndex: styles.getDefaultZIndex("popover")
};
function TooltipFloating(props) {
  var _b;
  const _a = styles.useComponentDefaultProps("TooltipFloating", defaultProps, props), {
    children,
    refProp,
    withinPortal,
    style,
    className,
    classNames,
    styles: styles$1,
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
  const { handleMouseMove, x, y, opened, boundaryRef, floating, setOpened } = useFloatingTooltip.useFloatingTooltip({
    offset,
    position
  });
  const { classes, cx } = Tooltip_styles['default']({ radius, color, multiline, width }, { name: "TooltipFloating", classNames, styles: styles$1, unstyled, variant });
  if (!utils.isElement(children)) {
    throw new Error(Tooltip_errors.TOOLTIP_ERRORS.children);
  }
  const targetRef = hooks.useMergedRef(boundaryRef, children.ref);
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
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(OptionalPortal.OptionalPortal, {
    withinPortal
  }, /* @__PURE__ */ React__default.createElement(Box.Box, __spreadProps(__spreadValues({}, others), {
    ref: floating,
    className: cx(classes.tooltip, className),
    style: __spreadProps(__spreadValues({}, style), {
      zIndex,
      display: !disabled && opened ? "block" : "none",
      top: y != null ? y : "",
      left: (_b = Math.round(x)) != null ? _b : ""
    })
  }), label)), React.cloneElement(children, __spreadProps(__spreadValues({}, children.props), {
    [refProp]: targetRef,
    onMouseEnter,
    onMouseLeave
  })));
}
TooltipFloating.displayName = "@mantine/core/TooltipFloating";

exports.TooltipFloating = TooltipFloating;
//# sourceMappingURL=TooltipFloating.js.map
