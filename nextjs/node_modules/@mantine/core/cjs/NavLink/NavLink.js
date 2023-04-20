'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var utils = require('@mantine/utils');
var hooks = require('@mantine/hooks');
var NavLink_styles = require('./NavLink.styles.js');
var UnstyledButton = require('../UnstyledButton/UnstyledButton.js');
var Text = require('../Text/Text.js');
var ChevronIcon = require('../Accordion/ChevronIcon.js');
var Collapse = require('../Collapse/Collapse.js');

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
  variant: "light",
  childrenOffset: "lg"
};
const _NavLink = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("NavLink", defaultProps, props), {
    label,
    description,
    icon,
    rightSection,
    className,
    classNames,
    styles: styles$1,
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
  const { classes, cx } = NavLink_styles['default']({ color, noWrap, childrenOffset, alignIcon: description ? "top" : "center" }, { name: "NavLink", classNames, styles: styles$1, unstyled, variant });
  const [_opened, setOpened] = hooks.useUncontrolled({
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
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(UnstyledButton.UnstyledButton, __spreadValues({
    ref,
    className: cx(classes.root, className),
    "data-active": active || void 0,
    onClick: handleClick,
    unstyled,
    "data-expanded": _opened || void 0,
    "data-disabled": disabled || void 0,
    disabled
  }, others), icon && /* @__PURE__ */ React__default.createElement("span", {
    className: classes.icon
  }, icon), /* @__PURE__ */ React__default.createElement("span", {
    className: classes.body
  }, /* @__PURE__ */ React__default.createElement(Text.Text, {
    component: "span",
    size: "sm",
    className: classes.label
  }, label), /* @__PURE__ */ React__default.createElement(Text.Text, {
    component: "span",
    color: "dimmed",
    size: "xs",
    "data-active": active || void 0,
    className: classes.description
  }, description)), (withChildren || rightSection) && /* @__PURE__ */ React__default.createElement("span", {
    className: classes.rightSection,
    "data-rotate": _opened && !disableRightSectionRotation || void 0
  }, withChildren ? rightSection || /* @__PURE__ */ React__default.createElement(ChevronIcon.ChevronIcon, {
    width: styles.rem(14),
    height: styles.rem(14),
    style: { transform: "rotate(-90deg)" }
  }) : rightSection)), /* @__PURE__ */ React__default.createElement(Collapse.Collapse, {
    in: _opened
  }, /* @__PURE__ */ React__default.createElement("div", {
    className: classes.children
  }, children)));
});
_NavLink.displayName = "@mantine/core/NavLink";
const NavLink = utils.createPolymorphicComponent(_NavLink);

exports.NavLink = NavLink;
exports._NavLink = _NavLink;
//# sourceMappingURL=NavLink.js.map
