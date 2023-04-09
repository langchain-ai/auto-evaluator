import React, { forwardRef, useRef, useState, useEffect } from 'react';
import { useReducedMotion, useUncontrolled, useId, useResizeObserver, useIsomorphicEffect, useMergedRef } from '@mantine/hooks';
import { useComponentDefaultProps, useMantineTheme } from '@mantine/styles';
import useStyles, { WRAPPER_PADDING } from './SegmentedControl.styles.js';
import { Box } from '../Box/Box.js';

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
  disabled: false,
  size: "sm",
  transitionDuration: 200
};
const SegmentedControl = forwardRef((props, ref) => {
  var _b, _c, _d, _e;
  const _a = useComponentDefaultProps("SegmentedControl", defaultProps, props), {
    className,
    disabled,
    data: _data,
    name,
    value,
    onChange,
    color,
    fullWidth,
    radius,
    size,
    transitionDuration,
    transitionTimingFunction,
    classNames,
    styles,
    defaultValue,
    orientation,
    unstyled,
    variant,
    readOnly
  } = _a, others = __objRest(_a, [
    "className",
    "disabled",
    "data",
    "name",
    "value",
    "onChange",
    "color",
    "fullWidth",
    "radius",
    "size",
    "transitionDuration",
    "transitionTimingFunction",
    "classNames",
    "styles",
    "defaultValue",
    "orientation",
    "unstyled",
    "variant",
    "readOnly"
  ]);
  const theme = useMantineTheme();
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = theme.respectReducedMotion ? shouldReduceMotion : false;
  const data = _data.map((item) => typeof item === "string" ? { label: item, value: item } : item);
  const mounted = useRef();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [_value, handleValueChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: Array.isArray(data) ? (_e = (_d = (_b = data.find((item) => !item.disabled)) == null ? void 0 : _b.value) != null ? _d : (_c = data[0]) == null ? void 0 : _c.value) != null ? _e : null : null,
    onChange
  });
  const { classes, cx } = useStyles({
    fullWidth,
    color,
    radius,
    shouldAnimate: reduceMotion || !shouldAnimate,
    transitionDuration,
    transitionTimingFunction,
    orientation
  }, { name: "SegmentedControl", classNames, styles, unstyled, variant, size });
  const [activePosition, setActivePosition] = useState({
    width: 0,
    height: 0,
    translate: [0, 0]
  });
  const uuid = useId(name);
  const refs = useRef({});
  const [observerRef, containerRect] = useResizeObserver();
  useIsomorphicEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      setShouldAnimate(false);
    } else {
      setShouldAnimate(true);
    }
  });
  useEffect(() => {
    if (_value in refs.current && observerRef.current) {
      const element = refs.current[_value];
      const elementRect = element.getBoundingClientRect();
      const scaledValue = element.offsetWidth / elementRect.width;
      const width = elementRect.width * scaledValue || 0;
      const height = elementRect.height * scaledValue || 0;
      const offsetRight = containerRect.width - element.parentElement.offsetLeft + WRAPPER_PADDING - width;
      const offsetLeft = element.parentElement.offsetLeft - WRAPPER_PADDING;
      setActivePosition({
        width,
        height,
        translate: [
          theme.dir === "rtl" ? offsetRight : offsetLeft,
          element.parentElement.offsetTop - WRAPPER_PADDING
        ]
      });
    }
  }, [_value, containerRect]);
  const controls = data.map((item) => /* @__PURE__ */ React.createElement("div", {
    className: cx(classes.control, { [classes.controlActive]: _value === item.value }),
    key: item.value
  }, /* @__PURE__ */ React.createElement("input", {
    className: classes.input,
    disabled: disabled || item.disabled,
    type: "radio",
    name: uuid,
    value: item.value,
    id: `${uuid}-${item.value}`,
    checked: _value === item.value,
    onChange: () => !readOnly && handleValueChange(item.value)
  }), /* @__PURE__ */ React.createElement("label", {
    className: classes.label,
    "data-active": _value === item.value && !(disabled || item.disabled) || void 0,
    "data-disabled": disabled || item.disabled || void 0,
    htmlFor: `${uuid}-${item.value}`,
    ref: (node) => {
      refs.current[item.value] = node;
    }
  }, item.label)));
  const mergedRef = useMergedRef(observerRef, ref);
  if (data.length === 0) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(Box, __spreadValues({
    className: cx(classes.root, className),
    ref: mergedRef
  }, others), typeof _value === "string" && shouldAnimate && /* @__PURE__ */ React.createElement(Box, {
    component: "span",
    className: classes.indicator,
    sx: {
      width: activePosition.width,
      height: activePosition.height,
      transform: `translate(${activePosition.translate[0]}px, ${activePosition.translate[1]}px)`
    }
  }), controls);
});
SegmentedControl.displayName = "@mantine/core/SegmentedControl";

export { SegmentedControl };
//# sourceMappingURL=SegmentedControl.js.map
