import React, { useState, useRef } from 'react';
import { rem } from '@mantine/styles';
import { useScrollIntoView } from '@mantine/hooks';
import { groupOptions } from '@mantine/utils';
import { SelectScrollArea } from '../../Select/SelectScrollArea/SelectScrollArea.js';
import { PaginationPreviousIcon, PaginationNextIcon, PaginationFirstIcon, PaginationLastIcon } from '../../Pagination/Pagination.icons.js';
import useStyles from './RenderList.styles.js';
import { UnstyledButton } from '../../UnstyledButton/UnstyledButton.js';
import { Divider } from '../../Divider/Divider.js';
import { Text } from '../../Text/Text.js';
import { TextInput } from '../../TextInput/TextInput.js';
import { ActionIcon } from '../../ActionIcon/ActionIcon.js';

const icons = {
  Prev: PaginationPreviousIcon,
  Next: PaginationNextIcon,
  First: PaginationFirstIcon,
  Last: PaginationLastIcon
};
const rtlIons = {
  Next: PaginationPreviousIcon,
  Prev: PaginationNextIcon,
  Last: PaginationFirstIcon,
  First: PaginationLastIcon
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
  styles,
  limit,
  unstyled,
  variant
}) {
  const { classes, cx, theme } = useStyles({ reversed, native: listComponent !== SelectScrollArea, radius }, { name: "TransferList", classNames, styles, unstyled, variant });
  const unGroupedItems = [];
  const groupedItems = [];
  const [hovered, setHovered] = useState(-1);
  const filteredData = data.filter((item) => filter(query, item)).slice(0, limit);
  const ListComponent = listComponent || "div";
  const Icons = theme.dir === "rtl" ? rtlIons : icons;
  const itemsRefs = useRef({});
  const sortedData = groupOptions({ data: filteredData });
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({
    duration: 0,
    offset: 5,
    cancelable: false,
    isList: true
  });
  let groupName = null;
  sortedData.forEach((item, index) => {
    const itemComponent = /* @__PURE__ */ React.createElement(UnstyledButton, {
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
    }, /* @__PURE__ */ React.createElement(ItemComponent, {
      data: item,
      selected: selection.includes(item.value),
      radius
    }));
    if (!item.group) {
      unGroupedItems.push(itemComponent);
    } else {
      if (groupName !== item.group) {
        groupName = item.group;
        groupedItems.push(/* @__PURE__ */ React.createElement("div", {
          className: classes.separator,
          key: groupName
        }, /* @__PURE__ */ React.createElement(Divider, {
          classNames: { label: classes.separatorLabel },
          label: groupName
        })));
      }
      groupedItems.push(itemComponent);
    }
  });
  if (groupedItems.length > 0 && unGroupedItems.length > 0) {
    unGroupedItems.unshift(/* @__PURE__ */ React.createElement("div", {
      className: classes.separator
    }, /* @__PURE__ */ React.createElement(Divider, {
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
  const transferIcon = reversed ? /* @__PURE__ */ React.createElement(Icons.Prev, {
    size: "1rem"
  }) : /* @__PURE__ */ React.createElement(Icons.Next, {
    size: "1rem"
  });
  const transferAllIcon = reversed ? /* @__PURE__ */ React.createElement(Icons.First, {
    size: "1rem"
  }) : /* @__PURE__ */ React.createElement(Icons.Last, {
    size: "1rem"
  });
  return /* @__PURE__ */ React.createElement("div", {
    className: cx(classes.transferList, className)
  }, title && /* @__PURE__ */ React.createElement(Text, {
    weight: 500,
    unstyled,
    className: classes.transferListTitle
  }, title), /* @__PURE__ */ React.createElement("div", {
    className: classes.transferListBody
  }, /* @__PURE__ */ React.createElement("div", {
    className: classes.transferListHeader
  }, /* @__PURE__ */ React.createElement(TextInput, {
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
  }), /* @__PURE__ */ React.createElement(ActionIcon, {
    variant: "default",
    size: 36,
    radius: 0,
    className: classes.transferListControl,
    disabled: selection.length === 0,
    onClick: onMove,
    unstyled
  }, TransferIcon ? /* @__PURE__ */ React.createElement(TransferIcon, {
    reversed
  }) : transferIcon), showTransferAll && /* @__PURE__ */ React.createElement(ActionIcon, {
    variant: "default",
    size: 36,
    radius: 0,
    className: classes.transferListControl,
    disabled: transferAllMatchingFilter ? filteredData.length === 0 : data.length === 0,
    onClick: onMoveAll,
    unstyled
  }, TransferAllIcon ? /* @__PURE__ */ React.createElement(TransferAllIcon, {
    reversed
  }) : transferAllIcon)), /* @__PURE__ */ React.createElement(ListComponent, {
    ref: scrollableRef,
    onMouseLeave: () => setHovered(-1),
    className: classes.transferListItems,
    style: { height: rem(height), position: "relative", overflowX: "hidden" }
  }, groupedItems.length > 0 || unGroupedItems.length > 0 ? /* @__PURE__ */ React.createElement(React.Fragment, null, groupedItems, unGroupedItems) : /* @__PURE__ */ React.createElement(Text, {
    color: "dimmed",
    unstyled,
    size: "sm",
    align: "center",
    mt: "sm"
  }, !query && placeholder ? placeholder : nothingFound))));
}
RenderList.displayName = "@mantine/core/RenderList";

export { RenderList };
//# sourceMappingURL=RenderList.js.map
