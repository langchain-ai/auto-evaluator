import React, { cloneElement } from 'react';
import { upperFirst } from '@mantine/hooks';
import { isElement } from '@mantine/utils';
import { useComponentDefaultProps } from '@mantine/core';
import { useDropzoneContext } from './Dropzone.context.js';

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
    const _a = useComponentDefaultProps(`Dropzone${upperFirst(status)}`, {}, props), { children } = _a, others = __objRest(_a, ["children"]);
    const ctx = useDropzoneContext();
    const _children = isElement(children) ? children : /* @__PURE__ */ React.createElement("span", null, children);
    if (ctx[status]) {
      return cloneElement(_children, others);
    }
    return null;
  };
  Component.displayName = `@mantine/dropzone/${upperFirst(status)}`;
  return Component;
}
const DropzoneAccept = createDropzoneStatus("accept");
const DropzoneReject = createDropzoneStatus("reject");
const DropzoneIdle = createDropzoneStatus("idle");

export { DropzoneAccept, DropzoneIdle, DropzoneReject };
//# sourceMappingURL=DropzoneStatus.js.map
