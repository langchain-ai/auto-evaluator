'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var Curve = require('./Curve/Curve.js');
var getCurves = require('./get-curves/get-curves.js');
var RingProgress_styles = require('./RingProgress.styles.js');
var Box = require('../Box/Box.js');

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
  size: 120,
  thickness: 12
};
const RingProgress = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("RingProgress", defaultProps, props), {
    className,
    style,
    label,
    sections,
    size,
    thickness,
    classNames,
    styles: styles$1,
    roundCaps,
    rootColor,
    unstyled,
    variant
  } = _a, others = __objRest(_a, [
    "className",
    "style",
    "label",
    "sections",
    "size",
    "thickness",
    "classNames",
    "styles",
    "roundCaps",
    "rootColor",
    "unstyled",
    "variant"
  ]);
  const { classes, cx } = RingProgress_styles['default'](null, {
    name: "RingProgress",
    classNames,
    styles: styles$1,
    unstyled,
    variant
  });
  const curves = getCurves.getCurves({
    size,
    thickness,
    sections,
    renderRoundedLineCaps: roundCaps,
    rootColor
  }).map(({ data, sum, root, lineRoundCaps, offset }, index) => /* @__PURE__ */ React__default.createElement(Curve.Curve, __spreadProps(__spreadValues({}, data), {
    key: index,
    size,
    thickness,
    sum,
    offset,
    color: data == null ? void 0 : data.color,
    root,
    lineRoundCaps
  })));
  return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues({
    style: __spreadValues({ width: size, height: size }, style),
    className: cx(classes.root, className),
    ref
  }, others), /* @__PURE__ */ React__default.createElement("svg", {
    width: size,
    height: size,
    style: { transform: "rotate(-90deg)" }
  }, curves), label && /* @__PURE__ */ React__default.createElement("div", {
    className: classes.label,
    style: { right: thickness * 2, left: thickness * 2 }
  }, label));
});
RingProgress.displayName = "@mantine/core/RingProgress";

exports.RingProgress = RingProgress;
//# sourceMappingURL=RingProgress.js.map
