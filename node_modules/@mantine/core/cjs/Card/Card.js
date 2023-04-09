'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var utils = require('@mantine/utils');
var Paper = require('../Paper/Paper.js');
var CardSection = require('./CardSection/CardSection.js');
var Card_styles = require('./Card.styles.js');
var Card_context = require('./Card.context.js');

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
  padding: "md"
};
const _Card = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("Card", defaultProps, props), { className, padding, radius, children, unstyled, variant } = _a, others = __objRest(_a, ["className", "padding", "radius", "children", "unstyled", "variant"]);
  const { classes, cx } = Card_styles['default'](null, { name: "Card", unstyled, variant });
  const _children = React.Children.toArray(children);
  const content = _children.map((child, index) => {
    if (typeof child === "object" && child && "type" in child && child.type === CardSection.CardSection) {
      return React.cloneElement(child, {
        variant,
        padding,
        "data-first": index === 0 || void 0,
        "data-last": index === _children.length - 1 || void 0
      });
    }
    return child;
  });
  return /* @__PURE__ */ React__default.createElement(Card_context.CardProvider, {
    value: { padding }
  }, /* @__PURE__ */ React__default.createElement(Paper.Paper, __spreadValues({
    className: cx(classes.root, className),
    radius,
    p: padding,
    ref
  }, others), content));
});
_Card.Section = CardSection.CardSection;
_Card.displayName = "@mantine/core/Card";
const Card = utils.createPolymorphicComponent(_Card);

exports.Card = Card;
exports._Card = _Card;
//# sourceMappingURL=Card.js.map
