import React, { forwardRef, useState, useEffect } from 'react';
import { useComponentDefaultProps, rem } from '@mantine/styles';
import { useElementSize } from '@mantine/hooks';
import useStyles from './Spoiler.styles.js';
import { Box } from '../Box/Box.js';
import { Anchor } from '../Anchor/Anchor.js';

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
  maxHeight: 100,
  transitionDuration: 200,
  initialState: false
};
const Spoiler = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("Spoiler", defaultProps, props), {
    className,
    children,
    maxHeight,
    hideLabel,
    showLabel,
    transitionDuration,
    controlRef,
    initialState,
    classNames,
    styles,
    unstyled,
    variant
  } = _a, others = __objRest(_a, [
    "className",
    "children",
    "maxHeight",
    "hideLabel",
    "showLabel",
    "transitionDuration",
    "controlRef",
    "initialState",
    "classNames",
    "styles",
    "unstyled",
    "variant"
  ]);
  const { classes, cx } = useStyles({ transitionDuration }, { name: "Spoiler", classNames, styles, unstyled, variant });
  const [show, setShowState] = useState(initialState);
  const [spoiler, setSpoilerState] = useState(initialState);
  const { ref: contentRef, height } = useElementSize();
  const spoilerMoreContent = show ? hideLabel : showLabel;
  useEffect(() => {
    setSpoilerState(maxHeight < height);
  }, [height, maxHeight, children]);
  return /* @__PURE__ */ React.createElement(Box, __spreadValues({
    className: cx(classes.root, className),
    ref
  }, others), /* @__PURE__ */ React.createElement("div", {
    className: classes.content,
    style: {
      maxHeight: !show ? rem(maxHeight) : height ? rem(height) : void 0
    }
  }, /* @__PURE__ */ React.createElement("div", {
    ref: contentRef
  }, children)), spoiler && /* @__PURE__ */ React.createElement(Anchor, {
    component: "button",
    ref: controlRef,
    onClick: () => setShowState((opened) => !opened),
    className: classes.control
  }, spoilerMoreContent));
});
Spoiler.displayName = "@mantine/core/Spoiler";

export { Spoiler };
//# sourceMappingURL=Spoiler.js.map
