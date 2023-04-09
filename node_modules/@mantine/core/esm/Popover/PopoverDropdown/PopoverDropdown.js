import React from 'react';
import { useComponentDefaultProps, rem } from '@mantine/styles';
import { closeOnEscape } from '@mantine/utils';
import { useFocusReturn } from '@mantine/hooks';
import { usePopoverContext } from '../Popover.context.js';
import useStyles from './PopoverDropdown.styles.js';
import { OptionalPortal } from '../../Portal/OptionalPortal.js';
import { Transition } from '../../Transition/Transition.js';
import { FocusTrap } from '../../FocusTrap/FocusTrap.js';
import { Box } from '../../Box/Box.js';
import { FloatingArrow } from '../../Floating/FloatingArrow/FloatingArrow.js';

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
  const _a = useComponentDefaultProps("PopoverDropdown", defaultProps, props), { style, className, children, onKeyDownCapture } = _a, others = __objRest(_a, ["style", "className", "children", "onKeyDownCapture"]);
  const ctx = usePopoverContext();
  const { classes, cx } = useStyles({ radius: ctx.radius, shadow: ctx.shadow }, {
    name: ctx.__staticSelector,
    classNames: ctx.classNames,
    styles: ctx.styles,
    unstyled: ctx.unstyled,
    variant: ctx.variant
  });
  const returnFocus = useFocusReturn({
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
  return /* @__PURE__ */ React.createElement(OptionalPortal, __spreadValues({
    withinPortal: ctx.withinPortal
  }, ctx.portalProps), /* @__PURE__ */ React.createElement(Transition, __spreadProps(__spreadValues({
    mounted: ctx.opened
  }, ctx.transitionProps), {
    transition: ctx.transitionProps.transition || "fade",
    duration: (_b = ctx.transitionProps.duration) != null ? _b : 150,
    keepMounted: ctx.keepMounted,
    exitDuration: typeof ctx.transitionProps.exitDuration === "number" ? ctx.transitionProps.exitDuration : ctx.transitionProps.duration
  }), (transitionStyles) => {
    var _a2, _b2;
    return /* @__PURE__ */ React.createElement(FocusTrap, {
      active: ctx.trapFocus
    }, /* @__PURE__ */ React.createElement(Box, __spreadValues(__spreadProps(__spreadValues({}, accessibleProps), {
      tabIndex: -1,
      ref: ctx.floating,
      style: __spreadProps(__spreadValues(__spreadValues({}, style), transitionStyles), {
        zIndex: ctx.zIndex,
        top: (_a2 = ctx.y) != null ? _a2 : 0,
        left: (_b2 = ctx.x) != null ? _b2 : 0,
        width: ctx.width === "target" ? void 0 : rem(ctx.width)
      }),
      className: cx(classes.dropdown, className),
      onKeyDownCapture: closeOnEscape(ctx.onClose, {
        active: ctx.closeOnEscape,
        onTrigger: returnFocus,
        onKeyDown: onKeyDownCapture
      }),
      "data-position": ctx.placement
    }), others), children, /* @__PURE__ */ React.createElement(FloatingArrow, {
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

export { PopoverDropdown };
//# sourceMappingURL=PopoverDropdown.js.map
