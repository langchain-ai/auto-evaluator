'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var utils = require('@mantine/utils');
var Text_styles = require('./Text.styles.js');
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
  variant: "text"
};
const _Text = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("Text", defaultProps, props), {
    className,
    size,
    weight,
    transform,
    color,
    align,
    variant,
    lineClamp,
    truncate,
    gradient,
    inline,
    inherit,
    underline,
    strikethrough,
    italic,
    classNames,
    styles: styles$1,
    unstyled,
    span,
    __staticSelector
  } = _a, others = __objRest(_a, [
    "className",
    "size",
    "weight",
    "transform",
    "color",
    "align",
    "variant",
    "lineClamp",
    "truncate",
    "gradient",
    "inline",
    "inherit",
    "underline",
    "strikethrough",
    "italic",
    "classNames",
    "styles",
    "unstyled",
    "span",
    "__staticSelector"
  ]);
  const { classes, cx } = Text_styles['default']({
    color,
    lineClamp,
    truncate,
    inline,
    inherit,
    underline,
    strikethrough,
    italic,
    weight,
    transform,
    align,
    gradient
  }, { unstyled, name: __staticSelector || "Text", variant, size });
  return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues({
    ref,
    className: cx(classes.root, { [classes.gradient]: variant === "gradient" }, className),
    component: span ? "span" : "div"
  }, others));
});
_Text.displayName = "@mantine/core/Text";
const Text = utils.createPolymorphicComponent(_Text);

exports.Text = Text;
exports._Text = _Text;
//# sourceMappingURL=Text.js.map
