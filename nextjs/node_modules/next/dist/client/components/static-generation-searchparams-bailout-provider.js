"use client";
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = StaticGenerationSearchParamsBailoutProvider;
var _interop_require_default = require("@swc/helpers/lib/_interop_require_default.js").default;
var _react = _interop_require_default(require("react"));
var _searchparamsBailoutProxy = require("./searchparams-bailout-proxy");
function StaticGenerationSearchParamsBailoutProvider({ Component , propsForComponent  }) {
    const searchParams = (0, _searchparamsBailoutProxy).createSearchParamsBailoutProxy();
    return /*#__PURE__*/ _react.default.createElement(Component, Object.assign({
        searchParams: searchParams
    }, propsForComponent));
}


if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=static-generation-searchparams-bailout-provider.js.map