"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = dynamic;
var _extends = require("@swc/helpers/lib/_extends.js").default;
var _interop_require_default = require("@swc/helpers/lib/_interop_require_default.js").default;
var _react = _interop_require_default(require("react"));
var _loadable = _interop_require_default(require("./lazy-dynamic/loadable"));
function dynamic(dynamicOptions, options) {
    const loadableFn = _loadable.default;
    const loadableOptions = {
        // A loading component is not required, so we default it
        loading: ({ error , isLoading , pastDelay  })=>{
            if (!pastDelay) return null;
            if (process.env.NODE_ENV !== 'production') {
                if (isLoading) {
                    return null;
                }
                if (error) {
                    return /*#__PURE__*/ _react.default.createElement("p", null, error.message, /*#__PURE__*/ _react.default.createElement("br", null), error.stack);
                }
            }
            return null;
        }
    };
    if (typeof dynamicOptions === 'function') {
        loadableOptions.loader = dynamicOptions;
    }
    Object.assign(loadableOptions, options);
    const loaderFn = loadableOptions.loader;
    const loader = ()=>loaderFn != null ? loaderFn().then(convertModule) : Promise.resolve(convertModule(()=>null));
    return loadableFn(_extends({}, loadableOptions, {
        loader: loader
    }));
}
// Normalize loader to return the module as form { default: Component } for `React.lazy`.
// Also for backward compatible since next/dynamic allows to resolve a component directly with loader
// Client component reference proxy need to be converted to a module.
function convertModule(mod) {
    var ref;
    return {
        default: ((ref = mod) == null ? void 0 : ref.default) || mod
    };
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=app-dynamic.js.map