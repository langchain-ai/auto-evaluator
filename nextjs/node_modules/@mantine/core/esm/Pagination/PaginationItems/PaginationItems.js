import React from 'react';
import { usePaginationContext } from '../Pagination.context.js';
import { PaginationControl } from '../PaginationControl/PaginationControl.js';
import { PaginationDots } from '../PaginationDots/PaginationDots.js';

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
  const ctx = usePaginationContext();
  const items = ctx.range.map((page, index) => {
    var _a;
    if (page === "dots") {
      return /* @__PURE__ */ React.createElement(PaginationDots, {
        icon: dotsIcon,
        key: index
      });
    }
    return /* @__PURE__ */ React.createElement(PaginationControl, __spreadValues({
      key: index,
      active: page === ctx.active,
      "aria-current": page === ctx.active ? "page" : void 0,
      onClick: () => ctx.onChange(page),
      disabled: ctx.disabled
    }, (_a = ctx.getItemProps) == null ? void 0 : _a.call(ctx, page)), page);
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, items);
}
PaginationItems.displayName = "@mantine/core/PaginationItems";

export { PaginationItems };
//# sourceMappingURL=PaginationItems.js.map
