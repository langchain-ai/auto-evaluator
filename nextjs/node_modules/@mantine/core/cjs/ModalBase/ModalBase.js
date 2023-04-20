'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactRemoveScroll = require('react-remove-scroll');
var hooks = require('@mantine/hooks');
var styles = require('@mantine/styles');
var ModalBase_context = require('./ModalBase.context.js');
var ModalBaseCloseButton = require('./ModalBaseCloseButton/ModalBaseCloseButton.js');
var ModalBaseOverlay = require('./ModalBaseOverlay/ModalBaseOverlay.js');
var ModalBaseContent = require('./ModalBaseContent/ModalBaseContent.js');
var ModalBaseHeader = require('./ModalBaseHeader/ModalBaseHeader.js');
var ModalBaseTitle = require('./ModalBaseTitle/ModalBaseTitle.js');
var ModalBaseBody = require('./ModalBaseBody/ModalBaseBody.js');
var NativeScrollArea = require('./NativeScrollArea/NativeScrollArea.js');
var useLockScroll = require('./use-lock-scroll.js');
var ModalBase_styles = require('./ModalBase.styles.js');
var OptionalPortal = require('../Portal/OptionalPortal.js');

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
const ModalBaseDefaultProps = {
  closeOnClickOutside: true,
  withinPortal: true,
  lockScroll: true,
  trapFocus: true,
  returnFocus: true,
  closeOnEscape: true,
  keepMounted: false,
  zIndex: styles.getDefaultZIndex("modal"),
  padding: "md",
  size: "md",
  shadow: "xl"
};
function ModalBase(props) {
  const _a = styles.useComponentDefaultProps("ModalBase", ModalBaseDefaultProps, props), {
    opened,
    onClose,
    children,
    closeOnClickOutside,
    __staticSelector,
    transitionProps,
    withinPortal,
    portalProps,
    keepMounted,
    target,
    zIndex,
    lockScroll,
    trapFocus,
    closeOnEscape,
    returnFocus,
    padding,
    shadow,
    id,
    size,
    variant,
    classNames,
    unstyled,
    styles: styles$1,
    className
  } = _a, others = __objRest(_a, [
    "opened",
    "onClose",
    "children",
    "closeOnClickOutside",
    "__staticSelector",
    "transitionProps",
    "withinPortal",
    "portalProps",
    "keepMounted",
    "target",
    "zIndex",
    "lockScroll",
    "trapFocus",
    "closeOnEscape",
    "returnFocus",
    "padding",
    "shadow",
    "id",
    "size",
    "variant",
    "classNames",
    "unstyled",
    "styles",
    "className"
  ]);
  const { classes, cx } = ModalBase_styles['default'](null, {
    name: __staticSelector,
    classNames,
    styles: styles$1,
    unstyled,
    variant,
    size
  });
  const _id = hooks.useId(id);
  const [titleMounted, setTitleMounted] = React.useState(false);
  const [bodyMounted, setBodyMounted] = React.useState(false);
  const transitionDuration = typeof (transitionProps == null ? void 0 : transitionProps.duration) === "number" ? transitionProps == null ? void 0 : transitionProps.duration : 200;
  const shouldLockScroll = useLockScroll.useLockScroll({ opened, transitionDuration });
  hooks.useWindowEvent("keydown", (event) => {
    if (!trapFocus && event.key === "Escape" && closeOnEscape) {
      onClose();
    }
  });
  hooks.useFocusReturn({ opened, shouldReturnFocus: trapFocus && returnFocus });
  return /* @__PURE__ */ React__default.createElement(OptionalPortal.OptionalPortal, __spreadValues({
    withinPortal,
    target
  }, portalProps), /* @__PURE__ */ React__default.createElement(ModalBase_context.ModalBaseProvider, {
    value: {
      __staticSelector,
      opened,
      onClose,
      closeOnClickOutside,
      transitionProps: __spreadProps(__spreadValues({}, transitionProps), { duration: transitionDuration, keepMounted }),
      zIndex,
      padding,
      id: _id,
      getTitleId: () => `${_id}-title`,
      getBodyId: () => `${_id}-body`,
      titleMounted,
      bodyMounted,
      setTitleMounted,
      setBodyMounted,
      trapFocus,
      closeOnEscape,
      shadow,
      stylesApi: {
        name: __staticSelector,
        size,
        variant,
        classNames,
        styles: styles$1,
        unstyled
      }
    }
  }, /* @__PURE__ */ React__default.createElement(reactRemoveScroll.RemoveScroll, {
    enabled: shouldLockScroll && lockScroll
  }, /* @__PURE__ */ React__default.createElement("div", __spreadValues({
    className: cx(classes.root, className)
  }, others), children))));
}
ModalBase.CloseButton = ModalBaseCloseButton.ModalBaseCloseButton;
ModalBase.Overlay = ModalBaseOverlay.ModalBaseOverlay;
ModalBase.Content = ModalBaseContent.ModalBaseContent;
ModalBase.Header = ModalBaseHeader.ModalBaseHeader;
ModalBase.Title = ModalBaseTitle.ModalBaseTitle;
ModalBase.Body = ModalBaseBody.ModalBaseBody;
ModalBase.NativeScrollArea = NativeScrollArea.NativeScrollArea;

exports.ModalBase = ModalBase;
exports.ModalBaseDefaultProps = ModalBaseDefaultProps;
//# sourceMappingURL=ModalBase.js.map
