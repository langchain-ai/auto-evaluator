'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var hooks = require('@mantine/hooks');
var utils = require('@mantine/utils');
var Pagination_context = require('../Pagination.context.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
    styles: styles$1,
    unstyled,
    variant,
    size
  } = styles.useComponentDefaultProps("PaginationRoot", defaultProps, props);
  const { range, setPage, next, previous, active, first, last } = hooks.usePagination({
    page: value,
    initialPage: defaultValue,
    onChange,
    total,
    siblings,
    boundaries
  });
  const handleNextPage = utils.createEventHandler(onNextPage, next);
  const handlePreviousPage = utils.createEventHandler(onPreviousPage, previous);
  const handleFirstPage = utils.createEventHandler(onFirstPage, first);
  const handleLastPage = utils.createEventHandler(onLastPage, last);
  return /* @__PURE__ */ React__default.createElement(Pagination_context.PaginationProvider, {
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
        styles: styles$1,
        unstyled,
        variant,
        size
      }
    }
  }, children);
}

exports.PaginationRoot = PaginationRoot;
//# sourceMappingURL=PaginationRoot.js.map
