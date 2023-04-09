"use client";
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.suspense = suspense;
exports.NoSSR = NoSSR;
var _interop_require_default = require("@swc/helpers/lib/_interop_require_default.js").default;
var _react = _interop_require_default(require("react"));
var _noSsrError = require("./no-ssr-error");

function suspense() {
    const error = new Error(_noSsrError.NEXT_DYNAMIC_NO_SSR_CODE);
    error.digest = _noSsrError.NEXT_DYNAMIC_NO_SSR_CODE;
    throw error;
}
function NoSSR({ children  }) {
    if (typeof window === 'undefined') {
        suspense();
    }
    return children;
}

//# sourceMappingURL=dynamic-no-ssr.js.map