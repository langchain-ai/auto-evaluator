'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var RadixScrollArea = require('@radix-ui/react-scroll-area');
var styles = require('@mantine/styles');
var utils = require('@mantine/utils');
var ScrollArea_styles = require('./ScrollArea.styles.js');
var Box = require('../Box/Box.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      n[k] = e[k];
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var RadixScrollArea__namespace = /*#__PURE__*/_interopNamespace(RadixScrollArea);

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
const defaultProps = {
  scrollbarSize: 12,
  scrollHideDelay: 1e3,
  type: "hover",
  offsetScrollbars: false
};
const _ScrollArea = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("ScrollArea", defaultProps, props), {
    children,
    className,
    classNames,
    styles: styles$1,
    scrollbarSize,
    scrollHideDelay,
    type,
    dir,
    offsetScrollbars,
    viewportRef,
    onScrollPositionChange,
    unstyled,
    variant,
    viewportProps
  } = _a, others = __objRest(_a, [
    "children",
    "className",
    "classNames",
    "styles",
    "scrollbarSize",
    "scrollHideDelay",
    "type",
    "dir",
    "offsetScrollbars",
    "viewportRef",
    "onScrollPositionChange",
    "unstyled",
    "variant",
    "viewportProps"
  ]);
  const [scrollbarHovered, setScrollbarHovered] = React.useState(false);
  const theme = styles.useMantineTheme();
  const { classes, cx } = ScrollArea_styles['default']({ scrollbarSize, offsetScrollbars, scrollbarHovered, hidden: type === "never" }, { name: "ScrollArea", classNames, styles: styles$1, unstyled, variant });
  return /* @__PURE__ */ React__default.createElement(RadixScrollArea__namespace.Root, {
    type: type === "never" ? "always" : type,
    scrollHideDelay,
    dir: dir || theme.dir,
    ref,
    asChild: true
  }, /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues({
    className: cx(classes.root, className)
  }, others), /* @__PURE__ */ React__default.createElement(RadixScrollArea__namespace.Viewport, __spreadProps(__spreadValues({}, viewportProps), {
    className: classes.viewport,
    ref: viewportRef,
    onScroll: typeof onScrollPositionChange === "function" ? ({ currentTarget }) => onScrollPositionChange({
      x: currentTarget.scrollLeft,
      y: currentTarget.scrollTop
    }) : void 0
  }), children), /* @__PURE__ */ React__default.createElement(RadixScrollArea__namespace.Scrollbar, {
    orientation: "horizontal",
    className: classes.scrollbar,
    forceMount: true,
    onMouseEnter: () => setScrollbarHovered(true),
    onMouseLeave: () => setScrollbarHovered(false)
  }, /* @__PURE__ */ React__default.createElement(RadixScrollArea__namespace.Thumb, {
    className: classes.thumb
  })), /* @__PURE__ */ React__default.createElement(RadixScrollArea__namespace.Scrollbar, {
    orientation: "vertical",
    className: classes.scrollbar,
    forceMount: true,
    onMouseEnter: () => setScrollbarHovered(true),
    onMouseLeave: () => setScrollbarHovered(false)
  }, /* @__PURE__ */ React__default.createElement(RadixScrollArea__namespace.Thumb, {
    className: classes.thumb
  })), /* @__PURE__ */ React__default.createElement(RadixScrollArea__namespace.Corner, {
    className: classes.corner
  })));
});
const ScrollAreaAutosize = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("ScrollAreaAutosize", defaultProps, props), {
    children,
    classNames,
    styles: styles$1,
    scrollbarSize,
    scrollHideDelay,
    type,
    dir,
    offsetScrollbars,
    viewportRef,
    onScrollPositionChange,
    unstyled,
    sx,
    variant,
    viewportProps
  } = _a, others = __objRest(_a, [
    "children",
    "classNames",
    "styles",
    "scrollbarSize",
    "scrollHideDelay",
    "type",
    "dir",
    "offsetScrollbars",
    "viewportRef",
    "onScrollPositionChange",
    "unstyled",
    "sx",
    "variant",
    "viewportProps"
  ]);
  return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadProps(__spreadValues({}, others), {
    ref,
    sx: [{ display: "flex" }, ...utils.packSx(sx)]
  }), /* @__PURE__ */ React__default.createElement(Box.Box, {
    sx: { display: "flex", flexDirection: "column", flex: 1 }
  }, /* @__PURE__ */ React__default.createElement(_ScrollArea, {
    classNames,
    styles: styles$1,
    scrollHideDelay,
    scrollbarSize,
    type,
    dir,
    offsetScrollbars,
    viewportRef,
    onScrollPositionChange,
    unstyled,
    variant,
    viewportProps
  }, children)));
});
ScrollAreaAutosize.displayName = "@mantine/core/ScrollAreaAutosize";
_ScrollArea.displayName = "@mantine/core/ScrollArea";
_ScrollArea.Autosize = ScrollAreaAutosize;
const ScrollArea = _ScrollArea;

exports.ScrollArea = ScrollArea;
exports._ScrollArea = _ScrollArea;
//# sourceMappingURL=ScrollArea.js.map
