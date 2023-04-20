'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var Thumb_styles = require('./Thumb.styles.js');
var Box = require('../../Box/Box.js');
var Transition = require('../../Transition/Transition.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const Thumb = React.forwardRef(({
  max,
  min,
  value,
  position,
  label,
  dragging,
  onMouseDown,
  color,
  classNames,
  styles,
  size,
  labelTransition,
  labelTransitionDuration,
  labelTransitionTimingFunction,
  labelAlwaysOn,
  thumbLabel,
  onFocus,
  onBlur,
  showLabelOnHover,
  isHovered,
  children = null,
  disabled,
  unstyled,
  thumbSize,
  variant
}, ref) => {
  const { classes, cx, theme } = Thumb_styles['default']({ color, disabled, thumbSize }, { name: "Slider", classNames, styles, unstyled, variant, size });
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const isVisible = labelAlwaysOn || dragging || focused || showLabelOnHover && (isHovered || hovered);
  return /* @__PURE__ */ React__default.createElement(Box.Box, {
    tabIndex: 0,
    role: "slider",
    "aria-label": thumbLabel,
    "aria-valuemax": max,
    "aria-valuemin": min,
    "aria-valuenow": value,
    ref,
    className: cx(classes.thumb, { [classes.dragging]: dragging }),
    onFocus: () => {
      setFocused(true);
      typeof onFocus === "function" && onFocus();
    },
    onBlur: () => {
      setFocused(false);
      typeof onBlur === "function" && onBlur();
    },
    onTouchStart: onMouseDown,
    onMouseDown,
    onMouseEnter: showLabelOnHover ? () => setHovered(true) : void 0,
    onMouseLeave: showLabelOnHover ? () => setHovered(false) : void 0,
    onClick: (event) => event.stopPropagation(),
    style: { [theme.dir === "rtl" ? "right" : "left"]: `${position}%` }
  }, children, /* @__PURE__ */ React__default.createElement(Transition.Transition, {
    mounted: label != null && isVisible,
    duration: labelTransitionDuration,
    transition: labelTransition,
    timingFunction: labelTransitionTimingFunction || theme.transitionTimingFunction
  }, (transitionStyles) => /* @__PURE__ */ React__default.createElement("div", {
    style: transitionStyles,
    className: classes.label
  }, label)));
});
Thumb.displayName = "@mantine/core/SliderThumb";

exports.Thumb = Thumb;
//# sourceMappingURL=Thumb.js.map
