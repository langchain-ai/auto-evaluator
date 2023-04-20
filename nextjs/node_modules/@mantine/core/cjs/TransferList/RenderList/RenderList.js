'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var hooks = require('@mantine/hooks');
var utils = require('@mantine/utils');
var SelectScrollArea = require('../../Select/SelectScrollArea/SelectScrollArea.js');
var Pagination_icons = require('../../Pagination/Pagination.icons.js');
var RenderList_styles = require('./RenderList.styles.js');
var UnstyledButton = require('../../UnstyledButton/UnstyledButton.js');
var Divider = require('../../Divider/Divider.js');
var Text = require('../../Text/Text.js');
var TextInput = require('../../TextInput/TextInput.js');
var ActionIcon = require('../../ActionIcon/ActionIcon.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const icons = {
  Prev: Pagination_icons.PaginationPreviousIcon,
  Next: Pagination_icons.PaginationNextIcon,
  First: Pagination_icons.PaginationFirstIcon,
  Last: Pagination_icons.PaginationLastIcon
};
const rtlIons = {
  Next: Pagination_icons.PaginationPreviousIcon,
  Prev: Pagination_icons.PaginationNextIcon,
  Last: Pagination_icons.PaginationFirstIcon,
  First: Pagination_icons.PaginationLastIcon
};
function RenderList({
  className,
  data,
  onSelect,
  selection,
  itemComponent: ItemComponent,
  listComponent,
  transferIcon: TransferIcon,
  transferAllIcon: TransferAllIcon,
  transferAllMatchingFilter,
  searchPlaceholder,
  query,
  onSearch,
  filter,
  nothingFound,
  placeholder,
  title,
  showTransferAll,
  reversed,
  onMoveAll,
  onMove,
  height,
  radius,
  classNames,
  styles: styles$1,
  limit,
  unstyled,
  variant
}) {
  const { classes, cx, theme } = RenderList_styles['default']({ reversed, native: listComponent !== SelectScrollArea.SelectScrollArea, radius }, { name: "TransferList", classNames, styles: styles$1, unstyled, variant });
  const unGroupedItems = [];
  const groupedItems = [];
  const [hovered, setHovered] = React.useState(-1);
  const filteredData = data.filter((item) => filter(query, item)).slice(0, limit);
  const ListComponent = listComponent || "div";
  const Icons = theme.dir === "rtl" ? rtlIons : icons;
  const itemsRefs = React.useRef({});
  const sortedData = utils.groupOptions({ data: filteredData });
  const { scrollIntoView, targetRef, scrollableRef } = hooks.useScrollIntoView({
    duration: 0,
    offset: 5,
    cancelable: false,
    isList: true
  });
  let groupName = null;
  sortedData.forEach((item, index) => {
    const itemComponent = /* @__PURE__ */ React__default.createElement(UnstyledButton.UnstyledButton, {
      unstyled,
      tabIndex: -1,
      onClick: () => onSelect(item.value),
      key: item.value,
      onMouseEnter: () => setHovered(index),
      className: cx(classes.transferListItem, {
        [classes.transferListItemHovered]: index === hovered
      }),
      ref: (node) => {
        if (itemsRefs && itemsRefs.current) {
          itemsRefs.current[item.value] = node;
        }
      }
    }, /* @__PURE__ */ React__default.createElement(ItemComponent, {
      data: item,
      selected: selection.includes(item.value),
      radius
    }));
    if (!item.group) {
      unGroupedItems.push(itemComponent);
    } else {
      if (groupName !== item.group) {
        groupName = item.group;
        groupedItems.push(/* @__PURE__ */ React__default.createElement("div", {
          className: classes.separator,
          key: groupName
        }, /* @__PURE__ */ React__default.createElement(Divider.Divider, {
          classNames: { label: classes.separatorLabel },
          label: groupName
        })));
      }
      groupedItems.push(itemComponent);
    }
  });
  if (groupedItems.length > 0 && unGroupedItems.length > 0) {
    unGroupedItems.unshift(/* @__PURE__ */ React__default.createElement("div", {
      className: classes.separator
    }, /* @__PURE__ */ React__default.createElement(Divider.Divider, {
      unstyled,
      classNames: { label: classes.separatorLabel }
    })));
  }
  const handleSearchKeydown = (event) => {
    switch (event.key) {
      case "Enter": {
        event.preventDefault();
        if (filteredData[hovered]) {
          onSelect(filteredData[hovered].value);
        }
        break;
      }
      case "ArrowDown": {
        event.preventDefault();
        setHovered((current) => {
          var _a;
          const nextIndex = current < filteredData.length - 1 ? current + 1 : current;
          targetRef.current = itemsRefs.current[(_a = filteredData[nextIndex]) == null ? void 0 : _a.value];
          scrollIntoView({
            alignment: "end"
          });
          return nextIndex;
        });
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        setHovered((current) => {
          var _a;
          const nextIndex = current > 0 ? current - 1 : current;
          targetRef.current = itemsRefs.current[(_a = filteredData[nextIndex]) == null ? void 0 : _a.value];
          scrollIntoView({
            alignment: "start"
          });
          return nextIndex;
        });
      }
    }
  };
  const transferIcon = reversed ? /* @__PURE__ */ React__default.createElement(Icons.Prev, {
    size: "1rem"
  }) : /* @__PURE__ */ React__default.createElement(Icons.Next, {
    size: "1rem"
  });
  const transferAllIcon = reversed ? /* @__PURE__ */ React__default.createElement(Icons.First, {
    size: "1rem"
  }) : /* @__PURE__ */ React__default.createElement(Icons.Last, {
    size: "1rem"
  });
  return /* @__PURE__ */ React__default.createElement("div", {
    className: cx(classes.transferList, className)
  }, title && /* @__PURE__ */ React__default.createElement(Text.Text, {
    weight: 500,
    unstyled,
    className: classes.transferListTitle
  }, title), /* @__PURE__ */ React__default.createElement("div", {
    className: classes.transferListBody
  }, /* @__PURE__ */ React__default.createElement("div", {
    className: classes.transferListHeader
  }, /* @__PURE__ */ React__default.createElement(TextInput.TextInput, {
    unstyled,
    value: query,
    onChange: (event) => {
      onSearch(event.currentTarget.value);
      setHovered(0);
    },
    onFocus: () => setHovered(0),
    onBlur: () => setHovered(-1),
    placeholder: searchPlaceholder,
    radius: 0,
    onKeyDown: handleSearchKeydown,
    sx: { flex: 1 },
    classNames: { input: classes.transferListSearch }
  }), /* @__PURE__ */ React__default.createElement(ActionIcon.ActionIcon, {
    variant: "default",
    size: 36,
    radius: 0,
    className: classes.transferListControl,
    disabled: selection.length === 0,
    onClick: onMove,
    unstyled
  }, TransferIcon ? /* @__PURE__ */ React__default.createElement(TransferIcon, {
    reversed
  }) : transferIcon), showTransferAll && /* @__PURE__ */ React__default.createElement(ActionIcon.ActionIcon, {
    variant: "default",
    size: 36,
    radius: 0,
    className: classes.transferListControl,
    disabled: transferAllMatchingFilter ? filteredData.length === 0 : data.length === 0,
    onClick: onMoveAll,
    unstyled
  }, TransferAllIcon ? /* @__PURE__ */ React__default.createElement(TransferAllIcon, {
    reversed
  }) : transferAllIcon)), /* @__PURE__ */ React__default.createElement(ListComponent, {
    ref: scrollableRef,
    onMouseLeave: () => setHovered(-1),
    className: classes.transferListItems,
    style: { height: styles.rem(height), position: "relative", overflowX: "hidden" }
  }, groupedItems.length > 0 || unGroupedItems.length > 0 ? /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, groupedItems, unGroupedItems) : /* @__PURE__ */ React__default.createElement(Text.Text, {
    color: "dimmed",
    unstyled,
    size: "sm",
    align: "center",
    mt: "sm"
  }, !query && placeholder ? placeholder : nothingFound))));
}
RenderList.displayName = "@mantine/core/RenderList";

exports.RenderList = RenderList;
//# sourceMappingURL=RenderList.js.map
