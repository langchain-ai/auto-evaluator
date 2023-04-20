"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createServerComponentRenderer = createServerComponentRenderer;
var _react = _interopRequireWildcard(require("next/dist/compiled/react"));
var _useFlightResponse = require("./use-flight-response");
function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function() {
        return cache;
    };
    return cache;
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function createServerComponentRenderer(ComponentToRender, ComponentMod, { transformStream , clientReferenceManifest , serverContexts , rscChunks  }, serverComponentsErrorHandler, nonce) {
    // We need to expose the `__webpack_require__` API globally for
    // react-server-dom-webpack. This is a hack until we find a better way.
    if (ComponentMod.__next_app_webpack_require__) {
        // @ts-ignore
        globalThis.__next_require__ = ComponentMod.__next_app_webpack_require__;
        // @ts-ignore
        globalThis.__next_chunk_load__ = ()=>Promise.resolve();
    }
    let RSCStream;
    const createRSCStream = (props)=>{
        if (!RSCStream) {
            RSCStream = ComponentMod.renderToReadableStream(/*#__PURE__*/ _react.default.createElement(ComponentToRender, Object.assign({}, props)), clientReferenceManifest.clientModules, {
                context: serverContexts,
                onError: serverComponentsErrorHandler
            });
        }
        return RSCStream;
    };
    const flightResponseRef = {
        current: null
    };
    const writable = transformStream.writable;
    return function ServerComponentWrapper(props) {
        const reqStream = createRSCStream(props);
        const response = (0, _useFlightResponse).useFlightResponse(writable, reqStream, clientReferenceManifest, rscChunks, flightResponseRef, nonce);
        return (0, _react).use(response);
    };
}

//# sourceMappingURL=create-server-components-renderer.js.map