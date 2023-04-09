'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var styles = require('@mantine/styles');
var hooks = require('@mantine/hooks');
var Spoiler_styles = require('./Spoiler.styles.js');
var Box = require('../Box/Box.js');
var Anchor = require('../Anchor/Anchor.js');

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
  maxHeight: 100,
  transitionDuration: 200,
  initialState: false
};
const Spoiler = React.forwardRef((props, ref) => {
  const _a = styles.useComponentDefaultProps("Spoiler", defaultProps, props), {
    className,
    children,
    maxHeight,
    hideLabel,
    showLabel,
    transitionDuration,
    controlRef,
    initialState,
    classNames,
    styles: styles$1,
    unstyled,
    variant
  } = _a, others = __objRest(_a, [
    "className",
    "children",
    "maxHeight",
    "hideLabel",
    "showLabel",
    "transitionDuration",
    "controlRef",
    "initialState",
    "classNames",
    "styles",
    "unstyled",
    "variant"
  ]);
  const { classes, cx } = Spoiler_styles['default']({ transitionDuration }, { name: "Spoiler", classNames, styles: styles$1, unstyled, variant });
  const [show, setShowState] = React.useState(initialState);
  const [spoiler, setSpoilerState] = React.useState(initialState);
  const { ref: contentRef, height } = hooks.useElementSize();
  const spoilerMoreContent = show ? hideLabel : showLabel;
  React.useEffect(() => {
    setSpoilerState(maxHeight < height);
  }, [height, maxHeight, children]);
  return /* @__PURE__ */ React__default.createElement(Box.Box, __spreadValues({
    className: cx(classes.root, className),
    ref
  }, others), /* @__PURE__ */ React__default.createElement("div", {
    className: classes.content,
    style: {
      maxHeight: !show ? styles.rem(maxHeight) : height ? styles.rem(height) : void 0
    }
  }, /* @__PURE__ */ React__default.createElement("div", {
    ref: contentRef
  }, children)), spoiler && /* @__PURE__ */ React__default.createElement(Anchor.Anchor, {
    component: "button",
    ref: controlRef,
    onClick: () => setShowState((opened) => !opened),
    className: classes.control
  }, spoilerMoreContent));
});
Spoiler.displayName = "@mantine/core/Spoiler";

exports.Spoiler = Spoiler;
//# sourceMappingURL=Spoiler.js.map
