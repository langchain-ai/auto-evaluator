"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isNextRouterError = isNextRouterError;
var _notFound = require("./not-found");
var _redirect = require("./redirect");
function isNextRouterError(error) {
    return error && error.digest && ((0, _redirect).isRedirectError(error) || (0, _notFound).isNotFoundError(error));
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=is-next-router-error.js.map