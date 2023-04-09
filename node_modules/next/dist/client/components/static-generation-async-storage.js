"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.staticGenerationAsyncStorage = void 0;
var _asyncLocalStorage = require("./async-local-storage");
const staticGenerationAsyncStorage = (0, _asyncLocalStorage).createAsyncLocalStorage();
exports.staticGenerationAsyncStorage = staticGenerationAsyncStorage;

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=static-generation-async-storage.js.map