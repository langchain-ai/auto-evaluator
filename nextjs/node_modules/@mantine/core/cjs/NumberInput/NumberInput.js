'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('@mantine/hooks');
var styles = require('@mantine/styles');
var getInputMode = require('./get-input-mode/get-input-mode.js');
var Chevron = require('./Chevron.js');
var NumberInput_styles = require('./NumberInput.styles.js');
var TextInput = require('../TextInput/TextInput.js');

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
  xs: styles.rem(10),
  sm: styles.rem(14),
  md: styles.rem(16),
  lg: styles.rem(18),
  xl: styles.rem(20)
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
const NumberInput = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("NumberInput", defaultProps, props), {
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
    styles: styles$1,
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
  const { classes, cx } = NumberInput_styles['default']({ radius }, { classNames, styles: styles$1, unstyled, name: "NumberInput", variant, size });
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
  const [internalValue, _setInternalValue] = React.useState(typeof value === "number" ? value : typeof defaultValue === "number" ? defaultValue : "");
  const [inputValue, setInputValue] = React.useState(() => formatInternalValue(internalValue));
  const inputRef = React.useRef();
  const [isFocussed, setIsFocussed] = React.useState(false);
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
  const incrementRef = React.useRef();
  incrementRef.current = () => {
    var _a2;
    let newInternalValue;
    if (internalValue === "") {
      newInternalValue = (_a2 = startValue != null ? startValue : min) != null ? _a2 : 0;
    } else {
      newInternalValue = parseFloat(parsePrecision(hooks.clamp(internalValue + step, _min, _max)));
    }
    setInternalValue(newInternalValue, true);
    onChange == null ? void 0 : onChange(newInternalValue);
  };
  const decrementRef = React.useRef();
  decrementRef.current = () => {
    var _a2;
    let newInternalValue;
    if (internalValue === "") {
      newInternalValue = (_a2 = startValue != null ? startValue : min) != null ? _a2 : 0;
    } else {
      newInternalValue = parseFloat(parsePrecision(hooks.clamp(internalValue - step, _min, _max)));
    }
    setInternalValue(newInternalValue, true);
    onChange == null ? void 0 : onChange(newInternalValue);
  };
  hooks.assignRef(handlersRef, { increment: incrementRef.current, decrement: decrementRef.current });
  React.useEffect(() => {
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
  const onStepTimeoutRef = React.useRef(null);
  const stepCountRef = React.useRef(0);
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
  React.useEffect(() => {
    onStepDone();
    return onStepDone;
  }, []);
  const controls = /* @__PURE__ */ React__default.createElement("div", {
    className: classes.rightSection
  }, /* @__PURE__ */ React__default.createElement("button", {
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
  }, /* @__PURE__ */ React__default.createElement(Chevron.Chevron, {
    size: styles.getSize({ size, sizes: CHEVRON_SIZES }),
    direction: "up"
  })), /* @__PURE__ */ React__default.createElement("button", {
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
  }, /* @__PURE__ */ React__default.createElement(Chevron.Chevron, {
    size: styles.getSize({ size, sizes: CHEVRON_SIZES }),
    direction: "down"
  })));
  const processInputValue = (newInputValue) => {
    let normalizedInputValue = newInputValue;
    if (normalizedInputValue[0] === `${decimalSeparator}` || normalizedInputValue[0] === ".") {
      normalizedInputValue = `0${normalizedInputValue}`;
    }
    const parsedValue = parseFloat(parsePrecision(parseFloat(parseNum(normalizedInputValue))));
    const clampedValue = !noClampOnBlur ? hooks.clamp(parsedValue, _min, _max) : parsedValue;
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
  return /* @__PURE__ */ React__default.createElement(TextInput.TextInput, __spreadProps(__spreadValues({}, others), {
    type,
    variant,
    value: inputValue,
    disabled,
    readOnly,
    ref: hooks.useMergedRef(inputRef, ref),
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    rightSection: rightSection || (disabled || readOnly || hideControls || variant === "unstyled" ? null : controls),
    rightSectionWidth: rightSectionWidth != null ? rightSectionWidth : `calc(${styles.getSize({ size, sizes: NumberInput_styles.CONTROL_SIZES })} + ${styles.rem(1)})`,
    radius,
    max,
    min,
    step,
    size,
    styles: styles$1,
    classNames,
    inputMode: inputMode || getInputMode.getInputMode(step, precision, hooks.useOs()),
    __staticSelector: "NumberInput",
    unstyled
  }));
});
NumberInput.displayName = "@mantine/core/NumberInput";

exports.NumberInput = NumberInput;
//# sourceMappingURL=NumberInput.js.map
