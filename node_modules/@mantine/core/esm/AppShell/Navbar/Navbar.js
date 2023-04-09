import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/styles';
import { HorizontalSection } from '../HorizontalSection/HorizontalSection.js';
import { Section } from '../HorizontalSection/Section/Section.js';

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
const defaultProps = {
  fixed: false,
  position: { top: 0, left: 0 },
  hiddenBreakpoint: "md",
  hidden: false
};
const Navbar = forwardRef((props, ref) => {
  const _props = useComponentDefaultProps("Navbar", defaultProps, props);
  return /* @__PURE__ */ React.createElement(HorizontalSection, __spreadValues({
    section: "navbar",
    __staticSelector: "Navbar",
    ref
  }, _props));
});
Navbar.Section = Section;
Navbar.displayName = "@mantine/core/Navbar";

export { Navbar };
//# sourceMappingURL=Navbar.js.map
