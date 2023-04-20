"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.requestAsyncStorage = void 0;
var _asyncLocalStorage = require("./async-local-storage");
const requestAsyncStorage = (0, _asyncLocalStorage).createAsyncLocalStorage();
exports.requestAsyncStorage = requestAsyncStorage;

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=request-async-storage.js.map