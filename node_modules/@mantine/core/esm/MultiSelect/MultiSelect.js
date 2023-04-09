import React, { forwardRef, useRef, useState } from 'react';
import { useId, useUncontrolled, useScrollIntoView, useDidUpdate, useMergedRef } from '@mantine/hooks';
import { getDefaultZIndex, useComponentDefaultProps } from '@mantine/styles';
import { groupOptions } from '@mantine/utils';
import { DefaultValue } from './DefaultValue/DefaultValue.js';
import { DefaultItem } from '../Select/DefaultItem/DefaultItem.js';
import { filterData } from './filter-data/filter-data.js';
import { getSelectRightSectionProps } from '../Select/SelectRightSection/get-select-right-section-props.js';
import { SelectScrollArea } from '../Select/SelectScrollArea/SelectScrollArea.js';
import { SelectPopover } from '../Select/SelectPopover/SelectPopover.js';
import { SelectItems } from '../Select/SelectItems/SelectItems.js';
import useStyles from './MultiSelect.styles.js';
import { extractSystemStyles } from '../Box/style-system-props/extract-system-styles/extract-system-styles.js';
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
function defaultFilter(value, selected, item) {
  if (selected) {
    return false;
  }
  return item.label.toLowerCase().trim().includes(value.toLowerCase().trim());
}
function defaultShouldCreate(query, data) {
  return !!query && !data.some((item) => item.value.toLowerCase() === query.toLowerCase());
}
function filterValue(value, data) {
  if (!Array.isArray(value)) {
    return void 0;
  }
  if (data.length === 0) {
    return [];
  }
  const flatData = data.map((item) => {
    if (typeof item === "object") {
      return item.value;
    }
    return item;
  });
  return value.filter((val) => flatData.includes(val));
}
const defaultProps = {
  size: "sm",
  valueComponent: DefaultValue,
  itemComponent: DefaultItem,
  transitionProps: { transition: "fade", duration: 0 },
  maxDropdownHeight: 220,
  shadow: "sm",
  searchable: false,
  filter: defaultFilter,
  limit: Infinity,
  clearSearchOnChange: true,
  clearable: false,
  clearSearchOnBlur: false,
  disabled: false,
  initiallyOpened: false,
  creatable: false,
  shouldCreate: defaultShouldCreate,
  switchDirectionOnFlip: false,
  zIndex: getDefaultZIndex("popover"),
  selectOnBlur: false,
  positionDependencies: [],
  dropdownPosition: "flip"
};
const MultiSelect = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("MultiSelect", defaultProps, props), {
    className,
    style,
    required,
    label,
    description,
    size,
    error,
    classNames,
    styles,
    wrapperProps,
    value,
    defaultValue,
    data,
    onChange,
    valueComponent: Value,
    itemComponent,
    id,
    transitionProps,
    maxDropdownHeight,
    shadow,
    nothingFound,
    onFocus,
    onBlur,
    searchable,
    placeholder,
    filter,
    limit,
    clearSearchOnChange,
    clearable,
    clearSearchOnBlur,
    variant,
    onSearchChange,
    searchValue,
    disabled,
    initiallyOpened,
    radius,
    icon,
    rightSection,
    rightSectionWidth,
    creatable,
    getCreateLabel,
    shouldCreate,
    onCreate,
    sx,
    dropdownComponent,
    onDropdownClose,
    onDropdownOpen,
    maxSelectedValues,
    withinPortal,
    switchDirectionOnFlip,
    zIndex,
    selectOnBlur,
    name,
    dropdownPosition,
    errorProps,
    labelProps,
    descriptionProps,
    form,
    positionDependencies,
    onKeyDown,
    unstyled,
    inputContainer,
    inputWrapperOrder,
    readOnly,
    withAsterisk,
    clearButtonProps,
    hoverOnSearchChange,
    disableSelectedItemFiltering
  } = _a, others = __objRest(_a, [
    "className",
    "style",
    "required",
    "label",
    "description",
    "size",
    "error",
    "classNames",
    "styles",
    "wrapperProps",
    "value",
    "defaultValue",
    "data",
    "onChange",
    "valueComponent",
    "itemComponent",
    "id",
    "transitionProps",
    "maxDropdownHeight",
    "shadow",
    "nothingFound",
    "onFocus",
    "onBlur",
    "searchable",
    "placeholder",
    "filter",
    "limit",
    "clearSearchOnChange",
    "clearable",
    "clearSearchOnBlur",
    "variant",
    "onSearchChange",
    "searchValue",
    "disabled",
    "initiallyOpened",
    "radius",
    "icon",
    "rightSection",
    "rightSectionWidth",
    "creatable",
    "getCreateLabel",
    "shouldCreate",
    "onCreate",
    "sx",
    "dropdownComponent",
    "onDropdownClose",
    "onDropdownOpen",
    "maxSelectedValues",
    "withinPortal",
    "switchDirectionOnFlip",
    "zIndex",
    "selectOnBlur",
    "name",
    "dropdownPosition",
    "errorProps",
    "labelProps",
    "descriptionProps",
    "form",
    "positionDependencies",
    "onKeyDown",
    "unstyled",
    "inputContainer",
    "inputWrapperOrder",
    "readOnly",
    "withAsterisk",
    "clearButtonProps",
    "hoverOnSearchChange",
    "disableSelectedItemFiltering"
  ]);
  const { classes, cx, theme } = useStyles({ invalid: !!error }, { name: "MultiSelect", classNames, styles, unstyled, size, variant });
  const { systemStyles, rest } = extractSystemStyles(others);
  const inputRef = useRef();
  const itemsRefs = useRef({});
  const uuid = useId(id);
  const [dropdownOpened, setDropdownOpened] = useState(initiallyOpened);
  const [hovered, setHovered] = useState(-1);
  const [direction, setDirection] = useState("column");
  const [_searchValue, handleSearchChange] = useUncontrolled({
    value: searchValue,
    defaultValue: "",
    finalValue: void 0,
    onChange: onSearchChange
  });
  const [IMEOpen, setIMEOpen] = useState(false);
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({
    duration: 0,
    offset: 5,
    cancelable: false,
    isList: true
  });
  const isCreatable = creatable && typeof getCreateLabel === "function";
  let createLabel = null;
  const formattedData = data.map((item) => typeof item === "string" ? { label: item, value: item } : item);
  const sortedData = groupOptions({ data: formattedData });
  const [_value, setValue] = useUncontrolled({
    value: filterValue(value, data),
    defaultValue: filterValue(defaultValue, data),
    finalValue: [],
    onChange
  });
  const valuesOverflow = useRef(!!maxSelectedValues && maxSelectedValues < _value.length);
  const handleValueRemove = (_val) => {
    if (!readOnly) {
      const newValue = _value.filter((val) => val !== _val);
      setValue(newValue);
      if (!!maxSelectedValues && newValue.length < maxSelectedValues) {
        valuesOverflow.current = false;
      }
    }
  };
  const handleInputChange = (event) => {
    handleSearchChange(event.currentTarget.value);
    !disabled && !valuesOverflow.current && searchable && setDropdownOpened(true);
  };
  const handleInputFocus = (event) => {
    typeof onFocus === "function" && onFocus(event);
    !disabled && !valuesOverflow.current && searchable && setDropdownOpened(true);
  };
  const filteredData = filterData({
    data: sortedData,
    searchable,
    searchValue: _searchValue,
    limit,
    filter,
    value: _value,
    disableSelectedItemFiltering
  });
  const getNextIndex = (index, nextItem, compareFn) => {
    let i = index;
    while (compareFn(i)) {
      i = nextItem(i);
      if (!filteredData[i].disabled)
        return i;
    }
    return index;
  };
  useDidUpdate(() => {
    if (hoverOnSearchChange && _searchValue) {
      setHovered(0);
    } else {
      setHovered(-1);
    }
  }, [_searchValue, hoverOnSearchChange]);
  useDidUpdate(() => {
    if (!disabled && _value.length > data.length) {
      setDropdownOpened(false);
    }
    if (!!maxSelectedValues && _value.length < maxSelectedValues) {
      valuesOverflow.current = false;
    }
    if (!!maxSelectedValues && _value.length >= maxSelectedValues) {
      valuesOverflow.current = true;
      setDropdownOpened(false);
    }
  }, [_value]);
  const handleItemSelect = (item) => {
    if (!readOnly) {
      clearSearchOnChange && handleSearchChange("");
      if (_value.includes(item.value)) {
        handleValueRemove(item.value);
      } else {
        if (item.creatable && typeof onCreate === "function") {
          const createdItem = onCreate(item.value);
          if (typeof createdItem !== "undefined" && createdItem !== null) {
            if (typeof createdItem === "string") {
              setValue([..._value, createdItem]);
            } else {
              setValue([..._value, createdItem.value]);
            }
          }
        } else {
          setValue([..._value, item.value]);
        }
        if (_value.length === maxSelectedValues - 1) {
          valuesOverflow.current = true;
          setDropdownOpened(false);
        }
        if (hovered === filteredData.length - 1) {
          setHovered(filteredData.length - 2);
        }
        if (filteredData.length === 1) {
          setDropdownOpened(false);
        }
      }
    }
  };
  const handleInputBlur = (event) => {
    typeof onBlur === "function" && onBlur(event);
    if (selectOnBlur && filteredData[hovered] && dropdownOpened) {
      handleItemSelect(filteredData[hovered]);
    }
    clearSearchOnBlur && handleSearchChange("");
    setDropdownOpened(false);
  };
  const handleInputKeydown = (event) => {
    if (IMEOpen) {
      return;
    }
    onKeyDown == null ? void 0 : onKeyDown(event);
    if (readOnly) {
      return;
    }
    if (event.key !== "Backspace" && !!maxSelectedValues && valuesOverflow.current) {
      return;
    }
    const isColumn = direction === "column";
    const handleNext = () => {
      setHovered((current) => {
        var _a2;
        const nextIndex = getNextIndex(current, (index) => index + 1, (index) => index < filteredData.length - 1);
        if (dropdownOpened) {
          targetRef.current = itemsRefs.current[(_a2 = filteredData[nextIndex]) == null ? void 0 : _a2.value];
          scrollIntoView({
            alignment: isColumn ? "end" : "start"
          });
        }
        return nextIndex;
      });
    };
    const handlePrevious = () => {
      setHovered((current) => {
        var _a2;
        const nextIndex = getNextIndex(current, (index) => index - 1, (index) => index > 0);
        if (dropdownOpened) {
          targetRef.current = itemsRefs.current[(_a2 = filteredData[nextIndex]) == null ? void 0 : _a2.value];
          scrollIntoView({
            alignment: isColumn ? "start" : "end"
          });
        }
        return nextIndex;
      });
    };
    switch (event.key) {
      case "ArrowUp": {
        event.preventDefault();
        setDropdownOpened(true);
        isColumn ? handlePrevious() : handleNext();
        break;
      }
      case "ArrowDown": {
        event.preventDefault();
        setDropdownOpened(true);
        isColumn ? handleNext() : handlePrevious();
        break;
      }
      case "Enter": {
        event.preventDefault();
        if (filteredData[hovered] && dropdownOpened) {
          handleItemSelect(filteredData[hovered]);
        } else {
          setDropdownOpened(true);
        }
        break;
      }
      case " ": {
        if (!searchable) {
          event.preventDefault();
          if (filteredData[hovered] && dropdownOpened) {
            handleItemSelect(filteredData[hovered]);
          } else {
            setDropdownOpened(true);
          }
        }
        break;
      }
      case "Backspace": {
        if (_value.length > 0 && _searchValue.length === 0) {
          setValue(_value.slice(0, -1));
          setDropdownOpened(true);
          if (maxSelectedValues) {
            valuesOverflow.current = false;
          }
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
          scrollIntoView({
            alignment: isColumn ? "end" : "start"
          });
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
          scrollIntoView({
            alignment: isColumn ? "end" : "start"
          });
        }
        break;
      }
      case "Escape": {
        setDropdownOpened(false);
      }
    }
  };
  const selectedItems = _value.map((val) => {
    let selectedItem = sortedData.find((item) => item.value === val && !item.disabled);
    if (!selectedItem && isCreatable) {
      selectedItem = {
        value: val,
        label: val
      };
    }
    return selectedItem;
  }).filter((val) => !!val).map((item) => /* @__PURE__ */ React.createElement(Value, __spreadProps(__spreadValues({}, item), {
    variant,
    disabled,
    className: classes.value,
    readOnly,
    onRemove: (event) => {
      event.preventDefault();
      event.stopPropagation();
      handleValueRemove(item.value);
    },
    key: item.value,
    size,
    styles,
    classNames,
    radius
  })));
  const isItemSelected = (itemValue) => _value.includes(itemValue);
  const handleClear = () => {
    var _a2;
    handleSearchChange("");
    setValue([]);
    (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
    if (maxSelectedValues) {
      valuesOverflow.current = false;
    }
  };
  if (isCreatable && shouldCreate(_searchValue, sortedData)) {
    createLabel = getCreateLabel(_searchValue);
    filteredData.push({ label: _searchValue, value: _searchValue, creatable: true });
  }
  const shouldRenderDropdown = !readOnly && (filteredData.length > 0 ? dropdownOpened : dropdownOpened && !!nothingFound);
  useDidUpdate(() => {
    const handler = shouldRenderDropdown ? onDropdownOpen : onDropdownClose;
    typeof handler === "function" && handler();
  }, [shouldRenderDropdown]);
  return /* @__PURE__ */ React.createElement(Input.Wrapper, __spreadValues(__spreadValues({
    required,
    id: uuid,
    label,
    error,
    description,
    size,
    className,
    style,
    classNames,
    styles,
    __staticSelector: "MultiSelect",
    sx,
    errorProps,
    descriptionProps,
    labelProps,
    inputContainer,
    inputWrapperOrder,
    unstyled,
    withAsterisk,
    variant
  }, systemStyles), wrapperProps), /* @__PURE__ */ React.createElement(SelectPopover, {
    opened: shouldRenderDropdown,
    transitionProps,
    shadow: "sm",
    withinPortal,
    __staticSelector: "MultiSelect",
    onDirectionChange: setDirection,
    switchDirectionOnFlip,
    zIndex,
    dropdownPosition,
    positionDependencies: [...positionDependencies, _searchValue],
    classNames,
    styles,
    unstyled,
    variant
  }, /* @__PURE__ */ React.createElement(SelectPopover.Target, null, /* @__PURE__ */ React.createElement("div", {
    className: classes.wrapper,
    role: "combobox",
    "aria-haspopup": "listbox",
    "aria-owns": dropdownOpened && shouldRenderDropdown ? `${uuid}-items` : null,
    "aria-controls": uuid,
    "aria-expanded": dropdownOpened,
    onMouseLeave: () => setHovered(-1),
    tabIndex: -1
  }, /* @__PURE__ */ React.createElement("input", {
    type: "hidden",
    name,
    value: _value.join(","),
    form,
    disabled
  }), /* @__PURE__ */ React.createElement(Input, __spreadValues({
    __staticSelector: "MultiSelect",
    style: { overflow: "hidden" },
    component: "div",
    multiline: true,
    size,
    variant,
    disabled,
    error,
    required,
    radius,
    icon,
    unstyled,
    onMouseDown: (event) => {
      var _a2;
      event.preventDefault();
      !disabled && !valuesOverflow.current && setDropdownOpened(!dropdownOpened);
      (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
    },
    classNames: __spreadProps(__spreadValues({}, classNames), {
      input: cx({ [classes.input]: !searchable }, classNames == null ? void 0 : classNames.input)
    })
  }, getSelectRightSectionProps({
    theme,
    rightSection,
    rightSectionWidth,
    styles,
    size,
    shouldClear: clearable && _value.length > 0,
    onClear: handleClear,
    error,
    disabled,
    clearButtonProps,
    readOnly
  })), /* @__PURE__ */ React.createElement("div", {
    className: classes.values,
    "data-clearable": clearable || void 0
  }, selectedItems, /* @__PURE__ */ React.createElement("input", __spreadValues({
    ref: useMergedRef(ref, inputRef),
    type: "search",
    id: uuid,
    className: cx(classes.searchInput, {
      [classes.searchInputPointer]: !searchable,
      [classes.searchInputInputHidden]: !dropdownOpened && _value.length > 0 || !searchable && _value.length > 0,
      [classes.searchInputEmpty]: _value.length === 0
    }),
    onKeyDown: handleInputKeydown,
    value: _searchValue,
    onChange: handleInputChange,
    onFocus: handleInputFocus,
    onBlur: handleInputBlur,
    readOnly: !searchable || valuesOverflow.current || readOnly,
    placeholder: _value.length === 0 ? placeholder : void 0,
    disabled,
    "data-mantine-stop-propagation": dropdownOpened,
    autoComplete: "off",
    onCompositionStart: () => setIMEOpen(true),
    onCompositionEnd: () => setIMEOpen(false)
  }, rest)))))), /* @__PURE__ */ React.createElement(SelectPopover.Dropdown, {
    component: dropdownComponent || SelectScrollArea,
    maxHeight: maxDropdownHeight,
    direction,
    id: uuid,
    innerRef: scrollableRef,
    __staticSelector: "MultiSelect",
    classNames,
    styles
  }, /* @__PURE__ */ React.createElement(SelectItems, {
    data: filteredData,
    hovered,
    classNames,
    styles,
    uuid,
    __staticSelector: "MultiSelect",
    onItemHover: setHovered,
    onItemSelect: handleItemSelect,
    itemsRefs,
    itemComponent,
    size,
    nothingFound,
    isItemSelected,
    creatable: creatable && !!createLabel,
    createLabel,
    unstyled,
    variant
  }))));
});
MultiSelect.displayName = "@mantine/core/MultiSelect";

export { MultiSelect, defaultFilter, defaultShouldCreate };
//# sourceMappingURL=MultiSelect.js.map
