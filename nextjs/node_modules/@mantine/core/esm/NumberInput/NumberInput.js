import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { clamp, assignRef, useMergedRef, useOs } from '@mantine/hooks';
import { rem, useComponentDefaultProps, getSize } from '@mantine/styles';
import { getInputMode } from './get-input-mode/get-input-mode.js';
import { Chevron } from './Chevron.js';
import useStyles, { CONTROL_SIZES } from './NumberInput.styles.js';
import { TextInput } from '../TextInput/TextInput.js';

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
const defaultFormatter = (value) => value || "";
const defaultParser = (num) => {
  if (num === "-") {
    return num;
  }
  let tempNum = num;
  if (tempNum[0] === ".") {
    tempNum = `0${num}`;
  }
  const parsedNum = parseFloat(tempNum);
  if (Number.isNaN(parsedNum)) {
    return "";
  }
  return num;
};
const CHEVRON_SIZES = {
  xs: rem(10),
  sm: rem(14),
  md: rem(16),
  lg: rem(18),
  xl: rem(20)
};
const defaultProps = {
  step: 1,
  hideControls: false,
  size: "sm",
  precision: 0,
  noClampOnBlur: false,
  removeTrailingZeros: false,
  decimalSeparator: ".",
  formatter: defaultFormatter,
  parser: defaultParser,
  type: "text"
};
const NumberInput = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("NumberInput", defaultProps, props), {
    readOnly,
    disabled,
    value,
    onChange,
    decimalSeparator,
    thousandsSeparator,
    min,
    max,
    startValue,
    step,
    stepHoldInterval,
    stepHoldDelay,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
    hideControls,
    radius,
    variant,
    precision,
    removeTrailingZeros,
    defaultValue,
    noClampOnBlur,
    handlersRef,
    classNames,
    styles,
    size,
    rightSection,
    rightSectionWidth,
    formatter,
    parser,
    inputMode,
    unstyled,
    type
  } = _a, others = __objRest(_a, [
    "readOnly",
    "disabled",
    "value",
    "onChange",
    "decimalSeparator",
    "thousandsSeparator",
    "min",
    "max",
    "startValue",
    "step",
    "stepHoldInterval",
    "stepHoldDelay",
    "onFocus",
    "onBlur",
    "onKeyDown",
    "onKeyUp",
    "hideControls",
    "radius",
    "variant",
    "precision",
    "removeTrailingZeros",
    "defaultValue",
    "noClampOnBlur",
    "handlersRef",
    "classNames",
    "styles",
    "size",
    "rightSection",
    "rightSectionWidth",
    "formatter",
    "parser",
    "inputMode",
    "unstyled",
    "type"
  ]);
  const { classes, cx } = useStyles({ radius }, { classNames, styles, unstyled, name: "NumberInput", variant, size });
  const parsePrecision = (val) => {
    if (val === "")
      return "";
    let result = val.toFixed(precision);
    if (removeTrailingZeros && precision > 0) {
      result = result.replace(new RegExp(`[0]{0,${precision}}$`), "");
      if (result.endsWith(".")) {
        result = result.slice(0, -1);
      }
    }
    return result;
  };
  const formatNum = (val) => {
    let parsedStr = val;
    if (decimalSeparator) {
      parsedStr = parsedStr.replace(".", decimalSeparator);
    }
    return formatter(parsedStr);
  };
  const parseNum = (val) => {
    let num = val;
    if (decimalSeparator) {
      num = num.replaceAll(thousandsSeparator, "").replace(decimalSeparator, ".");
    }
    return parser(num);
  };
  const formatInternalValue = (val) => formatNum(parsePrecision(val));
  const [internalValue, _setInternalValue] = useState(typeof value === "number" ? value : typeof defaultValue === "number" ? defaultValue : "");
  const [inputValue, setInputValue] = useState(() => formatInternalValue(internalValue));
  const inputRef = useRef();
  const [isFocussed, setIsFocussed] = useState(false);
  const setInternalValue = (val, forceInputValueUpdate) => {
    if (!isFocussed || forceInputValueUpdate) {
      const newInputValue = formatInternalValue(val);
      if (newInputValue !== inputValue) {
        setInputValue(newInputValue);
      }
    }
    if (val !== internalValue) {
      _setInternalValue(val);
    }
  };
  const _min = typeof min === "number" ? min : -Infinity;
  const _max = typeof max === "number" ? max : Infinity;
  const incrementRef = useRef();
  incrementRef.current = () => {
    var _a2;
    let newInternalValue;
    if (internalValue === "") {
      newInternalValue = (_a2 = startValue != null ? startValue : min) != null ? _a2 : 0;
    } else {
      newInternalValue = parseFloat(parsePrecision(clamp(internalValue + step, _min, _max)));
    }
    setInternalValue(newInternalValue, true);
    onChange == null ? void 0 : onChange(newInternalValue);
  };
  const decrementRef = useRef();
  decrementRef.current = () => {
    var _a2;
    let newInternalValue;
    if (internalValue === "") {
      newInternalValue = (_a2 = startValue != null ? startValue : min) != null ? _a2 : 0;
    } else {
      newInternalValue = parseFloat(parsePrecision(clamp(internalValue - step, _min, _max)));
    }
    setInternalValue(newInternalValue, true);
    onChange == null ? void 0 : onChange(newInternalValue);
  };
  assignRef(handlersRef, { increment: incrementRef.current, decrement: decrementRef.current });
  useEffect(() => {
    if (isFocussed) {
      return;
    }
    if (value === void 0) {
      setInternalValue(internalValue, true);
    } else {
      setInternalValue(value, true);
    }
  }, [value, isFocussed]);
  const shouldUseStepInterval = stepHoldDelay !== void 0 && stepHoldInterval !== void 0;
  const onStepTimeoutRef = useRef(null);
  const stepCountRef = useRef(0);
  const onStepDone = () => {
    if (onStepTimeoutRef.current) {
      window.clearTimeout(onStepTimeoutRef.current);
    }
    onStepTimeoutRef.current = null;
    stepCountRef.current = 0;
  };
  const onStepHandleChange = (isIncrement) => {
    if (isIncrement) {
      incrementRef.current();
    } else {
      decrementRef.current();
    }
    stepCountRef.current += 1;
  };
  const onStepLoop = (isIncrement) => {
    onStepHandleChange(isIncrement);
    if (shouldUseStepInterval) {
      const interval = typeof stepHoldInterval === "number" ? stepHoldInterval : stepHoldInterval(stepCountRef.current);
      onStepTimeoutRef.current = window.setTimeout(() => onStepLoop(isIncrement), interval);
    }
  };
  const onStep = (event, isIncrement) => {
    event.preventDefault();
    inputRef.current.focus();
    onStepHandleChange(isIncrement);
    if (shouldUseStepInterval) {
      onStepTimeoutRef.current = window.setTimeout(() => onStepLoop(isIncrement), stepHoldDelay);
    }
  };
  useEffect(() => {
    onStepDone();
    return onStepDone;
  }, []);
  const controls = /* @__PURE__ */ React.createElement("div", {
    className: classes.rightSection
  }, /* @__PURE__ */ React.createElement("button", {
    type: "button",
    tabIndex: -1,
    "aria-hidden": true,
    disabled: internalValue >= max,
    className: cx(classes.control, classes.controlUp),
    onPointerDown: (event) => {
      onStep(event, true);
    },
    onPointerUp: onStepDone,
    onPointerLeave: onStepDone
  }, /* @__PURE__ */ React.createElement(Chevron, {
    size: getSize({ size, sizes: CHEVRON_SIZES }),
    direction: "up"
  })), /* @__PURE__ */ React.createElement("button", {
    type: "button",
    tabIndex: -1,
    "aria-hidden": true,
    disabled: internalValue <= min,
    className: cx(classes.control, classes.controlDown),
    onPointerDown: (event) => {
      onStep(event, false);
    },
    onPointerUp: onStepDone,
    onPointerLeave: onStepDone
  }, /* @__PURE__ */ React.createElement(Chevron, {
    size: getSize({ size, sizes: CHEVRON_SIZES }),
    direction: "down"
  })));
  const processInputValue = (newInputValue) => {
    let normalizedInputValue = newInputValue;
    if (normalizedInputValue[0] === `${decimalSeparator}` || normalizedInputValue[0] === ".") {
      normalizedInputValue = `0${normalizedInputValue}`;
    }
    const parsedValue = parseFloat(parsePrecision(parseFloat(parseNum(normalizedInputValue))));
    const clampedValue = !noClampOnBlur ? clamp(parsedValue, _min, _max) : parsedValue;
    const finalValue = Number.isNaN(clampedValue) ? "" : clampedValue;
    const internalValueChanged = internalValue !== finalValue;
    setInputValue(newInputValue);
    setInternalValue(finalValue);
    if (internalValueChanged) {
      onChange == null ? void 0 : onChange(finalValue);
    }
  };
  const handleChange = (event) => {
    const evt = event.nativeEvent;
    if (evt.isComposing) {
      return;
    }
    processInputValue(event.target.value);
  };
  const handleFocus = (event) => {
    setIsFocussed(true);
    onFocus == null ? void 0 : onFocus(event);
  };
  const handleBlur = (event) => {
    setIsFocussed(false);
    onBlur == null ? void 0 : onBlur(event);
  };
  const handleKeyDown = (event) => {
    typeof onKeyDown === "function" && onKeyDown(event);
    if (event.repeat && shouldUseStepInterval && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
      event.preventDefault();
      return;
    }
    if (!readOnly) {
      if (event.key === "ArrowUp") {
        onStep(event, true);
      } else if (event.key === "ArrowDown") {
        onStep(event, false);
      }
    }
  };
  const handleKeyUp = (event) => {
    typeof onKeyUp === "function" && onKeyUp(event);
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      onStepDone();
    }
  };
  return /* @__PURE__ */ React.createElement(TextInput, __spreadProps(__spreadValues({}, others), {
    type,
    variant,
    value: inputValue,
    disabled,
    readOnly,
    ref: useMergedRef(inputRef, ref),
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    rightSection: rightSection || (disabled || readOnly || hideControls || variant === "unstyled" ? null : controls),
    rightSectionWidth: rightSectionWidth != null ? rightSectionWidth : `calc(${getSize({ size, sizes: CONTROL_SIZES })} + ${rem(1)})`,
    radius,
    max,
    min,
    step,
    size,
    styles,
    classNames,
    inputMode: inputMode || getInputMode(step, precision, useOs()),
    __staticSelector: "NumberInput",
    unstyled
  }));
});
NumberInput.displayName = "@mantine/core/NumberInput";

export { NumberInput };
//# sourceMappingURL=NumberInput.js.map
