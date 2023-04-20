'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('@mantine/hooks');
var styles = require('@mantine/styles');
var utils = require('@mantine/utils');
var SelectScrollArea = require('./SelectScrollArea/SelectScrollArea.js');
var DefaultItem = require('./DefaultItem/DefaultItem.js');
var getSelectRightSectionProps = require('./SelectRightSection/get-select-right-section-props.js');
var SelectItems = require('./SelectItems/SelectItems.js');
var SelectPopover = require('./SelectPopover/SelectPopover.js');
var filterData = require('./filter-data/filter-data.js');
var Select_styles = require('./Select.styles.js');
var useInputProps = require('../Input/use-input-props.js');
var Input = require('../Input/Input.js');

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
function defaultFilter(value, item) {
  return item.label.toLowerCase().trim().includes(value.toLowerCase().trim());
}
function defaultShouldCreate(query, data) {
  return !!query && !data.some((item) => item.label.toLowerCase() === query.toLowerCase());
}
const defaultProps = {
  required: false,
  size: "sm",
  shadow: "sm",
  itemComponent: DefaultItem.DefaultItem,
  transitionProps: { transition: "fade", duration: 0 },
  initiallyOpened: false,
  filter: defaultFilter,
  maxDropdownHeight: 220,
  searchable: false,
  clearable: false,
  limit: Infinity,
  disabled: false,
  creatable: false,
  shouldCreate: defaultShouldCreate,
  selectOnBlur: false,
  switchDirectionOnFlip: false,
  filterDataOnExactSearchMatch: false,
  zIndex: styles.getDefaultZIndex("popover"),
  positionDependencies: [],
  dropdownPosition: "flip"
};
const Select = React.forwardRef((props, ref) => {
  const _a = useInputProps.useInputProps("Select", defaultProps, props), {
    inputProps,
    wrapperProps,
    shadow,
    data,
    value,
    defaultValue,
    onChange,
    itemComponent,
    onKeyDown,
    onBlur,
    onFocus,
    transitionProps,
    initiallyOpened,
    unstyled,
    classNames,
    styles,
    filter,
    maxDropdownHeight,
    searchable,
    clearable,
    nothingFound,
    limit,
    disabled,
    onSearchChange,
    searchValue,
    rightSection,
    rightSectionWidth,
    creatable,
    getCreateLabel,
    shouldCreate,
    selectOnBlur,
    onCreate,
    dropdownComponent,
    onDropdownClose,
    onDropdownOpen,
    withinPortal,
    portalProps,
    switchDirectionOnFlip,
    zIndex,
    name,
    dropdownPosition,
    allowDeselect,
    placeholder,
    filterDataOnExactSearchMatch,
    form,
    positionDependencies,
    readOnly,
    clearButtonProps,
    hoverOnSearchChange
  } = _a, others = __objRest(_a, [
    "inputProps",
    "wrapperProps",
    "shadow",
    "data",
    "value",
    "defaultValue",
    "onChange",
    "itemComponent",
    "onKeyDown",
    "onBlur",
    "onFocus",
    "transitionProps",
    "initiallyOpened",
    "unstyled",
    "classNames",
    "styles",
    "filter",
    "maxDropdownHeight",
    "searchable",
    "clearable",
    "nothingFound",
    "limit",
    "disabled",
    "onSearchChange",
    "searchValue",
    "rightSection",
    "rightSectionWidth",
    "creatable",
    "getCreateLabel",
    "shouldCreate",
    "selectOnBlur",
    "onCreate",
    "dropdownComponent",
    "onDropdownClose",
    "onDropdownOpen",
    "withinPortal",
    "portalProps",
    "switchDirectionOnFlip",
    "zIndex",
    "name",
    "dropdownPosition",
    "allowDeselect",
    "placeholder",
    "filterDataOnExactSearchMatch",
    "form",
    "positionDependencies",
    "readOnly",
    "clearButtonProps",
    "hoverOnSearchChange"
  ]);
  const { classes, cx, theme } = Select_styles['default']();
  const [dropdownOpened, _setDropdownOpened] = React.useState(initiallyOpened);
  const [hovered, setHovered] = React.useState(-1);
  const inputRef = React.useRef();
  const itemsRefs = React.useRef({});
  const [direction, setDirection] = React.useState("column");
  const isColumn = direction === "column";
  const { scrollIntoView, targetRef, scrollableRef } = hooks.useScrollIntoView({
    duration: 0,
    offset: 5,
    cancelable: false,
    isList: true
  });
  const isDeselectable = allowDeselect === void 0 ? clearable : allowDeselect;
  const setDropdownOpened = (opened) => {
    if (dropdownOpened !== opened) {
      _setDropdownOpened(opened);
      const handler = opened ? onDropdownOpen : onDropdownClose;
      typeof handler === "function" && handler();
    }
  };
  const isCreatable = creatable && typeof getCreateLabel === "function";
  let createLabel = null;
  const formattedData = data.map((item) => typeof item === "string" ? { label: item, value: item } : item);
  const sortedData = utils.groupOptions({ data: formattedData });
  const [_value, handleChange, controlled] = hooks.useUncontrolled({
    value,
    defaultValue,
    finalValue: null,
    onChange
  });
  const selectedValue = sortedData.find((item) => item.value === _value);
  const [inputValue, setInputValue] = hooks.useUncontrolled({
    value: searchValue,
    defaultValue: (selectedValue == null ? void 0 : selectedValue.label) || "",
    finalValue: void 0,
    onChange: onSearchChange
  });
  const handleSearchChange = (val) => {
    setInputValue(val);
    if (searchable && typeof onSearchChange === "function") {
      onSearchChange(val);
    }
  };
  const handleClear = () => {
    var _a2;
    if (!readOnly) {
      handleChange(null);
      if (!controlled) {
        handleSearchChange("");
      }
      (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
    }
  };
  React.useEffect(() => {
    const newSelectedValue = sortedData.find((item) => item.value === _value);
    if (newSelectedValue) {
      handleSearchChange(newSelectedValue.label);
    } else if (!isCreatable || !_value) {
      handleSearchChange("");
    }
  }, [_value]);
  React.useEffect(() => {
    if (selectedValue && (!searchable || !dropdownOpened)) {
      handleSearchChange(selectedValue.label);
    }
  }, [selectedValue == null ? void 0 : selectedValue.label]);
  const handleItemSelect = (item) => {
    if (!readOnly) {
      if (isDeselectable && (selectedValue == null ? void 0 : selectedValue.value) === item.value) {
        handleChange(null);
        setDropdownOpened(false);
      } else {
        if (item.creatable && typeof onCreate === "function") {
          const createdItem = onCreate(item.value);
          if (typeof createdItem !== "undefined" && createdItem !== null) {
            if (typeof createdItem === "string") {
              handleChange(createdItem);
            } else {
              handleChange(createdItem.value);
            }
          }
        } else {
          handleChange(item.value);
        }
        if (!controlled) {
          handleSearchChange(item.label);
        }
        setHovered(-1);
        setDropdownOpened(false);
        inputRef.current.focus();
      }
    }
  };
  const filteredData = filterData.filterData({
    data: sortedData,
    searchable,
    limit,
    searchValue: inputValue,
    filter,
    filterDataOnExactSearchMatch,
    value: _value
  });
  if (isCreatable && shouldCreate(inputValue, filteredData)) {
    createLabel = getCreateLabel(inputValue);
    filteredData.push({ label: inputValue, value: inputValue, creatable: true });
  }
  const getNextIndex = (index, nextItem, compareFn) => {
    let i = index;
    while (compareFn(i)) {
      i = nextItem(i);
      if (!filteredData[i].disabled)
        return i;
    }
    return index;
  };
  hooks.useDidUpdate(() => {
    if (hoverOnSearchChange && inputValue) {
      setHovered(0);
    } else {
      setHovered(-1);
    }
  }, [inputValue, hoverOnSearchChange]);
  const selectedItemIndex = _value ? filteredData.findIndex((el) => el.value === _value) : 0;
  const shouldShowDropdown = !readOnly && (filteredData.length > 0 ? dropdownOpened : dropdownOpened && !!nothingFound);
  const handlePrevious = () => {
    setHovered((current) => {
      var _a2;
      const nextIndex = getNextIndex(current, (index) => index - 1, (index) => index > 0);
      targetRef.current = itemsRefs.current[(_a2 = filteredData[nextIndex]) == null ? void 0 : _a2.value];
      shouldShowDropdown && scrollIntoView({ alignment: isColumn ? "start" : "end" });
      return nextIndex;
    });
  };
  const handleNext = () => {
    setHovered((current) => {
      var _a2;
      const nextIndex = getNextIndex(current, (index) => index + 1, (index) => index < filteredData.length - 1);
      targetRef.current = itemsRefs.current[(_a2 = filteredData[nextIndex]) == null ? void 0 : _a2.value];
      shouldShowDropdown && scrollIntoView({ alignment: isColumn ? "end" : "start" });
      return nextIndex;
    });
  };
  const scrollSelectedItemIntoView = () => window.setTimeout(() => {
    var _a2;
    targetRef.current = itemsRefs.current[(_a2 = filteredData[selectedItemIndex]) == null ? void 0 : _a2.value];
    scrollIntoView({ alignment: isColumn ? "end" : "start" });
  }, 0);
  hooks.useDidUpdate(() => {
    if (shouldShowDropdown)
      scrollSelectedItemIntoView();
  }, [shouldShowDropdown]);
  const handleInputKeydown = (event) => {
    typeof onKeyDown === "function" && onKeyDown(event);
    switch (event.key) {
      case "ArrowUp": {
        event.preventDefault();
        if (!dropdownOpened) {
          setHovered(selectedItemIndex);
          setDropdownOpened(true);
          scrollSelectedItemIntoView();
        } else {
          isColumn ? handlePrevious() : handleNext();
        }
        break;
      }
      case "ArrowDown": {
        event.preventDefault();
        if (!dropdownOpened) {
          setHovered(selectedItemIndex);
          setDropdownOpened(true);
          scrollSelectedItemIntoView();
        } else {
          isColumn ? handleNext() : handlePrevious();
        }
        break;
      }
      case "Home": {
        if (!searchable) {
          event.preventDefault();
          if (!dropdownOpened) {
            setDropdownOpened(true);
          }
          const firstItemIndex = filteredData.findIndex((item) => !item.disabled);
          setHovered(firstItemIndex);
          shouldShowDropdown && scrollIntoView({ alignment: isColumn ? "end" : "start" });
        }
        break;
      }
      case "End": {
        if (!searchable) {
          event.preventDefault();
          if (!dropdownOpened) {
            setDropdownOpened(true);
          }
          const lastItemIndex = filteredData.map((item) => !!item.disabled).lastIndexOf(false);
          setHovered(lastItemIndex);
          shouldShowDropdown && scrollIntoView({ alignment: isColumn ? "end" : "start" });
        }
        break;
      }
      case "Escape": {
        event.preventDefault();
        setDropdownOpened(false);
        setHovered(-1);
        break;
      }
      case " ": {
        if (!searchable) {
          event.preventDefault();
          if (filteredData[hovered] && dropdownOpened) {
            handleItemSelect(filteredData[hovered]);
          } else {
            setDropdownOpened(true);
            setHovered(selectedItemIndex);
            scrollSelectedItemIntoView();
          }
        }
        break;
      }
      case "Enter": {
        if (!searchable) {
          event.preventDefault();
        }
        if (filteredData[hovered] && dropdownOpened) {
          event.preventDefault();
          handleItemSelect(filteredData[hovered]);
        }
      }
    }
  };
  const handleInputBlur = (event) => {
    typeof onBlur === "function" && onBlur(event);
    const selected = sortedData.find((item) => item.value === _value);
    if (selectOnBlur && filteredData[hovered] && dropdownOpened) {
      handleItemSelect(filteredData[hovered]);
    }
    handleSearchChange((selected == null ? void 0 : selected.label) || "");
    setDropdownOpened(false);
  };
  const handleInputFocus = (event) => {
    typeof onFocus === "function" && onFocus(event);
    if (searchable) {
      setDropdownOpened(true);
    }
  };
  const handleInputChange = (event) => {
    if (!readOnly) {
      handleSearchChange(event.currentTarget.value);
      if (clearable && event.currentTarget.value === "") {
        handleChange(null);
      }
      setHovered(-1);
      setDropdownOpened(true);
    }
  };
  const handleInputClick = () => {
    if (!readOnly) {
      setDropdownOpened(!dropdownOpened);
      if (_value && !dropdownOpened) {
        setHovered(selectedItemIndex);
      }
    }
  };
  return /* @__PURE__ */ React__default.createElement(Input.Input.Wrapper, __spreadProps(__spreadValues({}, wrapperProps), {
    __staticSelector: "Select"
  }), /* @__PURE__ */ React__default.createElement(SelectPopover.SelectPopover, {
    opened: shouldShowDropdown,
    transitionProps,
    shadow,
    withinPortal,
    portalProps,
    __staticSelector: "Select",
    onDirectionChange: setDirection,
    switchDirectionOnFlip,
    zIndex,
    dropdownPosition,
    positionDependencies: [...positionDependencies, inputValue],
    classNames,
    styles,
    unstyled,
    variant: inputProps.variant
  }, /* @__PURE__ */ React__default.createElement(SelectPopover.SelectPopover.Target, null, /* @__PURE__ */ React__default.createElement("div", {
    role: "combobox",
    "aria-haspopup": "listbox",
    "aria-owns": shouldShowDropdown ? `${inputProps.id}-items` : null,
    "aria-controls": inputProps.id,
    "aria-expanded": shouldShowDropdown,
    onMouseLeave: () => setHovered(-1),
    tabIndex: -1
  }, /* @__PURE__ */ React__default.createElement("input", {
    type: "hidden",
    name,
    value: _value || "",
    form,
    disabled
  }), /* @__PURE__ */ React__default.createElement(Input.Input, __spreadValues(__spreadProps(__spreadValues(__spreadValues({
    autoComplete: "off",
    type: "search"
  }, inputProps), others), {
    ref: hooks.useMergedRef(ref, inputRef),
    onKeyDown: handleInputKeydown,
    __staticSelector: "Select",
    value: inputValue,
    placeholder,
    onChange: handleInputChange,
    "aria-autocomplete": "list",
    "aria-controls": shouldShowDropdown ? `${inputProps.id}-items` : null,
    "aria-activedescendant": hovered >= 0 ? `${inputProps.id}-${hovered}` : null,
    onMouseDown: handleInputClick,
    onBlur: handleInputBlur,
    onFocus: handleInputFocus,
    readOnly: !searchable || readOnly,
    disabled,
    "data-mantine-stop-propagation": shouldShowDropdown,
    name: null,
    classNames: __spreadProps(__spreadValues({}, classNames), {
      input: cx({ [classes.input]: !searchable }, classNames == null ? void 0 : classNames.input)
    })
  }), getSelectRightSectionProps.getSelectRightSectionProps({
    theme,
    rightSection,
    rightSectionWidth,
    styles,
    size: inputProps.size,
    shouldClear: clearable && !!selectedValue,
    onClear: handleClear,
    error: wrapperProps.error,
    clearButtonProps,
    disabled,
    readOnly
  }))))), /* @__PURE__ */ React__default.createElement(SelectPopover.SelectPopover.Dropdown, {
    component: dropdownComponent || SelectScrollArea.SelectScrollArea,
    maxHeight: maxDropdownHeight,
    direction,
    id: inputProps.id,
    innerRef: scrollableRef,
    __staticSelector: "Select",
    classNames,
    styles
  }, /* @__PURE__ */ React__default.createElement(SelectItems.SelectItems, {
    data: filteredData,
    hovered,
    classNames,
    styles,
    isItemSelected: (val) => val === _value,
    uuid: inputProps.id,
    __staticSelector: "Select",
    onItemHover: setHovered,
    onItemSelect: handleItemSelect,
    itemsRefs,
    itemComponent,
    size: inputProps.size,
    nothingFound,
    creatable: isCreatable && !!createLabel,
    createLabel,
    "aria-label": wrapperProps.label,
    unstyled,
    variant: inputProps.variant
  }))));
});
Select.displayName = "@mantine/core/Select";

exports.Select = Select;
exports.defaultFilter = defaultFilter;
exports.defaultShouldCreate = defaultShouldCreate;
//# sourceMappingURL=Select.js.map
