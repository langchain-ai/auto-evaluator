import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useIsomorphicEffect } from '@mantine/hooks';
import { useComponentDefaultProps, useMantineTheme } from '@mantine/styles';

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
function Portal(props) {
  const _a = useComponentDefaultProps("Portal", {}, props), { children, target, className, innerRef } = _a, others = __objRest(_a, ["children", "target", "className", "innerRef"]);
  const theme = useMantineTheme();
  const [mounted, setMounted] = useState(false);
  const ref = useRef();
  useIsomorphicEffect(() => {
    setMounted(true);
    ref.current = !target ? document.createElement("div") : typeof target === "string" ? document.querySelector(target) : target;
    if (!target) {
      document.body.appendChild(ref.current);
    }
    return () => {
      !target && document.body.removeChild(ref.current);
    };
  }, [target]);
  if (!mounted) {
    return null;
  }
  return createPortal(/* @__PURE__ */ React.createElement("div", __spreadProps(__spreadValues({
    className,
    dir: theme.dir
  }, others), {
    ref: innerRef
  }), children), ref.current);
}
Portal.displayName = "@mantine/core/Portal";

export { Portal };
//# sourceMappingURL=Portal.js.map
