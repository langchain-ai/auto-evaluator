import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { useUncontrolled } from '@mantine/hooks';
import { RenderList } from './RenderList/RenderList.js';
import { SelectScrollArea } from '../Select/SelectScrollArea/SelectScrollArea.js';
import { DefaultItem } from './DefaultItem/DefaultItem.js';
import { useSelectionState } from './use-selection-state/use-selection-state.js';
import { SimpleGrid } from '../SimpleGrid/SimpleGrid.js';

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
function defaultFilter(query, item) {
  return item.label.toLowerCase().trim().includes(query.toLowerCase().trim());
}
const defaultProps = {
  itemComponent: DefaultItem,
  filter: defaultFilter,
  titles: [null, null],
  placeholder: [null, null],
  listHeight: 150,
  listComponent: SelectScrollArea,
  showTransferAll: true,
  limit: Infinity,
  transferAllMatchingFilter: false
};
const TransferList = forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("TransferList", defaultProps, props), {
    value,
    onChange,
    itemComponent,
    searchPlaceholder,
    searchValues,
    onSearch,
    filter,
    nothingFound,
    placeholder,
    titles,
    initialSelection,
    listHeight,
    listComponent,
    showTransferAll,
    breakpoint,
    radius,
    classNames,
    styles,
    limit,
    unstyled,
    transferIcon,
    transferAllIcon,
    variant,
    transferAllMatchingFilter
  } = _a, others = __objRest(_a, [
    "value",
    "onChange",
    "itemComponent",
    "searchPlaceholder",
    "searchValues",
    "onSearch",
    "filter",
    "nothingFound",
    "placeholder",
    "titles",
    "initialSelection",
    "listHeight",
    "listComponent",
    "showTransferAll",
    "breakpoint",
    "radius",
    "classNames",
    "styles",
    "limit",
    "unstyled",
    "transferIcon",
    "transferAllIcon",
    "variant",
    "transferAllMatchingFilter"
  ]);
  const [selection, handlers] = useSelectionState(initialSelection);
  const [search, handleSearch] = useUncontrolled({
    value: searchValues,
    defaultValue: ["", ""],
    finalValue: ["", ""],
    onChange: onSearch
  });
  const handleMoveAll = (listIndex) => {
    const items = Array(2);
    const moveToIndex = listIndex === 0 ? 1 : 0;
    if (transferAllMatchingFilter) {
      const query = search[listIndex];
      const shownItems = value[listIndex].filter((item) => filter(query, item)).slice(0, limit);
      const hiddenItems = value[listIndex].filter((item) => !filter(query, item));
      items[listIndex] = hiddenItems;
      items[moveToIndex] = [...value[moveToIndex], ...shownItems];
    } else {
      items[listIndex] = [];
      items[moveToIndex] = [...value[moveToIndex], ...value[listIndex]];
    }
    onChange(items);
    handlers.deselectAll(listIndex);
  };
  const handleMove = (listIndex) => {
    const moveToIndex = listIndex === 0 ? 1 : 0;
    const items = Array(2);
    const transferData = value[listIndex].reduce((acc, item) => {
      if (!selection[listIndex].includes(item.value)) {
        acc.filtered.push(item);
      } else {
        acc.current.push(item);
      }
      return acc;
    }, { filtered: [], current: [] });
    items[listIndex] = transferData.filtered;
    items[moveToIndex] = [...transferData.current, ...value[moveToIndex]];
    onChange(items);
    handlers.deselectAll(listIndex);
  };
  const breakpoints = breakpoint ? [{ maxWidth: breakpoint, cols: 1 }] : [];
  const sharedListProps = {
    itemComponent,
    listComponent,
    transferIcon,
    transferAllIcon,
    filter,
    height: listHeight,
    showTransferAll,
    classNames,
    styles,
    limit,
    radius
  };
  return /* @__PURE__ */ React.createElement(SimpleGrid, __spreadValues({
    cols: 2,
    spacing: "xl",
    breakpoints,
    ref,
    unstyled
  }, others), /* @__PURE__ */ React.createElement(RenderList, __spreadProps(__spreadValues({}, sharedListProps), {
    data: value[0],
    selection: selection[0],
    onSelect: (val) => handlers.select(0, val),
    onMoveAll: () => handleMoveAll(0),
    onMove: () => handleMove(0),
    title: titles[0],
    placeholder: Array.isArray(placeholder) ? placeholder[0] : placeholder,
    searchPlaceholder: Array.isArray(searchPlaceholder) ? searchPlaceholder[0] : searchPlaceholder,
    nothingFound: Array.isArray(nothingFound) ? nothingFound[0] : nothingFound,
    query: search[0],
    onSearch: (query) => handleSearch([query, search[1]]),
    unstyled,
    variant,
    transferAllMatchingFilter
  })), /* @__PURE__ */ React.createElement(RenderList, __spreadProps(__spreadValues({}, sharedListProps), {
    data: value[1],
    selection: selection[1],
    onSelect: (val) => handlers.select(1, val),
    onMoveAll: () => handleMoveAll(1),
    onMove: () => handleMove(1),
    title: titles[1],
    placeholder: Array.isArray(placeholder) ? placeholder[1] : placeholder,
    searchPlaceholder: Array.isArray(searchPlaceholder) ? searchPlaceholder[1] : searchPlaceholder,
    nothingFound: Array.isArray(nothingFound) ? nothingFound[1] : nothingFound,
    query: search[1],
    onSearch: (query) => handleSearch([search[0], query]),
    reversed: true,
    unstyled,
    variant,
    transferAllMatchingFilter
  })));
});
TransferList.displayName = "@mantine/core/TransferList";

export { TransferList, defaultFilter };
//# sourceMappingURL=TransferList.js.map
