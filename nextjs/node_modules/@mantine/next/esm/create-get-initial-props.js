import React from 'react';
import NextDocument from 'next/document';
import { createStylesServer, ServerStyles } from '@mantine/ssr';

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
function createGetInitialProps(cache) {
  const stylesServer = createStylesServer(cache);
  return async function getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return __spreadProps(__spreadValues({}, initialProps), {
      styles: /* @__PURE__ */ React.createElement(React.Fragment, null, initialProps.styles, /* @__PURE__ */ React.createElement(ServerStyles, {
        html: initialProps.html,
        server: stylesServer
      }))
    });
  };
}

export { createGetInitialProps };
//# sourceMappingURL=create-get-initial-props.js.map
