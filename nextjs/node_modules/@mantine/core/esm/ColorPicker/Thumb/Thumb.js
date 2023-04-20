import React from 'react';
import useStyles, { THUMB_SIZES } from './Thumb.styles.js';

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
function Thumb({
  position,
  className,
  styles,
  classNames,
  style,
  size,
  __staticSelector,
  unstyled,
  variant
}) {
  const { classes, cx } = useStyles(null, {
    classNames,
    styles,
    name: __staticSelector,
    unstyled,
    size,
    variant
  });
  return /* @__PURE__ */ React.createElement("div", {
    className: cx(classes.thumb, className),
    style: __spreadValues({
      left: `calc(${position.x * 100}% - ${THUMB_SIZES[size]} / 2)`,
      top: `calc(${position.y * 100}% - ${THUMB_SIZES[size]} / 2)`
    }, style)
  });
}
Thumb.displayName = "@mantine/core/Thumb";

export { Thumb };
//# sourceMappingURL=Thumb.js.map
