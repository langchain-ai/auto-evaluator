'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var InputLabel_styles = require('./InputLabel.styles.js');
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
  labelElement: "label",
  size: "sm"
};
const InputLabel = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("InputLabel", defaultProps, props), {
    labelElement,
    children,
    required,
    size,
    classNames,
    styles: styles$1,
    unstyled,
    className,
    htmlFor,
    __staticSelector,
    variant,
    onMouseDown
  } = _a, others = __objRest(_a, [
    "labelElement",
    "children",
    "required",
    "size",
    "classNames",
    "styles",
    "unstyled",
    "className",
    "htmlFor",
    "__staticSelector",
    "variant",
    "onMouseDown"
  ]);
  const { classes, cx } = InputLabel_styles['default'](null, {
    name: ["InputWrapper", __staticSelector],
    classNames,
    styles: styles$1,
    unstyled,
    variant,
    size
  });
  return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues({
    component: labelElement,
    ref,
    className: cx(classes.label, className),
    htmlFor: labelElement === "label" ? htmlFor : void 0,
    onMouseDown: (event) => {
      onMouseDown == null ? void 0 : onMouseDown(event);
      if (!event.defaultPrevented && event.detail > 1) {
        event.preventDefault();
      }
    }
  }, others), children, required && /* @__PURE__ */ React__default.createElement("span", {
    className: classes.required,
    "aria-hidden": true
  }, " *"));
});
InputLabel.displayName = "@mantine/core/InputLabel";

exports.InputLabel = InputLabel;
//# sourceMappingURL=InputLabel.js.map
