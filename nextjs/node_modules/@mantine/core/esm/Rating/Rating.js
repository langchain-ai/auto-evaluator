import React, { forwardRef, useRef, useState } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { useId, useUncontrolled, useMergedRef, clamp } from '@mantine/hooks';
import { RatingItem } from './RatingItem/RatingItem.js';
import useStyles from './Rating.styles.js';
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
function roundValueTo(value, to) {
  var _a;
  const rounded = Math.round(value / to) * to;
  const precision = ((_a = `${to}`.split(".")[1]) == null ? void 0 : _a.length) || 0;
  return Number(rounded.toFixed(precision));
}
const defaultProps = {
  size: "sm",
  getSymbolLabel: (value) => `${value}`,
  count: 5,
  fractions: 1,
  color: "yellow"
};
const Rating = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("Rating", defaultProps, props), {
    defaultValue,
    value,
    emptySymbol,
    fullSymbol,
    size,
    count,
    fractions,
    onChange,
    onHover,
    getSymbolLabel,
    name,
    readOnly,
    className,
    classNames,
    styles,
    unstyled,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    highlightSelectedOnly,
    color,
    id,
    variant
  } = _a, others = __objRest(_a, [
    "defaultValue",
    "value",
    "emptySymbol",
    "fullSymbol",
    "size",
    "count",
    "fractions",
    "onChange",
    "onHover",
    "getSymbolLabel",
    "name",
    "readOnly",
    "className",
    "classNames",
    "styles",
    "unstyled",
    "onMouseEnter",
    "onMouseMove",
    "onMouseLeave",
    "highlightSelectedOnly",
    "color",
    "id",
    "variant"
  ]);
  const { classes, cx, theme } = useStyles(null, {
    name: "Rating",
    classNames,
    styles,
    unstyled,
    variant,
    size
  });
  const _name = useId(name);
  const _id = useId(id);
  const rootRef = useRef(null);
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: 0,
    onChange
  });
  const [hovered, setHovered] = useState(-1);
  const [isOutside, setOutside] = useState(true);
  const _fractions = Math.floor(fractions);
  const _count = Math.floor(count);
  const decimalUnit = 1 / _fractions;
  const stableValueRounded = roundValueTo(_value, decimalUnit);
  const finalValue = hovered !== -1 ? hovered : stableValueRounded;
  const handleMouseEnter = (event) => {
    onMouseEnter == null ? void 0 : onMouseEnter(event);
    !readOnly && setOutside(false);
  };
  const handleMouseMove = (event) => {
    onMouseMove == null ? void 0 : onMouseMove(event);
    if (readOnly) {
      return;
    }
    const { left, right, width } = rootRef.current.getBoundingClientRect();
    const symbolWidth = width / _count;
    const hoverPosition = theme.dir === "rtl" ? right - event.clientX : event.clientX - left;
    const hoverValue = hoverPosition / symbolWidth;
    const rounded = clamp(roundValueTo(hoverValue + decimalUnit / 2, decimalUnit), decimalUnit, _count);
    setHovered(rounded);
    rounded !== hovered && (onHover == null ? void 0 : onHover(rounded));
  };
  const handleMouseLeave = (event) => {
    onMouseLeave == null ? void 0 : onMouseLeave(event);
    if (readOnly) {
      return;
    }
    setHovered(-1);
    setOutside(true);
    hovered !== -1 && (onHover == null ? void 0 : onHover(-1));
  };
  const handleItemBlur = () => isOutside && setHovered(-1);
  const handleChange = (event) => {
    if (typeof event === "number") {
      setValue(event);
    } else {
      setValue(parseFloat(event.target.value));
    }
  };
  const items = Array(_count).fill(0).map((_, index) => {
    const integerValue = index + 1;
    const fractionItems = Array.from(new Array(index === 0 ? _fractions + 1 : _fractions));
    const isGroupActive = !readOnly && Math.ceil(hovered) === integerValue;
    return /* @__PURE__ */ React.createElement("div", {
      key: integerValue,
      "data-active": isGroupActive,
      className: classes.symbolGroup
    }, fractionItems.map((__, fractionIndex) => {
      const fractionValue = decimalUnit * (index === 0 ? fractionIndex : fractionIndex + 1);
      const symbolValue = roundValueTo(integerValue - 1 + fractionValue, decimalUnit);
      return /* @__PURE__ */ React.createElement(RatingItem, {
        key: `${integerValue}-${symbolValue}`,
        size,
        variant,
        getSymbolLabel,
        emptyIcon: emptySymbol,
        fullIcon: fullSymbol,
        full: highlightSelectedOnly ? symbolValue === finalValue : symbolValue <= finalValue,
        active: symbolValue === finalValue,
        checked: symbolValue === stableValueRounded,
        readOnly,
        fractionValue,
        value: symbolValue,
        name: _name,
        onChange: handleChange,
        onBlur: handleItemBlur,
        classNames,
        styles,
        unstyled,
        color,
        id: `${_id}-${index}-${fractionIndex}`
      });
    }));
  });
  return /* @__PURE__ */ React.createElement(Box, __spreadValues({
    ref: useMergedRef(rootRef, ref),
    className: cx(classes.root, className),
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  }, others), items);
});
Rating.displayName = "@mantine/core/Rating";

export { Rating };
//# sourceMappingURL=Rating.js.map
