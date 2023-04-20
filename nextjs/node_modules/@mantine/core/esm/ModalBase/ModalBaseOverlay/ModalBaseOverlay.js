import { useComponentDefaultProps } from '@mantine/styles';
import React, { forwardRef } from 'react';
import { useModalBaseContext } from '../ModalBase.context.js';
import useStyles from './ModalBaseOverlay.styles.js';
import { Transition } from '../../Transition/Transition.js';
import { Overlay } from '../../Overlay/Overlay.js';

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
const defaultProps = {};
const ModalBaseOverlay = forwardRef((props, ref) => {
  const ctx = useModalBaseContext();
  const _a = useComponentDefaultProps(`${ctx.__staticSelector}Overlay`, defaultProps, props), { onClick, transitionProps, style, className } = _a, others = __objRest(_a, ["onClick", "transitionProps", "style", "className"]);
  const { classes, cx } = useStyles(null, ctx.stylesApi);
  const handleClick = (event) => {
    onClick == null ? void 0 : onClick(event);
    ctx.closeOnClickOutside && ctx.onClose();
  };
  return /* @__PURE__ */ React.createElement(Transition, __spreadProps(__spreadValues(__spreadValues({
    mounted: ctx.opened
  }, ctx.transitionProps), transitionProps), {
    transition: "fade"
  }), (transitionStyles) => /* @__PURE__ */ React.createElement(Overlay, __spreadValues({
    ref,
    onClick: handleClick,
    fixed: true,
    style: __spreadValues(__spreadValues({}, style), transitionStyles),
    className: cx(classes.overlay, className),
    zIndex: ctx.zIndex
  }, others)));
});

export { ModalBaseOverlay };
//# sourceMappingURL=ModalBaseOverlay.js.map
