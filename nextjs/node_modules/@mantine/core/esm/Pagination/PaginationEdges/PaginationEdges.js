import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { createPolymorphicComponent } from '@mantine/utils';
import { usePaginationContext } from '../Pagination.context.js';
import { getIconSize, PaginationNextIcon, PaginationPreviousIcon, PaginationFirstIcon, PaginationLastIcon } from '../Pagination.icons.js';
import { PaginationControl } from '../PaginationControl/PaginationControl.js';
import useStyles from './PaginationEdges.styles.js';

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
function createEdgeComponent({ icon, name, action, type }) {
  const defaultProps = { icon };
  const Component = forwardRef((props, ref) => {
    const _a = useComponentDefaultProps(name, defaultProps, props), { icon: Icon } = _a, others = __objRest(_a, ["icon"]);
    const { classes } = useStyles();
    const ctx = usePaginationContext();
    const disabled = type === "next" ? ctx.active === ctx.total : ctx.active === 1;
    return /* @__PURE__ */ React.createElement(PaginationControl, __spreadValues({
      disabled: ctx.disabled || disabled,
      ref,
      onClick: ctx[action],
      withPadding: false
    }, others), /* @__PURE__ */ React.createElement(Icon, {
      className: classes.icon,
      size: getIconSize(ctx.stylesApi.size)
    }));
  });
  Component.displayName = `@mantine/core/${name}`;
  return createPolymorphicComponent(Component);
}
const PaginationNext = createEdgeComponent({
  icon: PaginationNextIcon,
  name: "PaginationNext",
  action: "onNext",
  type: "next"
});
const PaginationPrevious = createEdgeComponent({
  icon: PaginationPreviousIcon,
  name: "PaginationPrevious",
  action: "onPrevious",
  type: "previous"
});
const PaginationFirst = createEdgeComponent({
  icon: PaginationFirstIcon,
  name: "PaginationFirst",
  action: "onFirst",
  type: "previous"
});
const PaginationLast = createEdgeComponent({
  icon: PaginationLastIcon,
  name: "PaginationLast",
  action: "onLast",
  type: "next"
});

export { PaginationFirst, PaginationLast, PaginationNext, PaginationPrevious, createEdgeComponent };
//# sourceMappingURL=PaginationEdges.js.map
