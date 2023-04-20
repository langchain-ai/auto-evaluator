import React from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { usePagination } from '@mantine/hooks';
import { createEventHandler } from '@mantine/utils';
import { PaginationProvider } from '../Pagination.context.js';

const defaultProps = {
  siblings: 1,
  boundaries: 1
};
function PaginationRoot(props) {
  const {
    total,
    value,
    defaultValue,
    onChange,
    disabled,
    children,
    siblings,
    boundaries,
    color,
    radius,
    onNextPage,
    onPreviousPage,
    onFirstPage,
    onLastPage,
    getItemProps,
    classNames,
    styles,
    unstyled,
    variant,
    size
  } = useComponentDefaultProps("PaginationRoot", defaultProps, props);
  const { range, setPage, next, previous, active, first, last } = usePagination({
    page: value,
    initialPage: defaultValue,
    onChange,
    total,
    siblings,
    boundaries
  });
  const handleNextPage = createEventHandler(onNextPage, next);
  const handlePreviousPage = createEventHandler(onPreviousPage, previous);
  const handleFirstPage = createEventHandler(onFirstPage, first);
  const handleLastPage = createEventHandler(onLastPage, last);
  return /* @__PURE__ */ React.createElement(PaginationProvider, {
    value: {
      total,
      range,
      active,
      disabled,
      color,
      radius,
      getItemProps,
      onChange: setPage,
      onNext: handleNextPage,
      onPrevious: handlePreviousPage,
      onFirst: handleFirstPage,
      onLast: handleLastPage,
      stylesApi: {
        name: "Pagination",
        classNames,
        styles,
        unstyled,
        variant,
        size
      }
    }
  }, children);
}

export { PaginationRoot };
//# sourceMappingURL=PaginationRoot.js.map
