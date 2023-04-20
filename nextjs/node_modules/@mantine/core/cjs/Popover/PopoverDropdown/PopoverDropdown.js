'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var utils = require('@mantine/utils');
var hooks = require('@mantine/hooks');
var Popover_context = require('../Popover.context.js');
var PopoverDropdown_styles = require('./PopoverDropdown.styles.js');
var OptionalPortal = require('../../Portal/OptionalPortal.js');
var Transition = require('../../Transition/Transition.js');
var FocusTrap = require('../../FocusTrap/FocusTrap.js');
var Box = require('../../Box/Box.js');
var FloatingArrow = require('../../Floating/FloatingArrow/FloatingArrow.js');

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
const defaultProps = {};
function PopoverDropdown(props) {
  var _b;
  const _a = styles.useComponentDefaultProps("PopoverDropdown", defaultProps, props), { style, className, children, onKeyDownCapture } = _a, others = __objRest(_a, ["style", "className", "children", "onKeyDownCapture"]);
  const ctx = Popover_context.usePopoverContext();
  const { classes, cx } = PopoverDropdown_styles['default']({ radius: ctx.radius, shadow: ctx.shadow }, {
    name: ctx.__staticSelector,
    classNames: ctx.classNames,
    styles: ctx.styles,
    unstyled: ctx.unstyled,
    variant: ctx.variant
  });
  const returnFocus = hooks.useFocusReturn({
    opened: ctx.opened,
    shouldReturnFocus: ctx.returnFocus
  });
  const accessibleProps = ctx.withRoles ? {
    "aria-labelledby": ctx.getTargetId(),
    id: ctx.getDropdownId(),
    role: "dialog"
  } : {};
  if (ctx.disabled) {
    return null;
  }
  return /* @__PURE__ */ React__default.createElement(OptionalPortal.OptionalPortal, __spreadValues({
    withinPortal: ctx.withinPortal
  }, ctx.portalProps), /* @__PURE__ */ React__default.createElement(Transition.Transition, __spreadProps(__spreadValues({
    mounted: ctx.opened
  }, ctx.transitionProps), {
    transition: ctx.transitionProps.transition || "fade",
    duration: (_b = ctx.transitionProps.duration) != null ? _b : 150,
    keepMounted: ctx.keepMounted,
    exitDuration: typeof ctx.transitionProps.exitDuration === "number" ? ctx.transitionProps.exitDuration : ctx.transitionProps.duration
  }), (transitionStyles) => {
    var _a2, _b2;
    return /* @__PURE__ */ React__default.createElement(FocusTrap.FocusTrap, {
      active: ctx.trapFocus
    }, /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues(__spreadProps(__spreadValues({}, accessibleProps), {
      tabIndex: -1,
      ref: ctx.floating,
      style: __spreadProps(__spreadValues(__spreadValues({}, style), transitionStyles), {
        zIndex: ctx.zIndex,
        top: (_a2 = ctx.y) != null ? _a2 : 0,
        left: (_b2 = ctx.x) != null ? _b2 : 0,
        width: ctx.width === "target" ? void 0 : styles.rem(ctx.width)
      }),
      className: cx(classes.dropdown, className),
      onKeyDownCapture: utils.closeOnEscape(ctx.onClose, {
        active: ctx.closeOnEscape,
        onTrigger: returnFocus,
        onKeyDown: onKeyDownCapture
      }),
      "data-position": ctx.placement
    }), others), children, /* @__PURE__ */ React__default.createElement(FloatingArrow.FloatingArrow, {
      ref: ctx.arrowRef,
      arrowX: ctx.arrowX,
      arrowY: ctx.arrowY,
      visible: ctx.withArrow,
      position: ctx.placement,
      arrowSize: ctx.arrowSize,
      arrowRadius: ctx.arrowRadius,
      arrowOffset: ctx.arrowOffset,
      arrowPosition: ctx.arrowPosition,
      className: classes.arrow
    })));
  }));
}
PopoverDropdown.displayName = "@mantine/core/PopoverDropdown";

exports.PopoverDropdown = PopoverDropdown;
//# sourceMappingURL=PopoverDropdown.js.map
