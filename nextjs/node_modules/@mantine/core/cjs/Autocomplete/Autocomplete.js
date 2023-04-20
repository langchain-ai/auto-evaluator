'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('@mantine/hooks');
var styles = require('@mantine/styles');
var utils = require('@mantine/utils');
var SelectItems = require('../Select/SelectItems/SelectItems.js');
var DefaultItem = require('../Select/DefaultItem/DefaultItem.js');
var SelectPopover = require('../Select/SelectPopover/SelectPopover.js');
var SelectScrollArea = require('../Select/SelectScrollArea/SelectScrollArea.js');
var filterData = require('./filter-data/filter-data.js');
var Autocomplete_styles = require('./Autocomplete.styles.js');
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
  return item.value.toLowerCase().trim().includes(value.toLowerCase().trim());
}
const defaultProps = {
  required: false,
  size: "sm",
  shadow: "sm",
  limit: 5,
  itemComponent: DefaultItem.DefaultItem,
  transitionProps: { transition: "fade", duration: 0 },
  initiallyOpened: false,
  filter: defaultFilter,
  switchDirectionOnFlip: false,
  zIndex: styles.getDefaultZIndex("popover"),
  dropdownPosition: "flip",
  maxDropdownHeight: "auto",
  positionDependencies: []
};
const Autocomplete = React.forwardRef((props, ref) => {
  const _a = useInputProps.useInputProps("Autocomplete", defaultProps, props), {
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
  const { classes } = Autocomplete_styles['default'](null, { classNames, styles, name: "Autocomplete", unstyled });
  const [dropdownOpened, _setDropdownOpened] = React.useState(initiallyOpened);
  const [hovered, setHovered] = React.useState(-1);
  const [direction, setDirection] = React.useState("column");
  const inputRef = React.useRef(null);
  const [IMEOpen, setIMEOpen] = React.useState(false);
  const [_value, handleChange] = hooks.useUncontrolled({
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
  hooks.useDidUpdate(() => {
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
  const filteredData = utils.groupOptions({
    data: filterData.filterData({ data: formattedData, value: _value, limit, filter })
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
  return /* @__PURE__ */ React__default.createElement(Input.Input.Wrapper, __spreadProps(__spreadValues({}, wrapperProps), {
    __staticSelector: "Autocomplete"
  }), /* @__PURE__ */ React__default.createElement(SelectPopover.SelectPopover, {
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
  }, /* @__PURE__ */ React__default.createElement(SelectPopover.SelectPopover.Target, null, /* @__PURE__ */ React__default.createElement("div", {
    className: classes.wrapper,
    "aria-controls": inputProps.id,
    onMouseLeave: () => setHovered(-1),
    tabIndex: -1
  }, /* @__PURE__ */ React__default.createElement(Input.Input, __spreadProps(__spreadValues(__spreadValues({
    type: "search",
    autoComplete: "off"
  }, inputProps), others), {
    readOnly,
    "data-mantine-stop-propagation": dropdownOpened,
    ref: hooks.useMergedRef(ref, inputRef),
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
  })))), /* @__PURE__ */ React__default.createElement(SelectPopover.SelectPopover.Dropdown, {
    component: dropdownComponent || SelectScrollArea.SelectScrollArea,
    maxHeight: maxDropdownHeight,
    direction,
    id: inputProps.id,
    __staticSelector: "Autocomplete",
    classNames,
    styles
  }, /* @__PURE__ */ React__default.createElement(SelectItems.SelectItems, {
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

exports.Autocomplete = Autocomplete;
exports.defaultFilter = defaultFilter;
//# sourceMappingURL=Autocomplete.js.map
