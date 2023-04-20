"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderToString = renderToString;
var _react = _interopRequireDefault(require("next/dist/compiled/react"));
var _serverBrowser = _interopRequireDefault(require("next/dist/compiled/react-dom/server.browser"));
var _nodeWebStreamsHelper = require("../node-web-streams-helper");
var _constants = require("../lib/trace/constants");
var _tracer = require("../lib/trace/tracer");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function renderToString(element) {
    return (0, _tracer).getTracer().trace(_constants.AppRenderSpan.renderToString, async ()=>{
        const renderStream = await _serverBrowser.default.renderToReadableStream(element);
        await renderStream.allReady;
        return (0, _nodeWebStreamsHelper).streamToString(renderStream);
    });
}

//# sourceMappingURL=render-to-string.js.map