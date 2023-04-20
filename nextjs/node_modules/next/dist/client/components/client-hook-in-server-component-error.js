"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clientHookInServerComponentError = clientHookInServerComponentError;
var _interop_require_default = require("@swc/helpers/lib/_interop_require_default.js").default;
var _react = _interop_require_default(require("react"));
function clientHookInServerComponentError(hookName) {
    if (process.env.NODE_ENV !== 'production') {
        // If useState is undefined we're in a server component
        if (!_react.default.useState) {
            throw new Error(`${hookName} only works in Client Components. Add the "use client" directive at the top of the file to use it. Read more: https://nextjs.org/docs/messages/react-client-hook-in-server-component`);
        }
    }
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=client-hook-in-server-component-error.js.map