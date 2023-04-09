'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var utils = require('@mantine/utils');
var TimelineItem = require('./TimelineItem/TimelineItem.js');
var Timeline_styles = require('./Timeline.styles.js');
var Box = require('../Box/Box.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
  active: -1,
  radius: "xl",
  bulletSize: 20,
  align: "left",
  lineWidth: 4,
  reverseActive: false
};
const Timeline = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("Timeline", defaultProps, props), {
    className,
    children,
    active,
    color,
    radius,
    bulletSize,
    align,
    lineWidth,
    classNames,
    styles: styles$1,
    sx,
    reverseActive,
    unstyled,
    variant
  } = _a, others = __objRest(_a, [
    "className",
    "children",
    "active",
    "color",
    "radius",
    "bulletSize",
    "align",
    "lineWidth",
    "classNames",
    "styles",
    "sx",
    "reverseActive",
    "unstyled",
    "variant"
  ]);
  const { classes, cx } = Timeline_styles['default'](null, {
    name: "Timeline",
    classNames,
    styles: styles$1,
    unstyled,
    variant
  });
  const _children = React.Children.toArray(children);
  const items = _children.map((item, index) => React__default.cloneElement(item, {
    variant,
    classNames,
    styles: styles$1,
    align,
    lineWidth,
    radius: item.props.radius || radius,
    color: item.props.color || color,
    bulletSize: item.props.bulletSize || bulletSize,
    unstyled,
    active: item.props.active || (reverseActive ? active >= _children.length - index - 1 : active >= index),
    lineActive: item.props.lineActive || (reverseActive ? active >= _children.length - index - 1 : active - 1 >= index)
  }));
  const offset = align === "left" ? { paddingLeft: `calc(${styles.rem(bulletSize)} / 2 + ${styles.rem(lineWidth)} / 2)` } : { paddingRight: `calc(${styles.rem(bulletSize)} / 2 + ${styles.rem(lineWidth)} / 2)` };
  return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues({
    className: cx(classes.root, className),
    ref,
    sx: [offset, ...utils.packSx(sx)]
  }, others), items);
});
Timeline.Item = TimelineItem.TimelineItem;
Timeline.displayName = "@mantine/core/Timeline";

exports.Timeline = Timeline;
//# sourceMappingURL=Timeline.js.map
