'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var Dialog_styles = require('./Dialog.styles.js');
var Affix = require('../Affix/Affix.js');
var Transition = require('../Transition/Transition.js');
var Paper = require('../Paper/Paper.js');
var CloseButton = require('../CloseButton/CloseButton.js');

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
  shadow: "md",
  p: "md",
  withBorder: false,
  size: "md",
  transition: "pop-top-right",
  transitionDuration: 200
};
function DialogBody(props) {
  const _a = styles.useComponentDefaultProps("Dialog", defaultProps, props), {
    withCloseButton,
    onClose,
    position,
    shadow,
    children,
    className,
    style,
    classNames,
    styles: styles$1,
    opened,
    withBorder,
    size,
    transition,
    transitionDuration,
    transitionTimingFunction,
    unstyled,
    variant,
    keepMounted
  } = _a, others = __objRest(_a, [
    "withCloseButton",
    "onClose",
    "position",
    "shadow",
    "children",
    "className",
    "style",
    "classNames",
    "styles",
    "opened",
    "withBorder",
    "size",
    "transition",
    "transitionDuration",
    "transitionTimingFunction",
    "unstyled",
    "variant",
    "keepMounted"
  ]);
  const { classes, cx } = Dialog_styles['default'](null, {
    classNames,
    styles: styles$1,
    unstyled,
    name: "Dialog",
    variant,
    size
  });
  return /* @__PURE__ */ React__default.createElement(Transition.Transition, {
    keepMounted,
    mounted: opened,
    transition,
    duration: transitionDuration,
    timingFunction: transitionTimingFunction
  }, (transitionStyles) => /* @__PURE__ */ React__default.createElement(Paper.Paper, __spreadValues({
    className: cx(classes.root, className),
    style: __spreadValues(__spreadValues({}, style), transitionStyles),
    shadow,
    withBorder,
    unstyled
  }, others), withCloseButton && /* @__PURE__ */ React__default.createElement(CloseButton.CloseButton, {
    onClick: onClose,
    className: classes.closeButton
  }), children));
}
const Dialog = React.forwardRef((_a, ref) => {
  var _b = _a, { zIndex = styles.getDefaultZIndex("modal") } = _b, props = __objRest(_b, ["zIndex"]);
  const theme = styles.useMantineTheme();
  return /* @__PURE__ */ React__default.createElement(Affix.Affix, {
    zIndex,
    position: props.position || { bottom: theme.spacing.xl, right: theme.spacing.xl },
    ref
  }, /* @__PURE__ */ React__default.createElement(DialogBody, __spreadValues({}, props)));
});
Dialog.displayName = "@mantine/core/Dialog";

exports.Dialog = Dialog;
exports.DialogBody = DialogBody;
//# sourceMappingURL=Dialog.js.map
