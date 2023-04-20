"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createAsyncLocalStorage = createAsyncLocalStorage;
class FakeAsyncLocalStorage {
    disable() {
        throw new Error('Invariant: AsyncLocalStorage accessed in runtime where it is not available');
    }
    getStore() {
        // This fake implementation of AsyncLocalStorage always returns `undefined`.
        return undefined;
    }
    run() {
        throw new Error('Invariant: AsyncLocalStorage accessed in runtime where it is not available');
    }
    exit() {
        throw new Error('Invariant: AsyncLocalStorage accessed in runtime where it is not available');
    }
    enterWith() {
        throw new Error('Invariant: AsyncLocalStorage accessed in runtime where it is not available');
    }
}
function createAsyncLocalStorage() {
    if (globalThis.AsyncLocalStorage) {
        return new globalThis.AsyncLocalStorage();
    }
    return new FakeAsyncLocalStorage();
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=async-local-storage.js.map