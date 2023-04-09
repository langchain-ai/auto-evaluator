'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var Modal_context = require('../Modal.context.js');
var ModalRoot_styles = require('./ModalRoot.styles.js');
var ModalBase = require('../../ModalBase/ModalBase.js');

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
const defaultProps = __spreadProps(__spreadValues({}, ModalBase.ModalBaseDefaultProps), {
  yOffset: "5vh",
  xOffset: "5vw"
});
function ModalRoot(props) {
  const _a = styles.useComponentDefaultProps("ModalRoot", defaultProps, props), {
    classNames,
    variant,
    size,
    yOffset,
    xOffset,
    scrollAreaComponent,
    radius,
    centered,
    fullScreen
  } = _a, others = __objRest(_a, [
    "classNames",
    "variant",
    "size",
    "yOffset",
    "xOffset",
    "scrollAreaComponent",
    "radius",
    "centered",
    "fullScreen"
  ]);
  const { classes, cx } = ModalRoot_styles['default']({ yOffset, xOffset, centered, fullScreen }, { name: "Modal", variant, size });
  return /* @__PURE__ */ React__default.createElement(Modal_context.ModalProvider, {
    value: { yOffset, scrollAreaComponent, radius }
  }, /* @__PURE__ */ React__default.createElement(ModalBase.ModalBase, __spreadValues({
    __staticSelector: "Modal",
    size,
    variant,
    classNames: __spreadProps(__spreadValues({}, classNames), {
      content: cx(classes.content, classNames == null ? void 0 : classNames.content),
      inner: cx(classes.inner, classNames == null ? void 0 : classNames.inner)
    })
  }, others)));
}

exports.ModalRoot = ModalRoot;
//# sourceMappingURL=ModalRoot.js.map
