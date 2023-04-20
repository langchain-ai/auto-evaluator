"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.callServer = callServer;
var _async_to_generator = require("@swc/helpers/lib/_async_to_generator.js").default;
var _client = require("next/dist/compiled/react-server-dom-webpack/client");
function callServer(id, args) {
    return _callServer.apply(this, arguments);
}
function _callServer() {
    _callServer = _async_to_generator(function*(id, args) {
        const actionId = id;
        // Fetching the current url with the action header.
        // TODO: Refactor this to look up from a manifest.
        const res = yield fetch('', {
            method: 'POST',
            headers: {
                Accept: 'text/x-component',
                'Next-Action': actionId
            },
            body: yield (0, _client).encodeReply(args)
        });
        if (!res.ok) {
            throw new Error((yield res.text()));
        }
        return (yield res.json())[0];
    });
    return _callServer.apply(this, arguments);
}

if ((typeof exports.default === 'function' || (typeof exports.default === 'object' && exports.default !== null)) && typeof exports.default.__esModule === 'undefined') {
  Object.defineProperty(exports.default, '__esModule', { value: true });
  Object.assign(exports.default, exports);
  module.exports = exports.default;
}

//# sourceMappingURL=app-call-server.js.map