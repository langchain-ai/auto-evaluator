import React, { forwardRef, useState, useRef } from 'react';
import { useUncontrolled, useDidUpdate, useMergedRef } from '@mantine/hooks';
import { getDefaultZIndex } from '@mantine/styles';
import { groupOptions } from '@mantine/utils';
import { SelectItems } from '../Select/SelectItems/SelectItems.js';
import { DefaultItem } from '../Select/DefaultItem/DefaultItem.js';
import { SelectPopover } from '../Select/SelectPopover/SelectPopover.js';
import { SelectScrollArea } from '../Select/SelectScrollArea/SelectScrollArea.js';
import { filterData } from './filter-data/filter-data.js';
import useStyles from './Autocomplete.styles.js';
import { useInputProps } from '../Input/use-input-props.js';
import { Input } from '../Input/Input.js';

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
function defaultFilter(value, item) {
  return item.value.toLowerCase().trim().includes(value.toLowerCase().trim());
}
const defaultProps = {
  required: false,
  size: "sm",
  shadow: "sm",
  limit: 5,
  itemComponent: DefaultItem,
  transitionProps: { transition: "fade", duration: 0 },
  initiallyOpened: false,
  filter: defaultFilter,
  switchDirectionOnFlip: false,
  zIndex: getDefaultZIndex("popover"),
  dropdownPosition: "flip",
  maxDropdownHeight: "auto",
  positionDependencies: []
};
const Autocomplete = forwardRef((props, ref) => {
  const _a = useInputProps("Autocomplete", defaultProps, props), {
    inputProps,
    wrapperProps,
    shadow,
    data,
    limit,
    value,
    defaultValue,
    onChange,
    unstyled,
    itemComponent,
    onItemSubmit,
    onKeyDown,
    onFocus,
    onBlur,
    onClick,
    transitionProps,
    initiallyOpened,
    classNames,
    styles,
    filter,
    nothingFound,
    onDropdownClose,
    onDropdownOpen,
    withinPortal,
    switchDirectionOnFlip,
    zIndex,
    dropdownPosition,
    maxDropdownHeight,
    dropdownComponent,
    positionDependencies,
    readOnly,
    hoverOnSearchChange
  } = _a, others = __objRest(_a, [
    "inputProps",
    "wrapperProps",
    "shadow",
    "data",
    "limit",
    "value",
    "defaultValue",
    "onChange",
    "unstyled",
    "itemComponent",
    "onItemSubmit",
    "onKeyDown",
    "onFocus",
    "onBlur",
    "onClick",
    "transitionProps",
    "initiallyOpened",
    "classNames",
    "styles",
    "filter",
    "nothingFound",
    "onDropdownClose",
    "onDropdownOpen",
    "withinPortal",
    "switchDirectionOnFlip",
    "zIndex",
    "dropdownPosition",
    "maxDropdownHeight",
    "dropdownComponent",
    "positionDependencies",
    "readOnly",
    "hoverOnSearchChange"
  ]);
  const { classes } = useStyles(null, { classNames, styles, name: "Autocomplete", unstyled });
  const [dropdownOpened, _setDropdownOpened] = useState(initiallyOpened);
  const [hovered, setHovered] = useState(-1);
  const [direction, setDirection] = useState("column");
  const inputRef = useRef(null);
  const [IMEOpen, setIMEOpen] = useState(false);
  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: "",
    onChange
  });
  const setDropdownOpened = (opened) => {
    _setDropdownOpened(opened);
    const handler = opened ? onDropdownOpen : onDropdownClose;
    typeof handler === "function" && handler();
  };
  useDidUpdate(() => {
    if (hoverOnSearchChange && _value) {
      setHovered(0);
    } else {
      setHovered(-1);
    }
  }, [_value, hoverOnSearchChange]);
  const handleItemClick = (item) => {
    handleChange(item.value);
    typeof onItemSubmit === "function" && onItemSubmit(item);
    setDropdownOpened(false);
  };
  const formattedData = data.map((item) => typeof item === "string" ? { value: item } : item);
  const filteredData = groupOptions({
    data: filterData({ data: formattedData, value: _value, limit, filter })
  });
  const handleInputKeydown = (event) => {
    if (IMEOpen) {
      return;
    }
    typeof onKeyDown === "function" && onKeyDown(event);
    const isColumn = direction === "column";
    const handleNext = () => {
      setHovered((current) => current < filteredData.length - 1 ? current + 1 : current);
    };
    const handlePrevious = () => {
      setHovered((current) => current > 0 ? current - 1 : current);
    };
    switch (event.key) {
      case "ArrowUp": {
        event.preventDefault();
        isColumn ? handlePrevious() : handleNext();
        break;
      }
      case "ArrowDown": {
        event.preventDefault();
        isColumn ? handleNext() : handlePrevious();
        break;
      }
      case "Enter": {
        if (filteredData[hovered] && dropdownOpened) {
          event.preventDefault();
          handleChange(filteredData[hovered].value);
          typeof onItemSubmit === "function" && onItemSubmit(filteredData[hovered]);
          setDropdownOpened(false);
        }
        break;
      }
      case "Escape": {
        if (dropdownOpened) {
          event.preventDefault();
          setDropdownOpened(false);
        }
      }
    }
  };
  const handleInputFocus = (event) => {
    typeof onFocus === "function" && onFocus(event);
    setDropdownOpened(true);
  };
  const handleInputBlur = (event) => {
    typeof onBlur === "function" && onBlur(event);
    setDropdownOpened(false);
  };
  const handleInputClick = (event) => {
    typeof onClick === "function" && onClick(event);
    setDropdownOpened(true);
  };
  const shouldRenderDropdown = dropdownOpened && (filteredData.length > 0 || filteredData.length === 0 && !!nothingFound);
  return /* @__PURE__ */ React.createElement(Input.Wrapper, __spreadProps(__spreadValues({}, wrapperProps), {
    __staticSelector: "Autocomplete"
  }), /* @__PURE__ */ React.createElement(SelectPopover, {
    opened: shouldRenderDropdown,
    transitionProps,
    shadow: "sm",
    withinPortal,
    __staticSelector: "Autocomplete",
    onDirectionChange: setDirection,
    switchDirectionOnFlip,
    zIndex,
    dropdownPosition,
    positionDependencies,
    classNames,
    styles,
    unstyled,
    readOnly,
    variant: inputProps.variant
  }, /* @__PURE__ */ React.createElement(SelectPopover.Target, null, /* @__PURE__ */ React.createElement("div", {
    className: classes.wrapper,
    "aria-controls": inputProps.id,
    onMouseLeave: () => setHovered(-1),
    tabIndex: -1
  }, /* @__PURE__ */ React.createElement(Input, __spreadProps(__spreadValues(__spreadValues({
    type: "search",
    autoComplete: "off"
  }, inputProps), others), {
    readOnly,
    "data-mantine-stop-propagation": dropdownOpened,
    ref: useMergedRef(ref, inputRef),
    onKeyDown: handleInputKeydown,
    classNames,
    styles,
    __staticSelector: "Autocomplete",
    value: _value,
    onChange: (event) => {
      handleChange(event.currentTarget.value);
      setDropdownOpened(true);
    },
    onFocus: handleInputFocus,
    onBlur: handleInputBlur,
    onClick: handleInputClick,
    onCompositionStart: () => setIMEOpen(true),
    onCompositionEnd: () => setIMEOpen(false),
    role: "combobox",
    "aria-haspopup": "listbox",
    "aria-owns": shouldRenderDropdown ? `${inputProps.id}-items` : null,
    "aria-expanded": shouldRenderDropdown,
    "aria-autocomplete": "list",
    "aria-controls": shouldRenderDropdown ? `${inputProps.id}-items` : null,
    "aria-activedescendant": hovered >= 0 ? `${inputProps.id}-${hovered}` : null
  })))), /* @__PURE__ */ React.createElement(SelectPopover.Dropdown, {
    component: dropdownComponent || SelectScrollArea,
    maxHeight: maxDropdownHeight,
    direction,
    id: inputProps.id,
    __staticSelector: "Autocomplete",
    classNames,
    styles
  }, /* @__PURE__ */ React.createElement(SelectItems, {
    data: filteredData,
    hovered,
    classNames,
    styles,
    uuid: inputProps.id,
    __staticSelector: "Autocomplete",
    onItemHover: setHovered,
    onItemSelect: handleItemClick,
    itemComponent,
    size: inputProps.size,
    nothingFound,
    variant: inputProps.variant
  }))));
});
Autocomplete.displayName = "@mantine/core/Autocomplete";

export { Autocomplete, defaultFilter };
//# sourceMappingURL=Autocomplete.js.map
