'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var Divider_styles = require('./Divider.styles.js');
var Box = require('../Box/Box.js');
var Text = require('../Text/Text.js');

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
  orientation: "horizontal",
  size: "xs",
  labelPosition: "left",
  variant: "solid"
};
const Divider = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("Divider", defaultProps, props), {
    className,
    color,
    orientation,
    size,
    label,
    labelPosition,
    labelProps,
    variant,
    styles: styles$1,
    classNames,
    unstyled
  } = _a, others = __objRest(_a, [
    "className",
    "color",
    "orientation",
    "size",
    "label",
    "labelPosition",
    "labelProps",
    "variant",
    "styles",
    "classNames",
    "unstyled"
  ]);
  const { classes, cx } = Divider_styles['default']({ color }, { classNames, styles: styles$1, unstyled, name: "Divider", variant, size });
  const vertical = orientation === "vertical";
  const horizontal = orientation === "horizontal";
  const withLabel = !!label && horizontal;
  const useLabelDefaultStyles = !(labelProps == null ? void 0 : labelProps.color);
  return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues({
    ref,
    className: cx(classes.root, {
      [classes.vertical]: vertical,
      [classes.horizontal]: horizontal,
      [classes.withLabel]: withLabel
    }, className),
    role: "separator"
  }, others), withLabel && /* @__PURE__ */ React__default.createElement(Text.Text, __spreadProps(__spreadValues({}, labelProps), {
    size: (labelProps == null ? void 0 : labelProps.size) || "xs",
    mt: styles.rem(2),
    className: cx(classes.label, classes[labelPosition], {
      [classes.labelDefaultStyles]: useLabelDefaultStyles
    })
  }), label));
});
Divider.displayName = "@mantine/core/Divider";

exports.Divider = Divider;
//# sourceMappingURL=Divider.js.map
