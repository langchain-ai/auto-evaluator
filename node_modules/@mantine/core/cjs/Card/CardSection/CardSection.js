'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var utils = require('@mantine/utils');
var Card_context = require('../Card.context.js');
var CardSection_styles = require('./CardSection.styles.js');
var Box = require('../../Box/Box.js');

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
  withBorder: false,
  inheritPadding: false
};
const _CardSection = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("CardSection", defaultProps, props), { className, withBorder, inheritPadding, unstyled, variant } = _a, others = __objRest(_a, ["className", "withBorder", "inheritPadding", "unstyled", "variant"]);
  const { classes, cx } = CardSection_styles['default']({ padding: Card_context.useCardPadding(), withBorder, inheritPadding }, { name: "Card", unstyled, variant });
  return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues({
    className: cx(classes.cardSection, className),
    ref
  }, others));
});
_CardSection.displayName = "@mantine/core/CardSection";
const CardSection = utils.createPolymorphicComponent(_CardSection);

exports.CardSection = CardSection;
exports._CardSection = _CardSection;
//# sourceMappingURL=CardSection.js.map
