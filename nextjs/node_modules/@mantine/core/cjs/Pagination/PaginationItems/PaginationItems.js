'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var Pagination_context = require('../Pagination.context.js');
var PaginationControl = require('../PaginationControl/PaginationControl.js');
var PaginationDots = require('../PaginationDots/PaginationDots.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __defProp = Object.defineProperty;
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
function PaginationItems({ dotsIcon }) {
  const ctx = Pagination_context.usePaginationContext();
  const items = ctx.range.map((page, index) => {
    var _a;
    if (page === "dots") {
      return /* @__PURE__ */ React__default.createElement(PaginationDots.PaginationDots, {
        icon: dotsIcon,
        key: index
      });
    }
    return /* @__PURE__ */ React__default.createElement(PaginationControl.PaginationControl, __spreadValues({
      key: index,
      active: page === ctx.active,
      "aria-current": page === ctx.active ? "page" : void 0,
      onClick: () => ctx.onChange(page),
      disabled: ctx.disabled
    }, (_a = ctx.getItemProps) == null ? void 0 : _a.call(ctx, page)), page);
  });
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, items);
}
PaginationItems.displayName = "@mantine/core/PaginationItems";

exports.PaginationItems = PaginationItems;
//# sourceMappingURL=PaginationItems.js.map
