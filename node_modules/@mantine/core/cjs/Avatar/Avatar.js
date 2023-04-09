'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var utils = require('@mantine/utils');
var AvatarPlaceholderIcon = require('./AvatarPlaceholderIcon.js');
var AvatarGroup = require('./AvatarGroup/AvatarGroup.js');
var AvatarGroup_context = require('./AvatarGroup/AvatarGroup.context.js');
var Avatar_styles = require('./Avatar.styles.js');
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
  size: "md",
  color: "gray",
  variant: "light"
};
const _Avatar = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("Avatar", defaultProps, props), {
    className,
    size,
    src,
    alt,
    radius,
    children,
    color,
    variant,
    gradient,
    classNames,
    styles: styles$1,
    imageProps,
    unstyled
  } = _a, others = __objRest(_a, [
    "className",
    "size",
    "src",
    "alt",
    "radius",
    "children",
    "color",
    "variant",
    "gradient",
    "classNames",
    "styles",
    "imageProps",
    "unstyled"
  ]);
  const ctx = AvatarGroup_context.useAvatarGroupContext();
  const [error, setError] = React.useState(!src);
  const { classes, cx } = Avatar_styles['default']({ color, radius, withinGroup: ctx.withinGroup, spacing: ctx.spacing, gradient }, { classNames, styles: styles$1, unstyled, name: "Avatar", variant, size });
  React.useEffect(() => {
    !src ? setError(true) : setError(false);
  }, [src]);
  return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues({
    component: "div",
    className: cx(classes.root, className),
    ref
  }, others), error ? /* @__PURE__ */ React__default.createElement("div", {
    className: classes.placeholder,
    title: alt
  }, children || /* @__PURE__ */ React__default.createElement(AvatarPlaceholderIcon.AvatarPlaceholderIcon, {
    className: classes.placeholderIcon
  })) : /* @__PURE__ */ React__default.createElement("img", __spreadProps(__spreadValues({}, imageProps), {
    className: classes.image,
    src,
    alt,
    onError: () => setError(true)
  })));
});
_Avatar.displayName = "@mantine/core/Avatar";
_Avatar.Group = AvatarGroup.AvatarGroup;
const Avatar = utils.createPolymorphicComponent(_Avatar);

exports.Avatar = Avatar;
exports._Avatar = _Avatar;
//# sourceMappingURL=Avatar.js.map
