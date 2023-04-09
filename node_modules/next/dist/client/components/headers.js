"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.headers = headers;
exports.previewData = previewData;
exports.cookies = cookies;
var _requestCookies = require("../../server/web/spec-extension/adapters/request-cookies");
var _headers = require("../../server/web/spec-extension/adapters/headers");
var _cookies = require("../../server/web/spec-extension/cookies");
var _requestAsyncStorage = require("./request-async-storage");
var _staticGenerationBailout = require("./static-generation-bailout");
function headers() {
    if ((0, _staticGenerationBailout).staticGenerationBailout('headers')) {
        return _headers.HeadersAdapter.seal(new Headers({}));
    }
    const requestStore = _requestAsyncStorage.requestAsyncStorage.getStore();
    if (!requestStore) {
        throw new Error(`Invariant: Method expects to have requestAsyncStorage, none available`);
    }
    return requestStore.headers;
}
function previewData() {
    const requestStore = _requestAsyncStorage.requestAsyncStorage.getStore();
    if (!requestStore) {
        throw new Error(`Invariant: Method expects to have requestAsyncStorage, none available`);
    }
    return requestStore.previewData;
}
function cookies() {
    if ((0, _staticGenerationBailout).staticGenerationBailout('cookies')) {
        return _requestCookies.RequestCookiesAdapter.seal(new _cookies.RequestCookies(new Headers({})));
    }
    const requestStore = _requestAsyncStorage.requestAsyncStorage.getStore();
    if (!requestStore) {
        throw new Error(`Invariant: Method expects to have requestAsyncStorage, none available`);
    }
    return requestStore.cookies;
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=headers.js.map