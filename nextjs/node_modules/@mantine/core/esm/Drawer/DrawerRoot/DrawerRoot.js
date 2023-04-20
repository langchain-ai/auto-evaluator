import React from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { DrawerProvider } from '../Drawer.context.js';
import useStyles from './DrawerRoot.styles.js';
import { ModalBase, ModalBaseDefaultProps } from '../../ModalBase/ModalBase.js';

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
const transitions = {
  top: "slide-down",
  bottom: "slide-up",
  left: "slide-right",
  right: "slide-left"
};
const rtlTransitions = {
  top: "slide-down",
  bottom: "slide-up",
  right: "slide-right",
  left: "slide-left"
};
const defaultProps = __spreadProps(__spreadValues({}, ModalBaseDefaultProps), {
  position: "left"
});
function DrawerRoot(props) {
  const _a = useComponentDefaultProps("DrawerRoot", defaultProps, props), { classNames, variant, size, scrollAreaComponent, position, transitionProps } = _a, others = __objRest(_a, ["classNames", "variant", "size", "scrollAreaComponent", "position", "transitionProps"]);
  const { classes, cx, theme } = useStyles({ position }, { name: "Drawer", variant, size });
  const drawerTransition = (theme.dir === "rtl" ? rtlTransitions : transitions)[position];
  return /* @__PURE__ */ React.createElement(DrawerProvider, {
    value: { scrollAreaComponent }
  }, /* @__PURE__ */ React.createElement(ModalBase, __spreadValues({
    __staticSelector: "Drawer",
    size,
    variant,
    transitionProps: __spreadValues({ transition: drawerTransition, duration: 200 }, transitionProps),
    classNames: __spreadProps(__spreadValues({}, classNames), {
      content: cx(classes.content, classNames == null ? void 0 : classNames.content),
      inner: cx(classes.inner, classNames == null ? void 0 : classNames.inner)
    })
  }, others)));
}

export { DrawerRoot };
//# sourceMappingURL=DrawerRoot.js.map
