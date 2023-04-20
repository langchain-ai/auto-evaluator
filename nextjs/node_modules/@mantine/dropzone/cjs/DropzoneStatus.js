'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('@mantine/hooks');
var utils = require('@mantine/utils');
var core = require('@mantine/core');
var Dropzone_context = require('./Dropzone.context.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
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
function createDropzoneStatus(status) {
  const Component = (props) => {
    const _a = core.useComponentDefaultProps(`Dropzone${hooks.upperFirst(status)}`, {}, props), { children } = _a, others = __objRest(_a, ["children"]);
    const ctx = Dropzone_context.useDropzoneContext();
    const _children = utils.isElement(children) ? children : /* @__PURE__ */ React__default.createElement("span", null, children);
    if (ctx[status]) {
      return React.cloneElement(_children, others);
    }
    return null;
  };
  Component.displayName = `@mantine/dropzone/${hooks.upperFirst(status)}`;
  return Component;
}
const DropzoneAccept = createDropzoneStatus("accept");
const DropzoneReject = createDropzoneStatus("reject");
const DropzoneIdle = createDropzoneStatus("idle");

exports.DropzoneAccept = DropzoneAccept;
exports.DropzoneIdle = DropzoneIdle;
exports.DropzoneReject = DropzoneReject;
//# sourceMappingURL=DropzoneStatus.js.map
