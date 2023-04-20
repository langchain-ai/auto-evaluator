import React, { forwardRef } from 'react';
import { useComponentDefaultProps, rem } from '@mantine/styles';
import { createPolymorphicComponent } from '@mantine/utils';
import { useUncontrolled } from '@mantine/hooks';
import useStyles from './NavLink.styles.js';
import { UnstyledButton } from '../UnstyledButton/UnstyledButton.js';
import { Text } from '../Text/Text.js';
import { ChevronIcon } from '../Accordion/ChevronIcon.js';
import { Collapse } from '../Collapse/Collapse.js';

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
  variant: "light",
  childrenOffset: "lg"
};
const _NavLink = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("NavLink", defaultProps, props), {
    label,
    description,
    icon,
    rightSection,
    className,
    classNames,
    styles,
    unstyled,
    active,
    color,
    variant,
    noWrap,
    children,
    opened,
    defaultOpened,
    onChange,
    disableRightSectionRotation,
    childrenOffset,
    disabled,
    onClick
  } = _a, others = __objRest(_a, [
    "label",
    "description",
    "icon",
    "rightSection",
    "className",
    "classNames",
    "styles",
    "unstyled",
    "active",
    "color",
    "variant",
    "noWrap",
    "children",
    "opened",
    "defaultOpened",
    "onChange",
    "disableRightSectionRotation",
    "childrenOffset",
    "disabled",
    "onClick"
  ]);
  const { classes, cx } = useStyles({ color, noWrap, childrenOffset, alignIcon: description ? "top" : "center" }, { name: "NavLink", classNames, styles, unstyled, variant });
  const [_opened, setOpened] = useUncontrolled({
    value: opened,
    defaultValue: defaultOpened,
    finalValue: false,
    onChange
  });
  const withChildren = !!children;
  const handleClick = (event) => {
    if (withChildren) {
      event.preventDefault();
      onClick == null ? void 0 : onClick(event);
      setOpened(!_opened);
    } else {
      onClick == null ? void 0 : onClick(event);
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(UnstyledButton, __spreadValues({
    ref,
    className: cx(classes.root, className),
    "data-active": active || void 0,
    onClick: handleClick,
    unstyled,
    "data-expanded": _opened || void 0,
    "data-disabled": disabled || void 0,
    disabled
  }, others), icon && /* @__PURE__ */ React.createElement("span", {
    className: classes.icon
  }, icon), /* @__PURE__ */ React.createElement("span", {
    className: classes.body
  }, /* @__PURE__ */ React.createElement(Text, {
    component: "span",
    size: "sm",
    className: classes.label
  }, label), /* @__PURE__ */ React.createElement(Text, {
    component: "span",
    color: "dimmed",
    size: "xs",
    "data-active": active || void 0,
    className: classes.description
  }, description)), (withChildren || rightSection) && /* @__PURE__ */ React.createElement("span", {
    className: classes.rightSection,
    "data-rotate": _opened && !disableRightSectionRotation || void 0
  }, withChildren ? rightSection || /* @__PURE__ */ React.createElement(ChevronIcon, {
    width: rem(14),
    height: rem(14),
    style: { transform: "rotate(-90deg)" }
  }) : rightSection)), /* @__PURE__ */ React.createElement(Collapse, {
    in: _opened
  }, /* @__PURE__ */ React.createElement("div", {
    className: classes.children
  }, children)));
});
_NavLink.displayName = "@mantine/core/NavLink";
const NavLink = createPolymorphicComponent(_NavLink);

export { NavLink, _NavLink };
//# sourceMappingURL=NavLink.js.map
