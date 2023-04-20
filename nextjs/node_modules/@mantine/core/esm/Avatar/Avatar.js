import React, { forwardRef, useState, useEffect } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { createPolymorphicComponent } from '@mantine/utils';
import { AvatarPlaceholderIcon } from './AvatarPlaceholderIcon.js';
import { AvatarGroup } from './AvatarGroup/AvatarGroup.js';
import { useAvatarGroupContext } from './AvatarGroup/AvatarGroup.context.js';
import useStyles from './Avatar.styles.js';
import { Box } from '../Box/Box.js';

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
const _Avatar = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("Avatar", defaultProps, props), {
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
    styles,
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
  const ctx = useAvatarGroupContext();
  const [error, setError] = useState(!src);
  const { classes, cx } = useStyles({ color, radius, withinGroup: ctx.withinGroup, spacing: ctx.spacing, gradient }, { classNames, styles, unstyled, name: "Avatar", variant, size });
  useEffect(() => {
    !src ? setError(true) : setError(false);
  }, [src]);
  return /* @__PURE__ */ React.createElement(Box, __spreadValues({
    component: "div",
    className: cx(classes.root, className),
    ref
  }, others), error ? /* @__PURE__ */ React.createElement("div", {
    className: classes.placeholder,
    title: alt
  }, children || /* @__PURE__ */ React.createElement(AvatarPlaceholderIcon, {
    className: classes.placeholderIcon
  })) : /* @__PURE__ */ React.createElement("img", __spreadProps(__spreadValues({}, imageProps), {
    className: classes.image,
    src,
    alt,
    onError: () => setError(true)
  })));
});
_Avatar.displayName = "@mantine/core/Avatar";
_Avatar.Group = AvatarGroup;
const Avatar = createPolymorphicComponent(_Avatar);

export { Avatar, _Avatar };
//# sourceMappingURL=Avatar.js.map
